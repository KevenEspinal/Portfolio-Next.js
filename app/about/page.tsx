'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const initialAboutData = [
  {
    id: "whoami",
    name: "about_me.sh",
    fileType: "executable",
    color: "text-[#22c55e]",
    cmd: "./about_me.sh",
    content: `<div class="space-y-4">\n  <p class="text-white">keven_espinal_hazim</p>\n  <p>I am an engineering student at the University of Rhode Island, balancing a rigorous academic schedule alongside commuter logistics and a part-time job.</p>\n  <p>My focus lies at the intersection of low-level hardware and high-level software. I am deeply passionate about building tangible, functional systems—whether that involves soldering components for a custom desktop peripheral or writing the state-machine logic to bring it to life.</p>\n</div>`,
    images: []
  },
  {
    id: "education",
    name: "education.txt",
    fileType: "text",
    color: "text-gray-300",
    cmd: "cat education.txt",
    content: `<div class="space-y-4">\n  <p class="text-[#1cebce]">Institution: University of Rhode Island</p>\n  <p>Currently pursuing a double major in Electrical Engineering and German, supplemented by a minor in Computer Science.</p>\n  <p>My coursework heavily emphasizes C++ and embedded system architectures. I am actively focused on maintaining top-tier academic standing to facilitate institutional transfer applications for my upcoming junior fall semester.</p>\n</div>`,
    images: []
  },
  {
    id: "clubs",
    name: "clubs_and_orgs",
    fileType: "directory",
    color: "text-[#3b82f6]",
    cmd: "ls -la clubs_and_orgs/",
    content: `<div class="space-y-4">\n  <div>\n    <span class="text-[#3b82f6] font-bold">drwxr-xr-x</span> <span class="text-[#22c55e] font-bold">Autonomous_Racing_Car_Club</span>\n    <p class="ml-4 mt-2 text-gray-400">Executing robotics operating software (ROS2) alongside basic machine learning fundamentals to program and navigate autonomous vehicles.</p>\n  </div>\n  <div class="mt-4">\n    <span class="text-[#3b82f6] font-bold">drwxr-xr-x</span> <span class="text-[#22c55e] font-bold">Cybersecurity_Competitions</span>\n    <p class="ml-4 mt-2 text-gray-400">Secured a first-place finish by applying advanced defensive technical strategies and strict security problem-solving protocols.</p>\n  </div>\n  <div class="mt-4">\n    <span class="text-[#3b82f6] font-bold">drwxr-xr-x</span> <span class="text-[#22c55e] font-bold">Math_Olympiad</span>\n    <p class="ml-4 mt-2 text-gray-400">Background in competitive quantitative problem-solving and logic.</p>\n  </div>\n</div>`,
    images: []
  },
  {
    id: "hobbies",
    name: "hobbies.sh",
    fileType: "executable",
    color: "text-[#22c55e]",
    cmd: "./hobbies.sh",
    content: `<div class="space-y-4">\n  <p>When I am away from the workbench, my interests include:</p>\n  <ul class="list-disc list-inside space-y-2 ml-2">\n    <li><span class="text-white">Hardware Tuning:</span> Carefully selecting, building, and configuring custom PC workstations to maximize processing and frame-rate performance.</li>\n    <li><span class="text-white">Tactical Gaming:</span> Testing hardware optimizations in highly competitive tactical environments like Valorant, Overwatch, and Apex Legends.</li>\n    <li><span class="text-white">Linguistics:</span> Fluent in English and Spanish, advanced in German, and actively learning basic Italian.</li>\n  </ul>\n</div>`,
    images: []
  },
  {
    id: "contact",
    name: "establish_connection.sh",
    fileType: "executable",
    color: "text-[#22c55e]",
    cmd: "./establish_connection.sh",
    content: `<div class="space-y-4">\n  <p class="text-[#22c55e]">Connection established. Secure channels open.</p>\n  <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">\n    <a href="mailto:keven.espinalhazim@uri.edu" class="block p-4 bg-[#1a1b1e] border border-[#2c2e33] rounded hover:border-[#1cebce] transition-colors">\n      <span class="text-gray-500 text-sm block">Email Protocol</span>\n      <span class="text-white">keven.espinalhazim@uri.edu</span>\n    </a>\n    <a href="https://www.linkedin.com/in/keven-espinal-a6265331b/" target="_blank" rel="noreferrer" class="block p-4 bg-[#1a1b1e] border border-[#2c2e33] rounded hover:border-[#1cebce] transition-colors">\n      <span class="text-gray-500 text-sm block">LinkedIn Network</span>\n      <span class="text-white break-all">keven-espinal-a6265331b</span>\n    </a>\n  </div>\n</div>`,
    images: []
  }
];

