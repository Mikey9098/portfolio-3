"use client";

import React, { useEffect } from "react";
import Image from "next/image"; // Don't forget to import this!
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

// 1. Define your projects data here to keep the JSX clean
const MY_PROJECTS = [
  {
    title: "Project One",
    description:
      "A full-stack web application focused on user experience and real-time data.",
    tags: ["NEXT.JS", "TAILWIND", "SHADCN"],
    link: "https://project-ypxw.vercel.app/",
    image: "/project1.png",
  },
  {
    title: "Project Two",
    description:
      "Interactive frontend experiment exploring complex animations and 3D space.",
    tags: ["NEXT.JS", "TAILWIND", "TYPESCRIPT"],
    link: "projects",
    image: "/image.png",
  },
];

const Projects = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const background = useMotionTemplate`
              radial-gradient(
                800px circle at ${mouseX}px ${mouseY}px,
                rgba(120, 119, 198, 0.3), /* Soft Purple/Blue */
                transparent 80%
              )
            `;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="bg-background w-full min-h-screen relative overflow-hidden pb-20">
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24">
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-white tracking-tighter mb-4">
            Selected Work
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            A collection of websites I've built while studying web development.
            Focused on clean code and interactive design.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MY_PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/8 transition-all duration-300"
            >
              <div className="h-56 bg-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-transparent transition-colors duration-300" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/5 text-zinc-400 border border-white/10 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className="text-white text-sm font-medium inline-flex items-center gap-2 group/link"
                >
                  View Live Site
                  <span className="group-hover/link:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
