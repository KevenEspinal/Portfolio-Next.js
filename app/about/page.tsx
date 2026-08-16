'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';

const aboutData = {
  whoami: {
    id: "whoami",
    name: "about_me.sh",
    color: "text-[#22c55e]",
    cmd: "./about_me.sh",
    output: (
      <div className="space-y-4">
        <p className="text-white">keven_espinal_hazim</p>
        <p>I am an engineering student at the University of Rhode Island, balancing a rigorous academic schedule alongside commuter logistics and a part-time job.</p>
        <p>My focus lies at the intersection of low-level hardware and high-level software. I am deeply passionate about building tangible, functional systems—whether that involves soldering components for a custom desktop peripheral or writing the state-machine logic to bring it to life.</p>
      </div>
    )
  },
  education: {
    id: "education",
    name: "education.txt",
    color: "text-gray-300",
    cmd: "cat education.txt",
    output: (
      <div className="space-y-4">
        <p className="text-[#1cebce]">Institution: University of Rhode Island</p>
        <p>Currently pursuing a double major in Electrical Engineering and German, supplemented by a minor in Computer Science.</p>
        <p>My coursework heavily emphasizes C++ and embedded system architectures. I am actively focused on maintaining top-tier academic standing to facilitate institutional transfer applications for my upcoming junior fall semester.</p>
      </div>
    )
  },
  clubs: {
    id: "clubs",
    name: "clubs_and_orgs",
    color: "text-[#3b82f6]",
    cmd: "ls -la clubs_and_orgs/",
    output: (
      <div className="space-y-4">
        <div>
          <span className="text-[#3b82f6] font-bold">drwxr-xr-x</span> <span className="text-[#22c55e] font-bold">Autonomous_Racing_Car_Club</span>
          <p className="ml-4 mt-2 text-gray-400">Executing robotics operating software (ROS2) alongside basic machine learning fundamentals to program and navigate autonomous vehicles.</p>
        </div>
        <div className="mt-4">
          <span className="text-[#3b82f6] font-bold">drwxr-xr-x</span> <span className="text-[#22c55e] font-bold">Cybersecurity_Competitions</span>
          <p className="ml-4 mt-2 text-gray-400">Secured a first-place finish by applying advanced defensive technical strategies and strict security problem-solving protocols.</p>
        </div>
        <div className="mt-4">
          <span className="text-[#3b82f6] font-bold">drwxr-xr-x</span> <span className="text-[#22c55e] font-bold">Math_Olympiad</span>
          <p className="ml-4 mt-2 text-gray-400">Background in competitive quantitative problem-solving and logic.</p>
        </div>
      </div>
    )
  },
  hobbies: {
    id: "hobbies",
    name: "hobbies.sh",
    color: "text-[#22c55e]",
    cmd: "./hobbies.sh",
    output: (
      <div className="space-y-4">
        <p>When I am away from the workbench, my interests include:</p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li><span className="text-white">Hardware Tuning:</span> Carefully selecting, building, and configuring custom PC workstations to maximize processing and frame-rate performance.</li>
          <li><span className="text-white">Tactical Gaming:</span> Testing hardware optimizations in highly competitive tactical environments like Valorant, Overwatch, and Apex Legends.</li>
          <li><span className="text-white">Linguistics:</span> Fluent in English and Spanish, advanced in German, and actively learning basic Italian.</li>
        </ul>
      </div>
    )
  },
  contact: {
    id: "contact",
    name: "establish_connection.sh",
    color: "text-[#22c55e]",
    cmd: "./establish_connection.sh",
    output: (
      <div className="space-y-4">
        <p className="text-[#22c55e]">Connection established. Secure channels open.</p>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
          <a href="mailto:keven.espinalhazim@uri.edu" className="block p-4 bg-[#1a1b1e] border border-[#2c2e33] rounded hover:border-[#1cebce] transition-colors">
            <span className="text-gray-500 text-sm block">Email Protocol</span>
            <span className="text-white">keven.espinalhazim@uri.edu</span>
          </a>
          <a href="https://www.linkedin.com/in/keven-espinal-a6265331b/" target="_blank" rel="noreferrer" className="block p-4 bg-[#1a1b1e] border border-[#2c2e33] rounded hover:border-[#1cebce] transition-colors">
            <span className="text-gray-500 text-sm block">LinkedIn Network</span>
            <span className="text-white break-all">keven-espinal-a6265331b</span>
          </a>
        </div>
      </div>
    )
  }
};

type TabKey = keyof typeof aboutData;

