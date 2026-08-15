'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Keven Espinal Hazim';

  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 120);
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="min-h-screen h-fit w-full m-0 p-0 relative bg-[#0c0c0e] text-[#d1d0c5] font-sans overflow-x-hidden selection:bg-[#1cebce] selection:text-black">
      <style jsx global>{`
        .text-accent {
          color: #1cebce;
        }
        .bg-accent {
          background-color: #1cebce;
        }
        .border-accent {
          border-color: #1cebce;
        }
        .glass {
          background: rgba(30, 30, 34, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.75rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }
        .glass::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(600px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(28, 235, 206, 0.08), transparent 40%);
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
          z-index: 0;
        }
        .glass:hover::before {
          opacity: 1;
        }
        .glass > * {
          position: relative;
          z-index: 1;
        }
        .jump-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .jump-card:hover {
          transform: translateY(-6px) scale(1.01);
          border-color: rgba(28, 235, 206, 0.4);
          box-shadow: 0 20px 25px -5px rgba(28, 235, 206, 0.05), 0 10px 10px -5px rgba(28, 235, 206, 0.02);
        }
        .nav-link {
          position: relative;
          padding-bottom: 0.3rem;
          color: #d1d0c5;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: #1cebce;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 0;
          height: 2px;
          background-color: #1cebce;
          transition: width 0.3s ease-in-out;
          transform: translateX(-50%);
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .skill-pill-purple {
          border-color: #a855f7;
          background: linear-gradient(90deg, rgba(168,85,247,0.15), rgba(192,132,252,0.15));
        }
        .skill-pill-green {
          border-color: #22c55e;
          background: linear-gradient(90deg, rgba(34,197,94,0.15), rgba(74,222,128,0.15));
        }
        .skill-pill-orange {
          border-color: #f97316;
          background: linear-gradient(90deg, rgba(249,115,22,0.15), rgba(251,146,60,0.15));
        }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0e]/80 backdrop-blur-md border-b border-[#2c2e33]">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-mono text-xl md:text-2xl font-bold text-accent flex items-center">
            [<span>{typedText}</span><span className="animate-pulse">_</span>]
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="#" className="text-sm font-medium nav-link">home</Link>
            <Link href="#work" className="text-sm font-medium nav-link">work</Link>
            <Link href="#skills" className="text-sm font-medium nav-link">skills</Link>
            <Link href="#about" className="text-sm font-medium nav-link">about</Link>
          </div>
        </div>
      </nav>

      <div className="w-full flex pt-40 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto w-full px-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="w-full md:w-3/5">
            <div className="mb-4">
              <span className="font-mono text-accent text-lg font-medium">&gt;&gt; status: online</span>
            </div>
            <h1 className="font-bold text-6xl md:text-8xl mb-8 tracking-tighter text-[#f8fafc]">
              Keven Espinal Hazim.
            </h1>
            <div className="space-y-3 mb-10 border-l-4 border-accent pl-6">
              <div className="text-2xl md:text-3xl font-light text-gray-400">
                Electrical Engineering
              </div>
              <div className="text-2xl md:text-3xl font-light text-gray-400">
                Embedded Systems
              </div>
              <div className="text-2xl md:text-3xl font-light text-gray-400">
                Computer Science
              </div>
            </div>
            <div className="flex gap-6 mt-8">
              <Link href="/resume.pdf" target="_blank" className="px-8 py-3 border border-accent text-accent hover:bg-[#1cebce]/10 font-semibold rounded jump-card font-mono text-sm">
                /resume
              </Link>
              <Link href="https://github.com/KevenEspinal" target="_blank" className="px-8 py-3 border border-[#404245] text-gray-300 hover:border-accent hover:text-accent font-semibold rounded jump-card font-mono text-sm">
                /github
              </Link>
            </div>
          </div>
          <div className="hidden md:flex w-2/5 justify-end">
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              <div onMouseMove={handleMouseMove} className="glass p-6 text-left jump-card flex flex-col justify-center">
                <div className="text-3xl font-bold text-accent mb-1">C++</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Primary</div>
              </div>
              <div onMouseMove={handleMouseMove} className="glass p-6 text-left jump-card flex flex-col justify-center">
                <div className="text-3xl font-bold text-accent mb-1">URI</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Institution</div>
              </div>
              <div onMouseMove={handleMouseMove} className="glass p-6 text-left jump-card col-span-2 flex flex-col justify-center">
                <div className="text-3xl font-bold text-accent mb-1">2</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Academic Majors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 py-24 relative z-10" id="work">
        <div className="flex items-end justify-between mb-12 border-b border-[#2c2e33] pb-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f8fafc] tracking-tight">Latest Projects</h2>
          </div>
          <div className="font-mono text-accent">01 //</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div onMouseMove={handleMouseMove} className="glass p-8 jump-card block md:col-span-2 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="font-mono text-accent text-sm mb-4">&lt; hardware &gt;</div>
              <h3 className="text-3xl font-bold text-[#f8fafc] mb-4">The Do-All-Inator</h3>
              <p className="text-base text-gray-400 max-w-md">A custom functional desktop peripheral control hub engineered using an ESP32 microcontroller. Built entirely with custom state-machine logic, active Bluetooth pairing, and optimized serial monitor communication.</p>
            </div>
            <div className="mt-8 flex gap-3">
              <span className="text-xs px-3 py-1 bg-[#1a1b1e] rounded text-gray-300 border border-[#404245]">ESP32</span>
              <span className="text-xs px-3 py-1 bg-[#1a1b1e] rounded text-gray-300 border border-[#404245]">C++</span>
            </div>
          </div>

          <div onMouseMove={handleMouseMove} className="glass p-8 jump-card block md:col-span-1 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="font-mono text-accent text-sm mb-4">&lt; software &gt;</div>
              <h3 className="text-2xl font-bold text-[#f8fafc] mb-4">Autonomous Racing</h3>
              <p className="text-sm text-gray-400">Execution of robotics operating software (ROS2) alongside basic machine learning fundamentals for autonomous vehicle control.</p>
            </div>
            <div className="mt-8 flex gap-3 flex-wrap">
              <span className="text-xs px-3 py-1 bg-[#1a1b1e] rounded text-gray-300 border border-[#404245]">ROS2</span>
              <span className="text-xs px-3 py-1 bg-[#1a1b1e] rounded text-gray-300 border border-[#404245]">Linux</span>
            </div>
          </div>

          <div onMouseMove={handleMouseMove} className="glass p-8 jump-card block md:col-span-1 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="font-mono text-accent text-sm mb-4">&lt; security &gt;</div>
              <h3 className="text-2xl font-bold text-[#f8fafc] mb-4">Defense Protocol</h3>
              <p className="text-sm text-gray-400">First-place finish utilizing advanced defensive technical strategies to execute strict security problem-solving protocols.</p>
            </div>
            <div className="mt-8 flex gap-3 flex-wrap">
              <span className="text-xs px-3 py-1 bg-[#1a1b1e] rounded text-gray-300 border border-[#404245]">Networking</span>
            </div>
          </div>

          <div onMouseMove={handleMouseMove} className="glass p-8 jump-card block md:col-span-2 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="font-mono text-accent text-sm mb-4">&lt; systems &gt;</div>
              <h3 className="text-3xl font-bold text-[#f8fafc] mb-4">Custom Workstation</h3>
              <p className="text-base text-gray-400 max-w-md">Procured and assembled a heavy-duty programming and processing workstation, specifically configured to maximize frame-rate performance for competitive environments.</p>
            </div>
            <div className="mt-8 flex gap-3">
              <span className="text-xs px-3 py-1 bg-[#1a1b1e] rounded text-gray-300 border border-[#404245]">Hardware</span>
              <span className="text-xs px-3 py-1 bg-[#1a1b1e] rounded text-gray-300 border border-[#404245]">Optimization</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 py-24 relative z-10" id="skills">
        <div className="flex items-end justify-between mb-12 border-b border-[#2c2e33] pb-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f8fafc] tracking-tight">Top Skills</h2>
            <p className="text-gray-400 mt-2 text-lg">Fast snapshot of my technical stack</p>
          </div>
          <div className="font-mono text-accent">02 //</div>
        </div>

        <div className="space-y-8">
          <div onMouseMove={handleMouseMove} className="glass p-8 jump-card">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-6">Programming & Software</h3>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border skill-pill-purple text-white hover:brightness-110 transition-all cursor-default">
                💻 C++
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border skill-pill-purple text-white hover:brightness-110 transition-all cursor-default">
                💻 Python
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border skill-pill-purple text-white hover:brightness-110 transition-all cursor-default">
                ⚙️ ROS2
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border skill-pill-purple text-white hover:brightness-110 transition-all cursor-default">
                🐧 Linux
              </span>
            </div>
          </div>

          <div onMouseMove={handleMouseMove} className="glass p-8 jump-card">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-6">Hardware Engineering</h3>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border skill-pill-green text-white hover:brightness-110 transition-all cursor-default">
                🔌 ESP32 Microcontrollers
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border skill-pill-green text-white hover:brightness-110 transition-all cursor-default">
                🔌 STM32 Architecture
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border skill-pill-green text-white hover:brightness-110 transition-all cursor-default">
                📟 Rotary Encoders
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border skill-pill-green text-white hover:brightness-110 transition-all cursor-default">
                🖥️ Systems Assembly
              </span>
            </div>
          </div>

          <div onMouseMove={handleMouseMove} className="glass p-8 jump-card">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-6">Linguistics</h3>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border skill-pill-orange text-white hover:brightness-110 transition-all cursor-default">
                🗣️ English (Fluent)
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border skill-pill-orange text-white hover:brightness-110 transition-all cursor-default">
                🗣️ Spanish (Fluent)
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border skill-pill-orange text-white hover:brightness-110 transition-all cursor-default">
                🗣️ German (Advanced)
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border skill-pill-orange text-white hover:brightness-110 transition-all cursor-default">
                🗣️ Italian (Basic)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 py-24 relative z-10" id="about">
        <div className="flex items-end justify-between mb-12 border-b border-[#2c2e33] pb-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f8fafc] tracking-tight">System Profile</h2>
          </div>
          <div className="font-mono text-accent">03 //</div>
        </div>

        <div onMouseMove={handleMouseMove} className="glass p-10 md:p-16 jump-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#f8fafc] mb-6">Background</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                I am an engineering student at the University of Rhode Island managing a rigorous academic schedule alongside commuter logistics and part-time work. I am currently pursuing a double major in Electrical Engineering and German, supplemented by a minor in Computer Science.
              </p>
              <p className="text-gray-400 leading-relaxed">
                My focus lies heavily in C++ development and custom hardware assembly. I am preparing to maintain top-tier academic standing to facilitate future institutional transfer applications.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#f8fafc] mb-6">Hobbies & Optimization</h3>
              <p className="text-gray-400 leading-relaxed">
                When I am away from the workbench, I spend my time tuning custom PC configurations and engaging in competitive tactical gaming. I enjoy the process of carefully selecting and configuring hardware specifically to maximize frame rates and overall performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}