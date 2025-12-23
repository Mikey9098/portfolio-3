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
    <div className=" bg-background w-full h-screen flex flex-col items-center justify-center ">
      <div className="relative z-10 flex gap-24 text-white items-center">
        <div className="flex flex-col gap-2 w-150">
          <h1 className="text-6xl font-bold tracking-tighter">
            Hello I'm Amartuvhsin
          </h1>
          <p className="text-zinc-400 mt-2 text-lg">
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
            className="relative z-10 rounded-lg border border-white/10 shadow-2xl"
            priority
          />
        </div>
      </div>
      <div className="pt-20 w-274 flex-col text-white text-left">
        <h1 className="mb-3 text-5xl Text-white font-bold">My skills</h1>
        <InfiniteSlider speedOnHover={90} gap={24}>
          <img
            src="/html.png"
            alt="HTML"
            className="aspect-square w-20 rounded-lg p-2"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
            alt="CSS"
            className="aspect-square w-20 rounded-lg  p-2"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            alt="JavaScript"
            className="aspect-square w-20 rounded-lg  p-2"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            alt="React"
            className="aspect-square w-20 rounded-lg  p-2"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
            alt="Tailwind CSS"
            className="aspect-square w-20 rounded-lg  p-2"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
            alt="Next.js"
            className="aspect-square w-20 rounded-lg p-2 invert"
          />
          <img
            src="https://ui.shadcn.com/favicon.ico"
            alt="shadcn/ui"
            className="aspect-square w-20 rounded-lg  p-2"
          />
        </InfiniteSlider>
      </div>
    </div>
  );
};

export default Main_menu;