export default function About() {
  const [activeTab, setActiveTab] = useState<TabKey>("whoami");
  const [typedCmd, setTypedCmd] = useState("");

  useEffect(() => {
    let i = 0;
    const fullCmd = aboutData[activeTab].cmd;
    setTypedCmd("");
    
    const interval = setInterval(() => {
      if (i <= fullCmd.length) {
        setTypedCmd(fullCmd.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [activeTab]);

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
        .text-accent { color: #1cebce; }
        .bg-accent { background-color: #1cebce; }
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
        .glass:hover::before { opacity: 1; }
        .glass > * { position: relative; z-index: 1; }
        .nav-link {
          position: relative;
          padding-bottom: 0.3rem;
          color: #d1d0c5;
          transition: color 0.3s ease;
        }
        .nav-link:hover { color: #1cebce; }
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
        .nav-link:hover::after { width: 100%; }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0e]/80 backdrop-blur-md border-b border-[#2c2e33]">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-mono text-xl md:text-2xl font-bold text-accent flex items-center">
            [<span>Keven Espinal Hazim</span><span className="animate-pulse">_</span>]
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-sm font-medium nav-link">home</Link>
            <Link href="/work" className="text-sm font-medium nav-link">work</Link>
            <Link href="/#skills" className="text-sm font-medium nav-link">skills</Link>
            <Link href="/about" className="text-sm font-medium nav-link text-accent">about</Link>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-7xl mx-auto px-8 pt-40 pb-24 relative z-10">
        <div className="flex items-end justify-between mb-12 border-b border-[#2c2e33] pb-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#f8fafc] tracking-tight">System Profile</h1>
            <p className="text-gray-400 mt-4 text-lg">Personal metadata and communications</p>
          </div>
          <div className="font-mono text-accent hidden md:block">03 // ABOUT</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          <div className="col-span-1 font-mono flex flex-col pt-2 p-1">
            <div className="mb-6 flex flex-wrap text-sm md:text-base">
              <span className="text-[#22c55e] font-bold">keven@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-[#3b82f6] font-bold">~</span>
              <span className="text-white mx-2">$</span>
              <span className="text-white">ls</span>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-4 text-sm md:text-base">
              {(Object.keys(aboutData) as TabKey[]).map((key) => {
                const item = aboutData[key];
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-3 py-2 transition-all duration-200 rounded ${
                      isActive ? "bg-[#2c2e33]/80 ring-1 ring-[#1cebce]" : "hover:bg-[#1a1b1e]/50"
                    }`}
                  >
                    <span className={`${item.color} ${isActive ? 'font-bold' : ''}`}>
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div onMouseMove={handleMouseMove} className="glass col-span-1 lg:col-span-2 min-h-[450px] font-mono flex flex-col rounded-md border border-[#2c2e33] bg-[#0c0c0e]">
            <div className="bg-[#1c1c1c] flex items-center justify-between select-none border-b border-[#2c2e33]">
              <div className="flex items-center">
                <div className="flex items-center bg-[#0c0c0e] px-4 py-2 text-xs text-gray-300 border-r border-[#2c2e33]">
                  <span className="mr-2">🐧</span>
                  <span>Ubuntu - Execution</span>
                </div>
                <div className="px-3 py-1 hover:bg-[#2c2e33] text-gray-400 cursor-pointer hidden sm:block">
                  +
                </div>
              </div>
              <div className="flex text-gray-400 text-sm hidden sm:flex">
                <div className="px-4 py-2 hover:bg-[#2c2e33] cursor-pointer">─</div>
                <div className="px-4 py-2 hover:bg-[#2c2e33] cursor-pointer">□</div>
                <div className="px-4 py-2 hover:bg-red-600 hover:text-white cursor-pointer transition-colors">✕</div>
              </div>
            </div>

            <div className="p-6 md:p-8 flex-grow flex flex-col text-sm md:text-base overflow-y-auto">
              <div className="mb-8 whitespace-pre-wrap">
                <span className="text-[#22c55e] font-bold">keven@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-[#3b82f6] font-bold">~</span>
                <span className="text-white">$ </span>
                <span className="text-white">{typedCmd}</span>
                {typedCmd.length === aboutData[activeTab].cmd.length && (
                  <span className="w-2 h-4 bg-white inline-block ml-1 animate-pulse align-middle"></span>
                )}
              </div>
              
              <div className={`text-gray-300 leading-relaxed transition-opacity duration-300 ${typedCmd.length === aboutData[activeTab].cmd.length ? 'opacity-100' : 'opacity-0'}`}>
                {aboutData[activeTab].output}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}