"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const page = () => {
  const menuData = [
    {
      category: "Hot Beverages",
      items: [
        { name: "Espresso", desc: "Rich and bold single shot", price: "$2.50" },
        {
          name: "Cappuccino",
          desc: "Espresso with steamed milk foam",
          price: "$4.25",
        },
        {
          name: "Latte",
          desc: "Smooth espresso with steamed milk",
          price: "$4.75",
        },
      ],
    },
    {
      category: "Cold Beverages",
      items: [
        { name: "Iced Coffee", desc: "Cold brew over ice", price: "$3.50" },
        { name: "Frappé", desc: "Blended iced coffee drink", price: "$5.25" },
        {
          name: "Cold Brew",
          desc: "Smooth, less acidic coffee",
          price: "$4.00",
        },
      ],
    },
    {
      category: "Pastries",
      items: [
        { name: "Croissant", desc: "Buttery, flaky pastry", price: "$3.00" },
        {
          name: "Blueberry Muffin",
          desc: "Fresh baked with real blueberries",
          price: "$2.75",
        },
        {
          name: "Chocolate Chip Cookie",
          desc: "Warm and gooey",
          price: "$2.25",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4e4bc] font-sans selection:bg-amber-200">
      {/* HEADER */}
      <header className="fixed top-0 w-full flex items-center justify-between bg-[#8b4513] px-12 py-4 z-50 shadow-xl transition-all duration-300">
        <div className="text-[#f4e4bc] font-bold text-2xl cursor-pointer hover:text-[#d4af37] transition-all hover:scale-105">
          <h1>☕ Brew & Bean</h1>
        </div>
        <nav>
          <ul className="flex gap-8 text-[#f4e4bc] font-medium">
            {["Home", "Menu", "About", "Location"].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-[#d4af37] transition-colors duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* HERO SECTION */}
      <main
        id="home"
        className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden"
      >
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 69, 19, 0.7), rgba(101, 67, 33, 0.7)), url('https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&q=80')`,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-[#f4e4bc]"
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-4">
            Fresh Coffee, Every Morning
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Handcrafted beverages made with love and the finest beans from
            around the world.
          </p>
          <button className="bg-[#d4af37] text-amber-950 font-bold px-8 py-4 rounded-md shadow-lg hover:bg-[#b8941f] hover:scale-105 hover:shadow-2xl transition-all active:scale-95">
            View Our Menu
          </button>
        </motion.div>
      </main>

      {/* MENU SECTION */}
      <section id="menu" className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-[#8b4513] mb-16">
          Our Menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {menuData.map((cat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-[#d4af37]"
            >
              <h3 className="text-2xl font-bold text-[#8b4513] mb-6 border-b-2 border-amber-100 pb-2">
                {cat.category}
              </h3>
              <div className="space-y-6">
                {cat.items.map((item, ii) => (
                  <div
                    key={ii}
                    className="flex justify-between items-start group border-b border-gray-50 pb-2 hover:bg-gray-50 rounded p-1 transition-colors"
                  >
                    <div>
                      <h4 className="text-slate-900 font-semibold">
                        {item.name}
                      </h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                    <span className="text-[#d4af37] font-bold">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-4xl md:text-5xl font-bold text-[#8b4513] mb-16">
            Our Story
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-2 space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Founded in 2018, Brew & Bean started as a small neighborhood
                coffee shop with a big dream: to serve the perfect cup of coffee
                to our community.
              </p>
              <p>
                We source our beans directly from farmers around the world,
                ensuring fair trade practices and the highest quality. Every cup
                is carefully crafted by our skilled baristas.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  icon: "🌱",
                  title: "Sustainable",
                  desc: "Eco-friendly practices and fair trade",
                },
                {
                  icon: "👥",
                  title: "Community",
                  desc: "A gathering place for locals",
                },
                {
                  icon: "🏆",
                  title: "Quality",
                  desc: "Premium beans and expert preparation",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 bg-slate-50 rounded-xl border-2 border-transparent hover:border-[#d4af37] hover:bg-white transition-all group text-center"
                >
                  <div className="text-3xl mb-2 group-hover:scale-125 transition-transform">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-[#8b4513]">{feature.title}</h4>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section id="location" className="py-24 bg-[#2c1810] text-[#f4e4bc]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold mb-8 text-white">Visit Us</h2>
            <div className="hover:bg-amber-900/20 p-4 rounded-lg transition-colors">
              <h4 className="text-[#d4af37] font-bold text-xl">Address</h4>
              <p className="opacity-80">
                123 Coffee Street, Downtown District, City, State 12345
              </p>
            </div>
            <div className="hover:bg-amber-900/20 p-4 rounded-lg transition-colors">
              <h4 className="text-[#d4af37] font-bold text-xl">Hours</h4>
              <p className="opacity-80">
                Mon-Fri: 6am-8pm | Sat: 7am-9pm | Sun: 8am-6pm
              </p>
            </div>
          </div>
          <div className="bg-[#8b4513] rounded-2xl p-12 flex flex-col justify-center items-center text-center border-4 border-transparent hover:border-[#d4af37] hover:bg-[#a0522d] transition-all cursor-pointer">
            <h4 className="text-3xl mb-4">📍 Find Us Here</h4>
            <p className="text-lg opacity-90">
              Located in the heart of downtown, just two blocks from the main
              square.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a0f0a] text-[#f4e4bc] py-8 text-center border-t border-white/5 hover:bg-[#2c1810] transition-colors">
        <p>© 2024 Brew & Bean Coffee House. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default page;
