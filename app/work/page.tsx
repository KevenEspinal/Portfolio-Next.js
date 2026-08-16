'use client';

import React, { useState, MouseEvent } from 'react';
import Link from 'next/link';

const projectsData = [
  {
    id: "do-all-inator",
    title: "The Do-All-Inator",
    synopsis: "A custom functional desktop peripheral control hub engineered using an ESP32 microcontroller.",
    details: "This project involved building a custom desktop peripheral from scratch. It utilizes an ESP32 microcontroller to handle inputs from rotary encoders and push buttons. The core firmware is written entirely in C++ using custom state-machine logic to manage different modes of operation. It features active Bluetooth pairing for wireless control and optimized serial monitor communication for debugging and interfacing with PC software.",
    software: ["C++", "PlatformIO", "ESP32 Firmware"],
    skills: ["Embedded Systems", "Hardware Assembly", "State-Machine Logic", "Bluetooth Communication"],
    repo: "https://github.com/KevenEspinal"
  },
  {
    id: "autonomous-racing",
    title: "Autonomous Racing",
    synopsis: "Execution of robotics operating software (ROS2) alongside basic machine learning fundamentals for autonomous vehicle control.",
    details: "As part of the Autonomous Racing Car Club, this project focused on implementing autonomous driving capabilities for scaled vehicles. It required setting up a full Linux environment to run ROS2. The vehicle's navigation stack was configured using machine learning algorithms to process sensor data, map environments, and execute real-time vehicle control decisions autonomously.",
    software: ["ROS2", "Linux", "Python"],
    skills: ["Machine Learning", "Robotics Navigation", "Sensor Processing", "Systems Integration"],
    repo: "https://github.com/KevenEspinal"
  },
  {
    id: "custom-workstation",
    title: "Custom Workstation",
    synopsis: "Procured and assembled a heavy-duty programming and processing workstation, specifically configured to maximize frame-rate performance.",
    details: "This project encompassed the full lifecycle of building a high-performance desktop computer. It involved extensive research into component compatibility, bottleneck prevention, and thermal management. The final build was specifically optimized for heavy programming environments and achieving maximum sustained frame rates in competitive tactical games. The system utilizes an integrated NVIDIA graphics processing unit procured and configured for optimal output.",
    software: ["Windows OS", "BIOS Firmware", "Driver Optimization Utilities"],
    skills: ["Hardware Procurement", "Systems Assembly", "Performance Tuning", "Thermal Management"],
    repo: "https://github.com/KevenEspinal"
  },
  {
    id: "defense-protocol",
    title: "Defense Protocol",
    synopsis: "First-place finish utilizing advanced defensive technical strategies to execute strict security problem-solving protocols.",
    details: "This initiative was developed during a competitive campus cybersecurity event. It required analyzing network vulnerabilities, implementing strict firewall rules, and executing defensive protocols against simulated active threats. The strategies utilized ensured system integrity and secured a first-place finish by demonstrating rapid incident response and robust network hardening techniques.",
    software: ["Linux", "Nmap", "Wireshark", "Bash Scripting"],
    skills: ["Network Security", "Vulnerability Analysis", "Incident Response", "Threat Mitigation"],
    repo: "https://github.com/KevenEspinal"
  }
];

export default function Work() {
  const [openProject, setOpenProject] = useState<string | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const toggleProject = (id: string) => {
    if (openProject === id) {
      setOpenProject(null);
    } else {
      setOpenProject(id);
    }
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
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0e]/80 backdrop-blur-md border-b border-[#2c2e33]">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-mono text-xl md:text-2xl font-bold text-accent flex items-center">
            [<span>Keven Espinal Hazim</span><span className="animate-pulse">_</span>]
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-sm font-medium nav-link">home</Link>
            <Link href="/work" className="text-sm font-medium nav-link text-accent">work</Link>
            <Link href="/skills" className="text-sm font-medium nav-link">skills</Link>
            <Link href="/about" className="text-sm font-medium nav-link">about</Link>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-7xl mx-auto px-8 pt-40 pb-24 relative z-10">
        <div className="flex items-end justify-between mb-16 border-b border-[#2c2e33] pb-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#f8fafc] tracking-tight">Project Archive</h1>
            <p className="text-gray-400 mt-4 text-lg">Detailed documentation of engineering and software developments</p>
          </div>
          <div className="font-mono text-accent hidden md:block">01 // WORK</div>
        </div>

        <div className="flex flex-col gap-12">
          {projectsData.map((project) => (
            <div key={project.id} onMouseMove={handleMouseMove} className="glass p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/2 flex flex-col">
                <h2 className="text-3xl md:text-4xl font-bold text-[#f8fafc] mb-4">{project.title}</h2>
                <p className="text-gray-400 mb-8 text-lg leading-relaxed">{project.synopsis}</p>
                
                <button 
                  onClick={() => toggleProject(project.id)} 
                  className="text-accent font-mono text-3xl self-start hover:text-white transition-colors animate-pulse"
                >
                  &lt;/&gt;
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out w-full ${openProject === project.id ? 'max-h-[1200px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
                  <div className="p-8 bg-[#1a1b1e] border border-[#2c2e33] rounded-lg text-white flex flex-col gap-6">
                    <p className="text-base leading-relaxed text-gray-300">
                      {project.details}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#2c2e33]">
                      <div>
                        <span className="text-accent font-mono text-sm block mb-2">Software & Tools:</span>
                        <p className="text-sm text-gray-400">{project.software.join(", ")}</p>
                      </div>
                      <div>
                        <span className="text-accent font-mono text-sm block mb-2">Applied Skills:</span>
                        <p className="text-sm text-gray-400">{project.skills.join(", ")}</p>
                      </div>
                    </div>

                    <a href={project.repo} target="_blank" rel="noreferrer" className="text-accent font-mono text-sm hover:underline mt-4 inline-block">
                      &gt;&gt; Access Source Code Repository
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 h-80 bg-[#151619] border border-[#2c2e33] rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                <span className="text-gray-600 font-mono text-sm tracking-widest">[ IMAGE_RENDER_PENDING ]</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}