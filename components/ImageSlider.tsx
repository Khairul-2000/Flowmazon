"use client";

import { display } from "@/lib/utils/display";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % display.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <Image
        src={display[currentIndex].image}
        alt="hero"
        width={800}
        height={800}
        className="h-full w-[1000px] rounded-md"
      />

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {display.map((image, index) => (
          <div
            className={`h-[8px] w-[8px] rounded-full ${currentIndex === index ? "bg-green-400" : "bg-gray-400"} `}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
