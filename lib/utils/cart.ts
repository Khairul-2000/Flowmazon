import { cookies } from "next/headers";
import prisma from "../db/prisma";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    product: true;
  };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subTotal: number;
};

export const getCart = async (): Promise<ShoppingCart | null> => {
  const session = await getServerSession(authOptions);
  let cart: CartWithProducts | null = null;
  if (session) {
    cart = await prisma.cart.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;

    cart = localCartId
      ? await prisma.cart.findUnique({
          where: {
            id: localCartId,
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        })
      : null;
  }

  if (!cart) {
    console.log("No cart found");
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subTotal: cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    ),
  };
};

export const createCart = async (): Promise<ShoppingCart> => {
  const session = await getServerSession(authOptions);

  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({
      data: {
        userId: session.user.id,
      },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });
  }

  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subTotal: 0,
  };
};

export const mergeAnonymouseCartIntoUserCart = async (userId: string) => {
  const localCartId = cookies().get("localCartId")?.value;

  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: {
          id: localCartId,
        },
        include: {
          items: true,
        },
      })
    : null;

  if (!localCart) {
    return;
  }

  const userCart = await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

      await tx.cartItem.deleteMany({
        where: {
          cartId: userCart.id,
        },
      });

      await tx.cartItem.createMany({
        data: mergedCartItems.map((item) => ({
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    } else {
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }
    await tx.cart.delete({
      where: {
        id: localCart.id,
      },
    });
    cookies().set("localCartId", "");
  });
};

function mergeCartItems(...cartItems: CartItem[][]): CartItem[] {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItem[]);
}
