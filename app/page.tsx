'use client';

import React, { useState, useEffect, MouseEvent, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';

const initialHeroData = {
  name: 'Keven Espinal Hazim',
  roles: ['Electrical Engineering', 'Embedded Systems', 'Computer Science'],
  stats: [
    { value: 'C++', label: 'PRIMARY' },
    { value: 'URI', label: 'INSTITUTION' },
    { value: '2', label: 'ACADEMIC MAJORS' }
  ]
};

const initialProjectsData = [
  {
    id: "p1",
    category: "< hardware >",
    title: "The Do-All-Inator",
    description: "A custom functional desktop peripheral control hub engineered using an ESP32 microcontroller. Built entirely with custom state-machine logic, active Bluetooth pairing, and optimized serial monitor communication.",
    tags: ["ESP32", "C++"]
  },
  {
    id: "p2",
    category: "< software >",
    title: "Autonomous Racing",
    description: "Execution of robotics operating software (ROS2) alongside basic machine learning fundamentals for autonomous vehicle control.",
    tags: ["ROS2", "Linux"]
  },
  {
    id: "p3",
    category: "< security >",
    title: "Defense Protocol",
    description: "First-place finish utilizing advanced defensive technical strategies to execute strict security problem-solving protocols.",
    tags: ["Networking"]
  },
  {
    id: "p4",
    category: "< systems >",
    title: "Custom Workstation",
    description: "Procured and assembled a heavy-duty programming and processing workstation, specifically configured to maximize frame-rate performance for competitive environments.",
    tags: ["Hardware", "Optimization"]
  }
];

const initialSkillsData = [
  {
    id: "cpp",
    name: "C++",
    colorClass: "text-[#a855f7]",
    cmd: "cd C++_Keven_Information",
    exec: "./run_firmware.sh",
    description: "I have utilized C++ for several years as my primary language for data structures and embedded hardware programming. It forms the backbone of the custom state-machine logic and firmware utilized in the Do-All-Inator.",
    link: "#work",
    linkText: "cd ../Projects/Do-All-Inator"
  },
  {
    id: "python",
    name: "Python",
    colorClass: "text-[#a855f7]",
    cmd: "cd Python_Scripts",
    exec: "python3 machine_learning_init.py",
    description: "I leverage Python for high-level scripting, rapid prototyping, and integrating logic alongside my microprocessor coursework.",
    link: "#work",
    linkText: "cat related_projects.txt"
  },
  {
    id: "ros2",
    name: "ROS2 & Linux",
    colorClass: "text-[#a855f7]",
    cmd: "cd Robotics_OS",
    exec: "ros2 launch nav2_bringup navigation_launch.py",
    description: "I execute robotics operating software alongside basic machine learning fundamentals for autonomous vehicle control within the Autonomous Racing Car Club.",
    link: "#work",
    linkText: "cd ../Projects/Autonomous-Racing"
  },
  {
    id: "hardware",
    name: "Embedded Hardware",
    colorClass: "text-[#22c55e]",
    cmd: "cd Embedded_Systems",
    exec: "make flash monitor",
    description: "I engineer and assemble custom desktop peripherals using ESP32 and STM32 microcontrollers, rotary encoders, and digital displays. I manage live Bluetooth pairing and optimize serial monitor communication lines.",
    link: "#work",
    linkText: "cd ../Projects/Hardware"
  },
  {
    id: "systems",
    name: "Systems Optimization",
    colorClass: "text-[#22c55e]",
    cmd: "cd Custom_Workstation",
    exec: "sudo lshw -C display",
    description: "I procure and assemble heavy-duty programming workstations. I specifically configure and tune hardware setups to maximize frame-rate performance for competitive tactical titles like Valorant, Overwatch, and Apex Legends.",
    link: "#work",
    linkText: "cd ../Projects/Workstation"
  },
  {
    id: "cyber",
    name: "Cybersecurity",
    colorClass: "text-[#22c55e]",
    cmd: "cd Defense_Protocol",
    exec: "nmap -sV -p- 192.168.1.1",
    description: "I apply advanced defensive technical strategies to execute strict security problem-solving protocols, which contributed to a first-place finish in a campus cybersecurity competition.",
    link: "#work",
    linkText: "cd ../Projects/Defense"
  },
  {
    id: "linguistics",
    name: "Linguistics",
    colorClass: "text-[#f97316]",
    cmd: "cd Linguistics_Profile",
    exec: "cat languages.json",
    description: "I am fluent in both English and Spanish. I am currently pursuing a double major in German for advanced proficiency, and I possess a basic working proficiency in Italian.",
    link: "#about",
    linkText: "cd ../About_Me"
  }
];

export default function Home() {
  const { isAdmin } = useAuth();
  
  const [typedText, setTypedText] = useState('');
  
  const [heroData, setHeroData] = useState(initialHeroData);
  const [projectsList, setProjectsList] = useState(initialProjectsData);
  const [skillsList, setSkillsList] = useState<any[]>(initialSkillsData);
  
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [terminalText, setTerminalText] = useState("");
  
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [heroFormData, setHeroFormData] = useState(initialHeroData);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [projectFormData, setProjectFormData] = useState({
    category: '', title: '', description: '', tagsString: ''
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', colorClass: 'text-[#1cebce]', cmd: '', exec: '', description: '', link: '#work', linkText: ''
  });

  const lastScrollTime = useRef(0);
  const toolkitRef = useRef<HTMLDivElement>(null);

  const fetchLiveContent = async () => {
    try {
      const [skillsRes, heroRes, projectsRes] = await Promise.all([
        fetch('/api/toolkit', { cache: 'no-store' }),
        fetch('/api/hero', { cache: 'no-store' }),
        fetch('/api/projects', { cache: 'no-store' })
      ]);

      const heroDbData = await heroRes.json();
      const skillsData = await skillsRes.json();
      const projectsData = await projectsRes.json();

      // We use the presence of Hero data to verify the database has been migrated
      const isDbActive = Boolean(heroDbData && heroDbData.name);

      if (isDbActive) {
        setHeroData(heroDbData);
      }

      if (skillsData && Array.isArray(skillsData)) {
        if (skillsData.length > 0 || isDbActive) {
          setSkillsList(skillsData);
        }
      }

      if (projectsData && Array.isArray(projectsData)) {
        if (projectsData.length > 0 || isDbActive) {
          setProjectsList(projectsData);
        }
      }

    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLiveContent();
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index <= heroData.name.length) {
          setTypedText(heroData.name.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 120);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, [heroData.name]);

  useEffect(() => {
    let i = 0;
    if (!skillsList[selectedSkill]) return;
    const fullStr = skillsList[selectedSkill].description;
    setTerminalText("");
    
    const interval = setInterval(() => {
      if (i <= fullStr.length) {
        setTerminalText(fullStr.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 8);
    return () => clearInterval(interval);
  }, [selectedSkill, skillsList]);

  useEffect(() => {
    const el = toolkitRef.current;
    if (!el || skillsList.length === 0) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 40) return;

      if (e.deltaY > 0) {
        setSelectedSkill((prev) => (prev + 1) % skillsList.length);
      } else if (e.deltaY < 0) {
        setSelectedSkill((prev) => (prev - 1 + skillsList.length) % skillsList.length);
      }
      lastScrollTime.current = now;
    };

    el.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleNativeWheel);
  }, [skillsList.length]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleHeroEditClick = () => {
    setHeroFormData(heroData);
    setIsHeroModalOpen(true);
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroFormData),
      });
      if (!res.ok) {
        alert("Failed to update Hero section.");
        return;
      }
      setIsHeroModalOpen(false);
      fetchLiveContent();
    } catch (error) {
      alert("Network Error");
    }
  };

  const handleProjectEditClick = (index: number) => {
    const proj = projectsList[index];
    setProjectFormData({
      category: proj.category,
      title: proj.title,
      description: proj.description,
      tagsString: proj.tags.join(', ')
    });
    setEditingProjectIndex(index);
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProjectIndex === null) return;

    const updatedProjects = [...projectsList];
    updatedProjects[editingProjectIndex] = {
      ...updatedProjects[editingProjectIndex],
      category: projectFormData.category,
      title: projectFormData.title,
      description: projectFormData.description,
      tags: projectFormData.tagsString.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProjects),
      });
      if (!res.ok) {
        alert("Failed to update Projects.");
        return;
      }
      setIsProjectModalOpen(false);
      fetchLiveContent();
    } catch (error) {
      alert("Network Error");
    }
  };

  const handleMigrateData = async () => {
    const dbNames = skillsList.filter(s => s._id).map(s => s.name);
    for (const skill of initialSkillsData) {
      if (!dbNames.includes(skill.name)) {
        const { id, ...rest } = skill;
        await fetch('/api/toolkit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rest),
        });
      }
    }
    
    await fetch('/api/hero', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initialHeroData),
    });

    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initialProjectsData),
    });

    fetchLiveContent();
  };

  const handleAddNewClick = () => {
    setFormData({ name: '', colorClass: 'text-[#1cebce]', cmd: '', exec: '', description: '', link: '#work', linkText: '' });
    setEditingId(null);
    setIsAddModalOpen(true);
  };

  const handleEditClick = (skill: any) => {
    setFormData({
      name: skill.name,
      colorClass: skill.colorClass,
      cmd: skill.cmd,
      exec: skill.exec,
      description: skill.description,
      link: skill.link || '',
      linkText: skill.linkText || ''
    });
    setEditingId(skill._id);
    setIsAddModalOpen(true);
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { _id: editingId, ...formData } : formData;

      const res = await fetch('/api/toolkit', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Failed to save: ${errorData.error}`);
        return; 
      }
      
      setIsAddModalOpen(false);
      setEditingId(null);
      setFormData({ name: '', colorClass: 'text-[#1cebce]', cmd: '', exec: '', description: '', link: '#work', linkText: '' });
      fetchLiveContent();

    } catch (error) {
      alert("Network Error: Could not connect to the database.");
    }
  };

  const handleDeleteSkill = async (id: string, index: number) => {
    if (!id) return; 
    await fetch(`/api/toolkit?id=${id}`, { method: 'DELETE' });
    if (selectedSkill === index) setSelectedSkill(0);
    fetchLiveContent();
  };

  return (
    <div className="min-h-screen h-fit w-full m-0 p-0 relative bg-[#0c0c0e] text-[#d1d0c5] font-sans overflow-x-hidden selection:bg-[#1cebce] selection:text-black">
      <style jsx global>{`
        html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar {
          display: none;
        }
        html, body, * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .text-accent { color: #1cebce; }
        .bg-accent { background-color: #1cebce; }
        .border-accent { border-color: #1cebce; }
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
        .jump-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
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
        .nav-link:hover { color: #1cebce; }
        .nav-link::after {
          content: ''; position: absolute; left: 50%; bottom: 0; width: 0; height: 2px;
          background-color: #1cebce; transition: width 0.3s ease-in-out; transform: translateX(-50%);
        }
        .nav-link:hover::after { width: 100%; }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0e]/80 backdrop-blur-md border-b border-[#2c2e33]">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-mono text-xl md:text-2xl font-bold text-accent flex items-center">
            [<span>{typedText}</span><span className="animate-pulse">_</span>]
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="#" className="text-sm font-medium nav-link">home</Link>
            <Link href="/work" className="text-sm font-medium nav-link">work</Link>
            <Link href="/skills" className="text-sm font-medium nav-link">skills</Link>
            <Link href="/about" className="text-sm font-medium nav-link">about</Link>
          </div>
        </div>
      </nav>

      <div className="w-full flex pt-40 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto w-full px-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="w-full md:w-3/5 relative">
            
            {isAdmin && (
              <button 
                onClick={handleHeroEditClick}
                className="absolute -top-10 left-0 text-xs text-[#eab308] border border-[#eab308] px-3 py-1 rounded hover:bg-[#eab308] hover:text-white transition-colors"
              >
                EDIT HERO SECTION
              </button>
            )}

            <div className="mb-4"><span className="font-mono text-accent text-lg font-medium">&gt;&gt; status: online</span></div>
            <h1 className="font-bold text-6xl md:text-8xl mb-8 tracking-tighter text-[#f8fafc]">
              {heroData.name}.
            </h1>
            <div className="space-y-3 mb-10 border-l-4 border-accent pl-6">
              {heroData.roles.map((role, idx) => (
                <div key={idx} className="text-2xl md:text-3xl font-light text-gray-400">{role}</div>
              ))}
            </div>
            <div className="flex gap-6 mt-8">
              <Link href="/resume.pdf" target="_blank" className="px-8 py-3 border border-accent text-accent hover:bg-[#1cebce]/10 font-semibold rounded jump-card font-mono text-sm">/resume</Link>
              <Link href="https://github.com/KevenEspinal" target="_blank" className="px-8 py-3 border border-[#404245] text-gray-300 hover:border-accent hover:text-accent font-semibold rounded jump-card font-mono text-sm">/github</Link>
            </div>
          </div>
          <div className="hidden md:flex w-2/5 justify-end">
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              
              <div onMouseMove={handleMouseMove} className="glass p-6 text-left jump-card flex flex-col justify-center">
                <div className="text-3xl font-bold text-accent mb-1">{heroData.stats[0].value}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{heroData.stats[0].label}</div>
              </div>
              <div onMouseMove={handleMouseMove} className="glass p-6 text-left jump-card flex flex-col justify-center">
                <div className="text-3xl font-bold text-accent mb-1">{heroData.stats[1].value}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{heroData.stats[1].label}</div>
              </div>
              <div onMouseMove={handleMouseMove} className="glass p-6 text-left jump-card col-span-2 flex flex-col justify-center">
                <div className="text-3xl font-bold text-accent mb-1">{heroData.stats[2].value}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{heroData.stats[2].label}</div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 py-24 relative z-10" id="work">
        <div className="flex items-end justify-between mb-12 border-b border-[#2c2e33] pb-6">
          <div><h2 className="text-4xl md:text-5xl font-bold text-[#f8fafc] tracking-tight">Latest Projects</h2></div>
          <div className="font-mono text-accent">01 //</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectsList.map((project, index) => (
            <div 
              key={index}
              onMouseMove={handleMouseMove} 
              className={`glass p-8 jump-card block flex flex-col justify-between min-h-[300px] group relative ${index === 0 || index === 3 ? 'md:col-span-2' : 'md:col-span-1'}`}
            >
              {isAdmin && (
                <button 
                  onClick={() => handleProjectEditClick(index)}
                  className="absolute top-4 right-4 text-xs text-[#eab308] border border-[#eab308] px-2 py-1 rounded opacity-0 group-hover:opacity-100 hover:bg-[#eab308] hover:text-white transition-all z-20"
                >
                  EDIT
                </button>
              )}
              
              <div>
                <div className="font-mono text-accent text-sm mb-4">{project.category}</div>
                <h3 className={`${index === 0 || index === 3 ? 'text-3xl' : 'text-2xl'} font-bold text-[#f8fafc] mb-4`}>{project.title}</h3>
                <p className={`${index === 0 || index === 3 ? 'text-base max-w-md' : 'text-sm'} text-gray-400`}>{project.description}</p>
              </div>
              <div className="mt-8 flex gap-3 flex-wrap">
                {project.tags.map((tag: string, tIdx: number) => (
                  <span key={tIdx} className="text-xs px-3 py-1 bg-[#1a1b1e] rounded text-gray-300 border border-[#404245]">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 py-24 relative z-10" id="skills">
        
        <div className="flex items-end justify-between mb-12 border-b border-[#2c2e33] pb-6">
          <div className="flex items-center gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#f8fafc] tracking-tight">My Toolkit</h2>
              <p className="text-gray-400 mt-2 text-lg">Interactive module of my technical stack</p>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleAddNewClick}
                  className="w-10 h-10 rounded-full border border-[#1cebce] text-[#1cebce] flex items-center justify-center hover:bg-[#1cebce] hover:text-black transition-colors font-mono text-xl"
                  title="Add New Skill"
                >
                  +
                </button>
                <button 
                  onClick={handleMigrateData}
                  className="px-4 py-2 rounded border border-gray-500 text-gray-500 flex items-center justify-center hover:border-white hover:text-white transition-colors font-mono text-xs tracking-widest uppercase"
                  title="Push hardcoded fallback data to MongoDB"
                >
                  Migrate Data
                </button>
              </div>
            )}
          </div>
          <div className="font-mono text-accent">02 //</div>
        </div>

        <div ref={toolkitRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 flex flex-col justify-center gap-6 font-mono text-lg border-l border-[#2c2e33] pl-6">
            {skillsList.map((skill, index) => (
              <div key={skill._id || skill.id} className="flex items-center group relative w-full pr-4">
                <button
                  onClick={() => setSelectedSkill(index)}
                  className={`text-left transition-all duration-300 flex items-center ${
                    selectedSkill === index ? `${skill.colorClass} font-bold translate-x-2` : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {skill.name}
                  {selectedSkill === index && <span className="ml-4 text-white animate-pulse">&lt;-</span>}
                </button>
                
                {isAdmin && skill._id && (
                  <div className="ml-auto flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEditClick(skill); }}
                      className="text-xs text-[#eab308] border border-[#eab308] px-2 py-1 rounded hover:bg-[#eab308] hover:text-white transition-colors"
                      title="Edit this entry"
                    >
                      EDIT
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDeleteSkill(skill._id, index); }}
                      className="text-xs text-[#ef4444] border border-[#ef4444] px-2 py-1 rounded hover:bg-[#ef4444] hover:text-white transition-colors"
                      title="Delete this entry"
                    >
                      DEL
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div onMouseMove={handleMouseMove} className="glass p-8 col-span-1 md:col-span-2 min-h-[350px] font-mono flex flex-col">
            {skillsList[selectedSkill] && (
              <>
                <div className="text-accent mb-6 text-lg md:text-xl">
                  {skillsList[selectedSkill].cmd} {"{"}
                </div>
                <div className="text-gray-500 mb-4 pl-4 md:pl-8 text-sm md:text-base">
                  $ {skillsList[selectedSkill].exec}
                </div>
                
                <div className="text-white pl-4 md:pl-8 flex-grow whitespace-pre-wrap leading-relaxed text-sm md:text-base overflow-y-auto no-scrollbar max-h-[250px]">
                  {terminalText}
                </div>
                
                {terminalText.length === skillsList[selectedSkill].description.length && (
                  <div className="pl-4 md:pl-8 mt-8">
                    <Link href={skillsList[selectedSkill].link} className="text-accent hover:underline text-sm md:text-base">
                      $ {skillsList[selectedSkill].linkText}
                    </Link>
                  </div>
                )}
                <div className="text-accent mt-6 text-lg md:text-xl">{"}"}</div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 py-24 relative z-10" id="about">
        <div className="flex items-end justify-between mb-12 border-b border-[#2c2e33] pb-6">
          <div><h2 className="text-4xl md:text-5xl font-bold text-[#f8fafc] tracking-tight">System Profile</h2></div>
          <div className="font-mono text-accent">03 //</div>
        </div>
        <div onMouseMove={handleMouseMove} className="glass p-10 md:p-16 jump-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#f8fafc] mb-6">Background</h3>
              <p className="text-gray-400 leading-relaxed mb-6">I am an engineering student at the University of Rhode Island managing a rigorous academic schedule alongside commuter logistics and part-time work. I am currently pursuing a double major in Electrical Engineering and German, supplemented by a minor in Computer Science.</p>
              <p className="text-gray-400 leading-relaxed">My focus lies heavily in C++ development and custom hardware assembly. I am preparing to maintain top-tier academic standing to facilitate future institutional transfer applications.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#f8fafc] mb-6">Hobbies & Optimization</h3>
              <p className="text-gray-400 leading-relaxed">When I am away from the workbench, I spend my time tuning custom PC configurations and engaging in competitive tactical gaming. I enjoy the process of carefully selecting and configuring hardware specifically to maximize frame rates and overall performance.</p>
            </div>
          </div>
        </div>
      </div>

      {isAddModalOpen && isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0c0c0e]/80 backdrop-blur-md cursor-pointer" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-[#0a0a0c] border border-[#2c2e33] rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] z-10 text-[#d1d0c5] font-mono max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1cebce] to-transparent opacity-50"></div>
            <div className="flex justify-between items-center mb-6 border-b border-[#2c2e33] pb-4">
              <p className="text-[#1cebce] font-bold text-lg">{editingId ? 'Edit Existing Skill' : 'Append New Skill to Toolkit'}</p>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-600 hover:text-[#f8fafc] text-sm">[ ESC ]</button>
            </div>
            <form onSubmit={handleSaveSkill} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">SKILL_NAME</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">COLOR_CLASS</label>
                  <select value={formData.colorClass} onChange={e => setFormData({...formData, colorClass: e.target.value})} className="bg-[#0c0c0e] border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2">
                    <option value="text-[#1cebce]">Teal</option>
                    <option value="text-[#a855f7]">Purple</option>
                    <option value="text-[#22c55e]">Green</option>
                    <option value="text-[#f97316]">Orange</option>
                    <option value="text-[#ef4444]">Red</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">TERMINAL_CMD</label>
                  <input required type="text" value={formData.cmd} onChange={e => setFormData({...formData, cmd: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">TERMINAL_EXEC</label>
                  <input required type="text" value={formData.exec} onChange={e => setFormData({...formData, exec: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">DESCRIPTION</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-transparent border border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] p-3 min-h-[100px] text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">LINK_URL (Optional)</label>
                  <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">LINK_TEXT (Optional)</label>
                  <input type="text" value={formData.linkText} onChange={e => setFormData({...formData, linkText: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" />
                </div>
              </div>
              <button type="submit" className="mt-4 border border-[#1cebce] rounded-xl text-[#1cebce] hover:bg-[#1cebce] hover:text-black transition-colors py-3 font-bold tracking-widest text-sm uppercase">
                {editingId ? 'Push Update to Database' : 'Push to Production'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isHeroModalOpen && isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0c0c0e]/80 backdrop-blur-md cursor-pointer" onClick={() => setIsHeroModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-[#0a0a0c] border border-[#2c2e33] rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] z-10 text-[#d1d0c5] font-mono max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#eab308] to-transparent opacity-50"></div>
            <div className="flex justify-between items-center mb-6 border-b border-[#2c2e33] pb-4">
              <p className="text-[#eab308] font-bold text-lg">Edit Hero Section</p>
              <button onClick={() => setIsHeroModalOpen(false)} className="text-gray-600 hover:text-[#f8fafc] text-sm">[ ESC ]</button>
            </div>
            <form onSubmit={handleSaveHero} className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">MAIN_NAME</label>
                <input required type="text" value={heroFormData.name} onChange={e => setHeroFormData({...heroFormData, name: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#eab308] outline-none text-[#f8fafc] py-2" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-2 block">ROLES_LIST</label>
                <div className="flex flex-col gap-2">
                  {[0, 1, 2].map(idx => (
                    <input key={idx} required type="text" value={heroFormData.roles[idx]} onChange={e => {
                      const newRoles = [...heroFormData.roles];
                      newRoles[idx] = e.target.value;
                      setHeroFormData({...heroFormData, roles: newRoles});
                    }} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#eab308] outline-none text-[#f8fafc] py-2" />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-2 block">GRID_STATISTICS</label>
                <div className="flex flex-col gap-4">
                  {[0, 1, 2].map(idx => (
                    <div key={idx} className="flex gap-4">
                      <input required type="text" placeholder="Value (e.g. C++)" value={heroFormData.stats[idx].value} onChange={e => {
                        const newStats = [...heroFormData.stats];
                        newStats[idx].value = e.target.value;
                        setHeroFormData({...heroFormData, stats: newStats});
                      }} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#eab308] outline-none text-[#f8fafc] py-2 w-1/2" />
                      <input required type="text" placeholder="Label (e.g. PRIMARY)" value={heroFormData.stats[idx].label} onChange={e => {
                        const newStats = [...heroFormData.stats];
                        newStats[idx].label = e.target.value;
                        setHeroFormData({...heroFormData, stats: newStats});
                      }} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#eab308] outline-none text-[#f8fafc] py-2 w-1/2" />
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit" className="mt-4 border border-[#eab308] rounded-xl text-[#eab308] hover:bg-[#eab308] hover:text-black transition-colors py-3 font-bold tracking-widest text-sm uppercase">
                Update Hero Display
              </button>
            </form>
          </div>
        </div>
      )}

      {isProjectModalOpen && isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0c0c0e]/80 backdrop-blur-md cursor-pointer" onClick={() => setIsProjectModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-[#0a0a0c] border border-[#2c2e33] rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] z-10 text-[#d1d0c5] font-mono max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#eab308] to-transparent opacity-50"></div>
            <div className="flex justify-between items-center mb-6 border-b border-[#2c2e33] pb-4">
              <p className="text-[#eab308] font-bold text-lg">Edit Project Details</p>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-gray-600 hover:text-[#f8fafc] text-sm">[ ESC ]</button>
            </div>
            <form onSubmit={handleSaveProject} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">CATEGORY_TAG</label>
                <input required type="text" value={projectFormData.category} onChange={e => setProjectFormData({...projectFormData, category: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#eab308] outline-none text-[#f8fafc] py-2" placeholder="e.g. < hardware >" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">PROJECT_TITLE</label>
                <input required type="text" value={projectFormData.title} onChange={e => setProjectFormData({...projectFormData, title: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#eab308] outline-none text-[#f8fafc] py-2" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">DESCRIPTION</label>
                <textarea required value={projectFormData.description} onChange={e => setProjectFormData({...projectFormData, description: e.target.value})} className="bg-transparent border border-[#2c2e33] focus:border-[#eab308] outline-none text-[#f8fafc] p-3 min-h-[100px] text-sm" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">TAGS (Comma separated)</label>
                <input required type="text" value={projectFormData.tagsString} onChange={e => setProjectFormData({...projectFormData, tagsString: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#eab308] outline-none text-[#f8fafc] py-2" placeholder="e.g. ESP32, C++, Hardware" />
              </div>
              <button type="submit" className="mt-4 border border-[#eab308] rounded-xl text-[#eab308] hover:bg-[#eab308] hover:text-black transition-colors py-3 font-bold tracking-widest text-sm uppercase">
                Push Project Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}