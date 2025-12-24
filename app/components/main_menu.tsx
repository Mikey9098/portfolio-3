"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
const Main_menu = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="bg-background w-full mt-20 flex flex-col items-center justify-center">
      <div className="relative z-10 flex flex-col-reverse md:flex-row gap-8 md:gap-24 text-white items-center w-full max-w-6xl px-6">
        <div className="flex flex-col gap-2 max-w-lg md:max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Hello I'm Amartuvhsin
          </h1>
          <p className="text-zinc-400 mt-2 text-base md:text-lg">
            I’m a student web developer who enjoys building interactive and
            visually clean websites. I focus on frontend development, combining
            logic, motion, and design to create smooth user experiences.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-blue-500/20 rounded-xl blur-2xl z-0" />

          <Image
            src="/20251030_174946.jpg"
            alt="Portfolio Picture"
            width={400}
            height={600}
            className="relative z-10 rounded-lg border border-white/10 shadow-2xl w-40 sm:w-64 md:w-96"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Main_menu;
