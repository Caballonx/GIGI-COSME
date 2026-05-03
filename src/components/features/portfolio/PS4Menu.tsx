"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTime } from "@/hooks/useTime";
import { projects, Project } from "@/lib/projects";
import { 
  Wifi, 
  Battery, 
  Clock, 
  User, 
  Gamepad2, 
  Settings, 
  Search, 
  Share2, 
  Info,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function PS4Menu() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentTime = useTime();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setSelectedIndex((prev) => (prev + 1) % projects.length);
    } else if (e.key === "ArrowLeft") {
      setSelectedIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown as any);
    return () => window.removeEventListener("keydown", handleKeyDown as any);
  }, []);

  const selectedProject = projects[selectedIndex];

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white font-sans ps4-gradient">
      {/* Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProject.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={selectedProject.image} 
            alt="background" 
            className="h-full w-full object-cover blur-xl scale-110"
          />
        </motion.div>
      </AnimatePresence>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center px-12 py-8 opacity-80">
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/40">
              <img src="/images/avatar.png" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold uppercase tracking-widest text-sm">Pablo's Portfolio</span>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60">
            <Gamepad2 size={16} />
            <span>Developer Mode</span>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <Search size={20} className="cursor-pointer hover:opacity-100 opacity-60" />
          <Settings size={20} className="cursor-pointer hover:opacity-100 opacity-60" />
          <div className="flex items-center gap-4 border-l border-white/20 pl-6">
            <Wifi size={18} />
            <Battery size={18} />
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span className="font-medium">{currentTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col justify-center h-[calc(100vh-160px)]">
        
        {/* Project Info (Above Tiles) */}
        <div className="px-24 mb-12 h-32 flex flex-col justify-end">
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-bold mb-4 tracking-tight">{selectedProject.title}</h1>
            <div className="flex gap-3">
              {selectedProject.tech.map((t) => (
                <span key={t} className="bg-white/10 px-3 py-1 rounded text-xs uppercase tracking-widest border border-white/10">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tiles Carousel */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-6 px-[10%] transition-transform duration-500 ease-out no-scrollbar"
            style={{ transform: `translateX(-${selectedIndex * 312}px)` }}
          >
            {projects.map((project, index) => (
              <ProjectTile 
                key={project.id}
                project={project}
                isSelected={index === selectedIndex}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
          
          {/* Navigation Hints */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-12 pointer-events-none">
            <ChevronLeft className={cn("opacity-40", selectedIndex === 0 && "invisible")} size={48} />
            <ChevronRight className={cn("opacity-40", selectedIndex === projects.length - 1 && "invisible")} size={48} />
          </div>
        </div>

        {/* Project Description (Below Tiles) */}
        <div className="px-24 mt-16 max-w-2xl">
          <motion.p
            key={selectedProject.id + "_desc"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg leading-relaxed italic"
          >
            {selectedProject.description}
          </motion.p>
          
          <motion.div 
            className="flex gap-8 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
              <Info size={20} />
              Ver Detalles
            </button>
            <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-colors">
              <Share2 size={20} />
              Compartir
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer / Context Menu Hint */}
      <div className="absolute bottom-8 right-12 text-sm uppercase tracking-widest opacity-40 flex gap-8">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full border border-white flex items-center justify-center text-[10px]">X</span>
          Seleccionar
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full border border-white flex items-center justify-center text-[10px]">O</span>
          Atrás
        </div>
      </div>
    </div>
  );
}

function ProjectTile({ project, isSelected, onClick }: { project: Project, isSelected: boolean, onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      animate={{ 
        scale: isSelected ? 1.2 : 1,
        y: isSelected ? -15 : 0,
      }}
      className={cn(
        "relative flex-shrink-0 w-72 h-72 rounded-xl overflow-hidden cursor-pointer transition-shadow duration-300",
        isSelected ? "tile-glow-active z-20" : "tile-glow opacity-60 z-10"
      )}
    >
      <img 
        src={project.image} 
        alt={project.title} 
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      {isSelected && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 border-4 border-white/50 rounded-xl"
        />
      )}
    </motion.div>
  );
}
