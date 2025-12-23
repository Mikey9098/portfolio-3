"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";

const Contact = () => {
  return (
    <div className="relative z-10 h-200 px-6 w-full flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white tracking-tighter mb-4">
            Get In Touch
          </h2>
          <p className="text-zinc-400 text-lg">
            Let's build something amazing together.
          </p>
        </div>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Contact Information
                  </h3>
                  <p className="text-zinc-400 mb-8 leading-relaxed">
                    I'm currently looking for new opportunities and
                    collaborations. Drop me a message and I'll get back to you
                    within 24 hours.
                  </p>

                  <div className="space-y-4">
                    <a
                      href="mailto:yourname@email.com"
                      className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors"
                    >
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <Mail size={20} className="text-indigo-400" />
                      </div>
                      <span>oamartuvshin73@gmail.com</span>
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  {[
                    {
                      icon: <SiGithub size={20} />,
                      link: "https://github.com/Mikey9098",
                      label: "Github",
                    },
                    {
                      icon: <SiDiscord size={20} color="#5865F2" />,
                      link: "https://discord.com/users/881535975640166410",
                      label: "Discord",
                    },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.link}
                      target="_blank"
                      className="p-4 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                />
                <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Contact;