export default function About() {
  const { isAdmin } = useAuth();
  
  const [aboutList, setAboutList] = useState<any[]>(initialAboutData);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [typedCmd, setTypedCmd] = useState("");

  const [hoveredImg, setHoveredImg] = useState<number | null>(null);
  const [lockedImg, setLockedImg] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', fileType: 'executable', color: 'text-[#22c55e]', cmd: '', content: '', images: [] as { title: string, data: string }[]
  });

  const fetchLiveAbout = async () => {
    try {
      const res = await fetch('/api/about', { cache: 'no-store' });
      const data = await res.json();
      if (data && Array.isArray(data)) {
        const dbNames = data.map((item: any) => item.name);
        const notInDb = initialAboutData.filter(file => !dbNames.includes(file.name));
        setAboutList([...notInDb, ...data]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLiveAbout();
  }, []);

  useEffect(() => {
    setHoveredImg(null);
    setLockedImg(null);
    let i = 0;
    if (!aboutList[activeTabIndex]) return;
    const fullCmd = aboutList[activeTabIndex].cmd;
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
  }, [activeTabIndex, aboutList]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMigrateData = async () => {
    const dbNames = aboutList.filter(f => f._id).map(f => f.name);
    for (const file of initialAboutData) {
      if (!dbNames.includes(file.name)) {
        const { id, ...rest } = file; 
        await fetch('/api/about', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rest),
        });
      }
    }
    fetchLiveAbout();
  };

  const handleFileTypeChange = (type: string, currentName: string) => {
    let newColor = "text-[#22c55e]";
    let newCmd = currentName ? `./${currentName}` : './';

    if (type === "text") {
      newColor = "text-gray-300";
      newCmd = currentName ? `cat ${currentName}` : 'cat ';
    } else if (type === "directory") {
      newColor = "text-[#3b82f6]";
      newCmd = currentName ? `ls -la ${currentName}/` : 'ls -la ';
    }

    setFormData({ ...formData, fileType: type, color: newColor, cmd: newCmd });
  };

  const handleNameChange = (name: string) => {
    let newCmd = formData.cmd;
    if (formData.fileType === "executable") newCmd = `./${name}`;
    if (formData.fileType === "text") newCmd = `cat ${name}`;
    if (formData.fileType === "directory") newCmd = `ls -la ${name}/`;
    
    setFormData({ ...formData, name, cmd: newCmd });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      const defaultTitle = file.name.split('.')[0].replace(/[^a-zA-Z0-9_]/g, '_');
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, { title: defaultTitle, data: base64String }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleImageTitleChange = (index: number, newTitle: string) => {
    const newImages = [...formData.images];
    newImages[index].title = newTitle;
    setFormData({ ...formData, images: newImages });
  };

  const handleAddClick = () => {
    setFormData({ name: '', fileType: 'executable', color: 'text-[#22c55e]', cmd: './', content: '', images: [] });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    const activeFile = aboutList[activeTabIndex];
    setFormData({
      name: activeFile.name,
      fileType: activeFile.fileType || 'executable',
      color: activeFile.color,
      cmd: activeFile.cmd,
      content: activeFile.content,
      images: activeFile.images || []
    });
    setEditingId(activeFile._id);
    setIsModalOpen(true);
  };

  const handleSaveFile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { _id: editingId, ...formData } : formData;

      const res = await fetch('/api/about', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        alert("Failed to save file.");
        return;
      }
      setIsModalOpen(false);
      setEditingId(null);
      fetchLiveAbout();
    } catch (error) {
      alert("Network Error");
    }
  };

  const handleDeleteFile = async () => {
    const activeFile = aboutList[activeTabIndex];
    if (!activeFile._id) return;
    await fetch(`/api/about?id=${activeFile._id}`, { method: 'DELETE' });
    setActiveTabIndex(0);
    fetchLiveAbout();
  };

  const activeImgIndex = lockedImg !== null ? lockedImg : hoveredImg;
  const isCmdTypingDone = aboutList[activeTabIndex] && typedCmd.length === aboutList[activeTabIndex].cmd.length;
  const currentImgData = aboutList[activeTabIndex]?.images?.[activeImgIndex !== null ? activeImgIndex : 0];

  return (
    <div className="min-h-screen h-fit w-full m-0 p-0 relative bg-[#0c0c0e] text-[#d1d0c5] font-sans overflow-x-hidden selection:bg-[#1cebce] selection:text-black">
      <style jsx global>{`
        html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar { display: none; }
        html, body, * { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fastPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-fast-pulse {
          animation: fastPulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

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
          content: ''; position: absolute; left: 50%; bottom: 0; width: 0; height: 2px;
          background-color: #1cebce; transition: width 0.3s ease-in-out; transform: translateX(-50%);
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
            <Link href="/skills" className="text-sm font-medium nav-link">skills</Link>
            <Link href="/about" className="text-sm font-medium nav-link text-accent">about</Link>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-7xl mx-auto px-8 pt-40 pb-8 relative z-10">
        <div className="flex items-end justify-between border-b border-[#2c2e33] pb-6">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#f8fafc] tracking-tight">System Profile</h1>
              <p className="text-gray-400 mt-4 text-lg">Personal metadata and communications</p>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleAddClick}
                  className="w-10 h-10 rounded-full border border-[#1cebce] text-[#1cebce] flex items-center justify-center hover:bg-[#1cebce] hover:text-black transition-colors font-mono text-xl"
                  title="Add New File"
                >
                  +
                </button>
                <button 
                  onClick={handleMigrateData}
                  className="px-4 py-2 rounded border border-gray-500 text-gray-500 flex items-center justify-center hover:border-white hover:text-white transition-colors font-mono text-xs tracking-widest uppercase"
                >
                  Migrate Data
                </button>
              </div>
            )}
          </div>
          <div className="font-mono text-accent hidden md:block">03 // ABOUT</div>
        </div>
      </div>

      {/* The Native Flexbox Centering Layer. This guarantees mathematically identical left and right empty spaces */}
      <div className="w-full mx-auto px-8 pb-24 relative z-10 flex flex-col lg:flex-row items-start justify-center">
        
        {/* Main Grid: Locked permanently to max-w-7xl. The shrink-0 ensures the Terminal never squishes or resizes */}
        <div className="w-full max-w-7xl shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 transition-all duration-700">
          
          <div className="col-span-1 font-mono flex flex-col pt-2 p-1">
            <div className="mb-6 flex flex-wrap text-sm md:text-base">
              <span className="text-[#22c55e] font-bold">keven@portfolio</span>
              <span className="text-white">:</span>
              <span className="text-[#3b82f6] font-bold">~</span>
              <span className="text-white mx-2">$</span>
              <span className="text-white">ls</span>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-4 text-sm md:text-base">
              {aboutList.map((file, index) => {
                const isActive = activeTabIndex === index;
                return (
                  <button
                    key={file._id || file.id}
                    onClick={() => setActiveTabIndex(index)}
                    className={`px-3 py-2 transition-all duration-200 rounded ${
                      isActive ? "bg-[#2c2e33]/80 ring-1 ring-[#1cebce]" : "hover:bg-[#1a1b1e]/50"
                    }`}
                  >
                    <span className={`${file.color} ${isActive ? 'font-bold' : ''}`}>
                      {file.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div onMouseMove={handleMouseMove} className="glass col-span-1 lg:col-span-2 min-h-[450px] font-mono flex flex-col rounded-md border border-[#2c2e33] bg-[#0c0c0e]">
            <div className="bg-[#1c1c1c] flex items-center justify-between select-none border-b border-[#2c2e33] z-10 shrink-0">
              <div className="flex items-center">
                <div className="flex items-center bg-[#0c0c0e] px-4 py-2 text-xs text-gray-300 border-r border-[#2c2e33]">
                  <span className="mr-2">🐧</span>
                  <span>Ubuntu - Execution</span>
                </div>
                
                {isAdmin && aboutList[activeTabIndex]?._id && (
                  <div className="flex items-center px-4 gap-3">
                    <button onClick={handleEditClick} className="text-xs text-[#eab308] hover:text-white transition-colors">
                      [ EDIT FILE ]
                    </button>
                    <button onClick={handleDeleteFile} className="text-xs text-[#ef4444] hover:text-white transition-colors">
                      [ DEL FILE ]
                    </button>
                  </div>
                )}
              </div>
              <div className="flex text-gray-400 text-sm hidden sm:flex">
                <div className="px-4 py-2 hover:bg-[#2c2e33] cursor-pointer">─</div>
                <div className="px-4 py-2 hover:bg-[#2c2e33] cursor-pointer">□</div>
                <div className="px-4 py-2 hover:bg-red-600 hover:text-white cursor-pointer transition-colors">✕</div>
              </div>
            </div>

            <div className="p-6 md:p-8 flex-grow flex flex-col text-sm md:text-base overflow-y-auto">
              {aboutList[activeTabIndex] && (
                <>
                  <div className="mb-8 whitespace-pre-wrap">
                    <span className="text-[#22c55e] font-bold">keven@portfolio</span>
                    <span className="text-white">:</span>
                    <span className="text-[#3b82f6] font-bold">~</span>
                    <span className="text-white">$ </span>
                    <span className="text-white">{typedCmd}</span>
                    {typedCmd.length === aboutList[activeTabIndex].cmd.length && (
                      <span className="w-2 h-4 bg-white inline-block ml-1 animate-pulse align-middle"></span>
                    )}
                  </div>
                  
                  <div 
                    className={`text-gray-300 leading-relaxed transition-opacity duration-300 ${isCmdTypingDone ? 'opacity-100' : 'opacity-0'}`}
                    dangerouslySetInnerHTML={{ __html: aboutList[activeTabIndex].content }}
                  />

                  {isCmdTypingDone && aboutList[activeTabIndex].images && aboutList[activeTabIndex].images.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-[#2c2e33]/50 flex flex-col gap-1">
                      {aboutList[activeTabIndex].images.map((img: any, idx: number) => (
                        <div 
                          key={idx} 
                          className={`flex items-center w-[calc(100%+3rem)] md:w-[calc(100%+4rem)] -ml-6 md:-ml-8 px-6 md:px-8 py-4 transition-all duration-300 cursor-pointer group rounded ${lockedImg === idx ? 'bg-[#1a1b1e]/50' : 'hover:bg-[#1a1b1e]/50'}`}
                          style={{ opacity: isCmdTypingDone ? 1 : 0 }}
                          onMouseEnter={() => setHoveredImg(idx)}
                          onMouseLeave={() => setHoveredImg(null)}
                          onClick={() => setLockedImg(lockedImg === idx ? null : idx)}
                        >
                          <div className="whitespace-pre-wrap w-full flex items-center flex-wrap">
                            <span className="text-[#22c55e] font-bold">keven@portfolio</span>
                            <span className="text-white">:</span>
                            <span className="text-[#3b82f6] font-bold">~</span>
                            <span className="text-white mx-2">$</span>
                            <span 
                              className={`text-[#1cebce] transition-colors group-hover:text-white ml-2 ${lockedImg === idx ? 'font-bold underline text-white' : 'animate-fast-pulse group-hover:animate-none'}`}
                              title="Click to lock image viewer"
                            >
                              g++ {img.title}.cpp -o myprogram
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Expanding Image Viewer Wrapper. Animating the width from 0 to 24rem causes the center point to smoothly shift. */}
        <div className={`hidden lg:block overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 ${
          activeImgIndex !== null ? 'w-[24rem] xl:w-[32rem] opacity-100 ml-8 md:ml-12' : 'w-0 opacity-0 ml-0'
        }`}>
          {currentImgData && (
            <div className="w-[24rem] xl:w-[32rem] flex flex-col h-fit glass font-mono rounded-md border border-[#2c2e33] bg-[#0c0c0e]">
              <div className="bg-[#1c1c1c] p-3 flex justify-between items-center border-b border-[#2c2e33] select-none shrink-0">
                <span className="text-xs text-gray-400 font-mono tracking-widest truncate pr-4">
                  {currentImgData.title}.cpp_render
                </span>
                <div className="flex gap-2 shrink-0">
                  {lockedImg !== null && (
                    <button onClick={() => setLockedImg(null)} className="w-3 h-3 rounded-full bg-[#ef4444] hover:bg-red-400 transition-colors" title="Close Viewer"></button>
                  )}
                  <div className="w-3 h-3 rounded-full bg-[#eab308]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                </div>
              </div>
              <div className="p-4 bg-[#0c0c0e] rounded-b-md flex items-center justify-center">
                <img 
                  src={currentImgData.data} 
                  alt="Compiled Graphic Render" 
                  className="block w-full h-auto object-contain rounded border border-[#2c2e33]" 
                />
              </div>
            </div>
          )}
        </div>

      </div>

      <div 
        className={`fixed inset-4 glass font-mono flex-col rounded-md border border-[#2c2e33] bg-[#0c0c0e] transition-all duration-500 ease-out z-[100] lg:hidden ${
          activeImgIndex !== null ? 'opacity-100 pointer-events-auto flex' : 'opacity-0 pointer-events-none flex'
        }`}
      >
        {currentImgData && (
          <>
            <div className="bg-[#1c1c1c] p-3 flex justify-between items-center border-b border-[#2c2e33] select-none">
              <span className="text-xs text-gray-400 font-mono tracking-widest truncate">
                {currentImgData.title}.cpp_render
              </span>
              <div className="flex gap-2">
                <button onClick={() => { setLockedImg(null); setHoveredImg(null); }} className="w-3 h-3 rounded-full bg-[#ef4444] hover:bg-red-400 transition-colors" title="Close Viewer"></button>
                <div className="w-3 h-3 rounded-full bg-[#eab308]"></div>
                <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-center bg-[#0c0c0e] flex-grow overflow-auto">
              <img 
                src={currentImgData.data} 
                alt="Compiled Graphic Render" 
                className="max-w-full max-h-full object-contain rounded border border-[#2c2e33]" 
              />
            </div>
          </>
        )}
      </div>

      {isModalOpen && isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0c0c0e]/80 backdrop-blur-md cursor-pointer" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-3xl bg-[#0a0a0c] border border-[#2c2e33] rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] z-10 text-[#d1d0c5] font-mono max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1cebce] to-transparent opacity-50"></div>
            
            <div className="flex justify-between items-center mb-6 border-b border-[#2c2e33] pb-4">
              <p className="text-[#1cebce] font-bold text-lg">{editingId ? 'Edit File Config' : 'Create New System File'}</p>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-[#f8fafc] text-sm">[ ESC ]</button>
            </div>

            <form onSubmit={handleSaveFile} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">FILE_NAME</label>
                  <input required type="text" value={formData.name} onChange={e => handleNameChange(e.target.value)} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" placeholder="e.g. references.txt" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">FILE_TYPE (Auto-formats Color & CMD)</label>
                  <select value={formData.fileType} onChange={e => handleFileTypeChange(e.target.value, formData.name)} className="bg-[#0c0c0e] border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2">
                    <option value="executable">Executable (.sh)</option>
                    <option value="text">Standard Text (.txt)</option>
                    <option value="directory">Directory Folder (/)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">TERMINAL_COMMAND</label>
                <input required type="text" value={formData.cmd} onChange={e => setFormData({...formData, cmd: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2 text-gray-400" />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1 flex justify-between">
                  <span>FILE_CONTENT</span>
                  <span className="text-[#eab308]">Note: Standard Text & Raw HTML supported.</span>
                </label>
                <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="bg-transparent border border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] p-4 min-h-[200px] text-sm font-sans" placeholder="Write plain text here, or use <p>, <span>, and <a> tags for advanced formatting..." />
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-[#2c2e33]">
                <label className="text-xs text-[#1cebce] uppercase tracking-widest">Attach Images (Generates G++ Render Commands)</label>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-mono file:bg-[#1cebce] file:text-black hover:file:opacity-90 cursor-pointer mb-2" />
                
                {formData.images.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-[#1a1b1e] p-2 rounded border border-[#2c2e33]">
                        <img src={img.data} alt="Upload preview" className="w-12 h-12 object-cover rounded border border-[#2c2e33]" />
                        <div className="flex flex-col flex-grow">
                          <label className="text-[10px] text-gray-500">Render Name</label>
                          <input type="text" value={img.title} onChange={e => handleImageTitleChange(idx, e.target.value)} className="bg-transparent border-b border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-1 text-sm" placeholder="e.g. keven_image" />
                        </div>
                        <button type="button" onClick={() => handleRemoveImage(idx)} className="text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 rounded transition-colors text-xs border border-red-500">
                          REMOVE
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className="mt-6 border border-[#1cebce] rounded-xl text-[#1cebce] hover:bg-[#1cebce] hover:text-black transition-colors py-3 font-bold tracking-widest text-sm uppercase">
                {editingId ? 'Push Update to Database' : 'Push to Production'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}