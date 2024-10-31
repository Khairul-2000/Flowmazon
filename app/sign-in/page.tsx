import SignInButton from "./SignInButton";

const page = () => {
  return (
    <div className="z-30 m-auto flex max-w-[400px] flex-col rounded-md bg-slate-400 p-6">
      <label className="font-bold" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        placeholder="mail@gmail.com"
        className="input input-bordered block w-full"
      />

      <label htmlFor="password" className="font-bold">
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="1234567.."
        className="input input-bordered block w-full placeholder:opacity-50"
      />

      <button type="submit" className="btn btn-primary mt-2 w-full">
        Sign In
      </button>
      <div className="divider">or</div>
      <SignInButton>Sign in With Google</SignInButton>
    </div>
  );
};

export default page;
