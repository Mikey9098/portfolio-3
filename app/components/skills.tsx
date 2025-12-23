"use client";

const skills = [
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://simpleicons.org/icons/tailwindcss.svg",
  },
  {
    name: "Shadcn UI",
    icon: "https://simpleicons.org/icons/shadcnui.svg",
  },
];

export default function Skills() {
  return (
    <>
      <div className="w-full py-24 px-6 bg-background text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-left">
            Skills
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center justify-center p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/30 transition"
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-12 h-12 mb-3"
                />
                <p className="text-sm font-medium opacity-90">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
