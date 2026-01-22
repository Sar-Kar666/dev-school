"use client";

import { useEffect, useRef } from "react";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiDocker,
  SiPrisma, SiSequelize
} from "react-icons/si";

const techStack = [
  { name: "React", icon: FaReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Express", icon: SiExpress },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
{ name: "Prisma", icon: SiPrisma },
  { name: "ORM (Sequelize)", icon: SiSequelize },
  { name: "Git", icon: FaGitAlt },
  { name: "GitHub", icon: FaGithub },
  { name: "HTML5", icon: FaHtml5 },
  { name: "CSS3", icon: FaCss3Alt },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Docker", icon: SiDocker },
];

export const TechCarousel = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let scrollAmount = 0;

    const scroll = () => {
      scrollAmount += 0.5;
      if (scrollAmount >= scroller.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scroller.scrollLeft = scrollAmount;
      requestAnimationFrame(scroll);
    };

    scroll();
  }, []);

  return (
    <div className="relative  overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-white to-transparent z-10" />

      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-hidden whitespace-nowrap py-2"
      >
        {[...techStack, ...techStack].map((tech, i) => (
          <div
            key={i}
            className="
                flex items-center gap-4
                rounded-2xl
                border border-blue-100
                bg-white
                px-8 py-5
                shadow-sm
                transition
                hover:scale-[1.03]
                hover:shadow-lg
            "
            >
           <tech.icon className="text-3xl text-blue-500" />
            <span className="text-base font-semibold text-slate-800">
            {tech.name}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
};
