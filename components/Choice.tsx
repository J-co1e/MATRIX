import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface ChoiceProps {
  onChoose: (choice: "red" | "blue") => void;
}

export const Choice: React.FC<ChoiceProps> = ({ onChoose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const redPillRef = useRef<HTMLButtonElement>(null);
  const bluePillRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline();
    tl.fromTo(
      redPillRef.current,
      {
        scale: 0,
        opacity: 0,
        rotation: -90,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1,0.3)",
      }
    ).fromTo(
      bluePillRef.current,
      {
        scale: 0,
        opacity: 0,
        rotation: 90,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1,0.3)",
      },
      "<"
    );
  }, []);

  const handleHover = (element: HTMLButtonElement | null) => {
    if (!element) return;
    gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  const handleLeave = (element: HTMLButtonElement | null) => {
    if (!element) return;
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-12 z-20">
      <h2 className="text-2xl text-green-400 mb-8 tracking-widest uppercase opacity-80">
        Make your choice
      </h2>
      <div className="flex gap-10 md:gap-20">
        <div className="flex flex-col items-center group">
          <button
            ref={bluePillRef}
            onClick={() => onChoose("blue")}
            onMouseEnter={() => handleHover(bluePillRef.current)}
            onMouseLeave={() => handleLeave(bluePillRef.current)}
            className="w-20 h-40 md:w-24 md:h-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-900 border border-blue-300 shadow-xl cursor-pointer relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_30px_#0088ff]"
          >
            <div className="absolute top-4 left-4 w-6 h-12 bg-white opacity-20 rounded-full filter blur-sm"></div>
          </button>
          <span className="mt-4 text-blue-400 text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            IGNORANCE
          </span>
        </div>

        <div className="flex flex-col items-center group">
          <button
            ref={redPillRef}
            onClick={() => onChoose("red")}
            onMouseEnter={() => handleHover(redPillRef.current)}
            onMouseLeave={() => handleLeave(redPillRef.current)}
            className="w-20 h-40 md:w-24 md:h-48 rounded-full bg-gradient-to-br from-red-500 to-red-900 border border-red-300 shadow-xl cursor-pointer relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_30px_#ff0033]"
          >
            <div className="absolute top-4 left-4 w-6 h-12 bg-white opacity-20 rounded-full filter blur-sm"></div>
          </button>
          <span className="mt-4 text-red-500 text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            TRUTH
          </span>
        </div>
      </div>
    </div>
  );
};
