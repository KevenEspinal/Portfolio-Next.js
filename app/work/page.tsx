'use client';

import React, { useState, useEffect, MouseEvent, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const initialProjectsData = [
  {
    id: "do-all-inator",
    title: "The Do-All-Inator",
    synopsis: "A custom functional desktop peripheral control hub engineered using an ESP32 microcontroller.",
    details: "This project involved building a custom desktop peripheral from scratch. It utilizes an ESP32 microcontroller to handle inputs from rotary encoders and push buttons. The core firmware is written entirely in C++ using custom state-machine logic to manage different modes of operation. It features active Bluetooth pairing for wireless control and optimized serial monitor communication for debugging and interfacing with PC software.",
    software: ["C++", "PlatformIO", "ESP32 Firmware"],
    skills: ["Embedded Systems", "Hardware Assembly", "State-Machine Logic", "Bluetooth Communication"],
    repo: "https://github.com/KevenEspinal",
    images: []
  },
  {
    id: "autonomous-racing",
    title: "Autonomous Racing",
    synopsis: "Execution of robotics operating software (ROS2) alongside basic machine learning fundamentals for autonomous vehicle control.",
    details: "As part of the Autonomous Racing Car Club, this project focused on implementing autonomous driving capabilities for scaled vehicles. It required setting up a full Linux environment to run ROS2. The vehicle's navigation stack was configured using machine learning algorithms to process sensor data, map environments, and execute real-time vehicle control decisions autonomously.",
    software: ["ROS2", "Linux", "Python"],
    skills: ["Machine Learning", "Robotics Navigation", "Sensor Processing", "Systems Integration"],
    repo: "https://github.com/KevenEspinal",
    images: []
  },
  {
    id: "custom-workstation",
    title: "Custom Workstation",
    synopsis: "Procured and assembled a heavy-duty programming and processing workstation, specifically configured to maximize frame-rate performance.",
    details: "This project encompassed the full lifecycle of building a high-performance desktop computer. It involved extensive research into component compatibility, bottleneck prevention, and thermal management. The final build was specifically optimized for heavy programming environments and achieving maximum sustained frame rates in competitive tactical games. The system utilizes an integrated NVIDIA graphics processing unit procured and configured for optimal output.",
    software: ["Windows OS", "BIOS Firmware", "Driver Optimization Utilities"],
    skills: ["Hardware Procurement", "Systems Assembly", "Performance Tuning", "Thermal Management"],
    repo: "https://github.com/KevenEspinal",
    images: []
  },
  {
    id: "defense-protocol",
    title: "Defense Protocol",
    synopsis: "First-place finish utilizing advanced defensive technical strategies to execute strict security problem-solving protocols.",
    details: "This initiative was developed during a competitive campus cybersecurity event. It required analyzing network vulnerabilities, implementing strict firewall rules, and executing defensive protocols against simulated active threats. The strategies utilized ensured system integrity and secured a first-place finish by demonstrating rapid incident response and robust network hardening techniques.",
    software: ["Linux", "Nmap", "Wireshark", "Bash Scripting"],
    skills: ["Network Security", "Vulnerability Analysis", "Incident Response", "Threat Mitigation"],
    repo: "https://github.com/KevenEspinal",
    images: []
  }
];

export default function Work() {
  const { isAdmin } = useAuth();
  const [openProject, setOpenProject] = useState<string | null>(null);
  
  const [projectsList, setProjectsList] = useState<any[]>(initialProjectsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [isEditorExpanded, setIsEditorExpanded] = useState(false);
  const detailsRef = useRef<HTMLTextAreaElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    synopsis: '',
    details: '',
    softwareStr: '',
    skillsStr: '',
    repo: '',
    images: [] as string[],
    files: [] as { title: string, data: string, filename: string }[]
  });

  const fetchLiveWork = async () => {
    try {
      const res = await fetch('/api/work', { cache: 'no-store' });
      const data = await res.json();
      if (data && Array.isArray(data) && data.length > 0) {
        setProjectsList(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLiveWork();
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const toggleProject = (id: string) => {
    setOpenProject(openProject === id ? null : id);
  };

  const handleMigrateData = async () => {
    for (const proj of initialProjectsData) {
      await fetch('/api/work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proj),
      });
    }
    fetchLiveWork();
  };

  const handleAddClick = () => {
    setFormData({ title: '', synopsis: '', details: '', softwareStr: '', skillsStr: '', repo: '', images: [], files: [] });
    setEditingId(null);
    setIsEditorExpanded(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (project: any) => {
    setFormData({
      title: project.title,
      synopsis: project.synopsis,
      details: project.details,
      softwareStr: project.software ? project.software.join(', ') : '',
      skillsStr: project.skills ? project.skills.join(', ') : '',
      repo: project.repo || '',
      images: project.images || [],
      files: project.files || []
    });
    setEditingId(project._id);
    setIsEditorExpanded(false);
    setIsModalOpen(true);
  };

  const insertFormatting = (before: string, after: string) => {
    const el = detailsRef.current;
    if (!el) return;
    
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = formData.details;
    
    const newText = text.substring(0, start) + before + text.substring(start, end) + after + text.substring(end);
    setFormData({ ...formData, details: newText });
    
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, base64String]
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      const defaultTitle = file.name;
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({
          ...prev,
          files: [...(prev.files || []), { title: defaultTitle, data: base64String, filename: file.name }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleFileTitleChange = (index: number, newTitle: string) => {
    const newFiles = [...formData.files];
    newFiles[index].title = newTitle;
    setFormData({ ...formData, files: newFiles });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        synopsis: formData.synopsis,
        details: formData.details,
        software: formData.softwareStr.split(',').map(s => s.trim()).filter(Boolean),
        skills: formData.skillsStr.split(',').map(s => s.trim()).filter(Boolean),
        repo: formData.repo,
        images: formData.images,
        files: formData.files || []
      };

      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { _id: editingId, ...payload } : payload;

      const res = await fetch('/api/work', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        alert("Failed to save project.");
        return;
      }

      setIsModalOpen(false);
      setEditingId(null);
      fetchLiveWork();
    } catch (error) {
      alert("Network Error");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!id) return;
    await fetch(`/api/work?id=${id}`, { method: 'DELETE' });
    fetchLiveWork();
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
            <Link href="/work" className="text-sm font-medium nav-link text-accent">work</Link>
            <Link href="/skills" className="text-sm font-medium nav-link">skills</Link>
            <Link href="/about" className="text-sm font-medium nav-link">about</Link>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-7xl mx-auto px-8 pt-40 pb-24 relative z-10">
        <div className="flex items-end justify-between mb-16 border-b border-[#2c2e33] pb-6">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#f8fafc] tracking-tight">Project Archive</h1>
              <p className="text-gray-400 mt-4 text-lg">Detailed documentation of engineering and software developments</p>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleAddClick}
                  className="w-10 h-10 rounded-full border border-[#1cebce] text-[#1cebce] flex items-center justify-center hover:bg-[#1cebce] hover:text-black transition-colors font-mono text-xl"
                  title="Add New Project"
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
          <div className="font-mono text-accent hidden md:block">01 // WORK</div>
        </div>

        <div className="flex flex-col gap-12">
          {projectsList.map((project) => (
            <div key={project._id || project.id} onMouseMove={handleMouseMove} className="glass p-8 md:p-12 flex flex-col group relative">
              
              {isAdmin && project._id && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-20">
                  <button 
                    onClick={() => handleEditClick(project)}
                    className="text-xs text-[#eab308] border border-[#eab308] px-3 py-1 rounded hover:bg-[#eab308] hover:text-white transition-colors"
                  >
                    EDIT
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project._id)}
                    className="text-xs text-[#ef4444] border border-[#ef4444] px-3 py-1 rounded hover:bg-[#ef4444] hover:text-white transition-colors"
                  >
                    DEL
                  </button>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-8 items-start w-full">
                
                <div className="w-full md:w-1/2 flex flex-col">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#f8fafc] mb-4">{project.title}</h2>
                  <p className="text-gray-400 mb-8 text-lg leading-relaxed">{project.synopsis}</p>
                  
                  <button 
                    onClick={() => toggleProject(project._id || project.id)} 
                    className="text-accent font-mono text-3xl self-start hover:text-white transition-colors animate-pulse"
                    title={openProject === (project._id || project.id) ? "Collapse Details" : "Expand Details"}
                  >
                    &lt;/&gt;
                  </button>
                </div>

                <div className="w-full md:w-1/2 min-h-[320px] bg-[#151619] border border-[#2c2e33] rounded-xl flex flex-col items-center justify-center overflow-hidden shrink-0 shadow-inner p-4 gap-4">
                  {project.images && project.images.length > 0 ? (
                    <div className={`grid ${project.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-3 w-full h-full flex-grow`}>
                      {project.images.map((imgUrl: string, imgIdx: number) => (
                        <div key={imgIdx} className="relative w-full h-full min-h-[12rem] rounded-lg overflow-hidden border border-[#2c2e33] flex items-center justify-center bg-[#0c0c0e]">
                          <img src={imgUrl} alt={`Project Preview ${imgIdx}`} className="object-contain w-full h-full p-2" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-600 font-mono text-sm tracking-widest">[ IMAGE_RENDER_PENDING ]</span>
                  )}
                </div>

              </div>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out w-full ${openProject === (project._id || project.id) ? 'max-h-[3500px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="p-8 md:p-10 bg-[#1a1b1e] border border-[#2c2e33] rounded-lg text-white flex flex-col gap-6 shadow-xl">
                  
                  <div 
                    className="text-base leading-relaxed text-gray-300 whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: project.details }}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#2c2e33]">
                    <div>
                      <span className="text-accent font-mono text-sm block mb-2">Software & Tools:</span>
                      <p className="text-sm text-gray-400">{project.software ? project.software.join(", ") : ''}</p>
                    </div>
                    <div>
                      <span className="text-accent font-mono text-sm block mb-2">Applied Skills:</span>
                      <p className="text-sm text-gray-400">{project.skills ? project.skills.join(", ") : ''}</p>
                    </div>
                  </div>

                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noreferrer" className="text-accent font-mono text-sm hover:underline mt-4 inline-block">
                      &gt;&gt; Access Source Code Repository
                    </a>
                  )}

                  {project.files && project.files.length > 0 && (
                    <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[#2c2e33]/50">
                      <span className="text-accent font-mono text-sm block">Attached Files:</span>
                      <div className="flex flex-wrap gap-4">
                        {project.files.map((file: any, fIdx: number) => (
                          <a key={fIdx} href={file.data} download={file.filename} className="flex items-center gap-2 px-4 py-2 bg-[#0c0c0e] border border-[#2c2e33] rounded hover:border-[#1cebce] text-gray-300 hover:text-white transition-colors text-sm font-mono group">
                            <svg className="w-4 h-4 text-gray-500 group-hover:text-[#1cebce] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            {file.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {isModalOpen && isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0c0c0e]/80 backdrop-blur-md cursor-pointer" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-[#0a0a0c] border border-[#2c2e33] rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] z-10 text-[#d1d0c5] font-mono max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1cebce] to-transparent opacity-50"></div>
            
            <div className="flex justify-between items-center mb-6 border-b border-[#2c2e33] pb-4">
              <p className="text-[#1cebce] font-bold text-lg">{editingId ? 'Edit Project' : 'Add New Project'}</p>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-[#f8fafc] text-sm">[ ESC ]</button>
            </div>

            <form onSubmit={handleSaveProject} className="flex flex-col gap-4 relative">
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">PROJECT_TITLE</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">SYNOPSIS</label>
                <input required type="text" value={formData.synopsis} onChange={e => setFormData({...formData, synopsis: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" />
              </div>

              <div className={`transition-all duration-300 ${isEditorExpanded ? 'fixed inset-4 md:inset-12 z-[200] bg-[#0a0a0c] border border-[#1cebce] rounded-2xl p-6 md:p-8 flex flex-col shadow-[0_0_100px_rgba(28,235,206,0.15)]' : 'flex flex-col relative'}`}>
                
                <div className="flex justify-between items-end mb-2">
                  <label className="text-xs text-gray-500">FULL_DETAILS</label>
                  {isEditorExpanded && (
                    <button type="button" onClick={() => setIsEditorExpanded(false)} className="text-[#1cebce] hover:text-white text-xs font-bold tracking-widest">[ COLLAPSE EDITOR ]</button>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-2 p-1.5 bg-[#1a1b1e] border border-[#2c2e33] rounded overflow-x-auto no-scrollbar">
                  <button type="button" onClick={() => insertFormatting('<b>', '</b>')} className="px-3 py-1 bg-[#0c0c0e] rounded text-xs hover:text-[#1cebce] transition-colors border border-transparent hover:border-[#1cebce]">
                    <span className="font-bold">B</span>
                  </button>
                  <div className="w-px h-4 bg-[#2c2e33]"></div>
                  <button type="button" onClick={() => insertFormatting('<ul style="list-style-type: disc; padding-left: 1.5rem; margin: 0.5rem 0;">\n  <li>', '</li>\n</ul>')} className="px-3 py-1 bg-[#0c0c0e] rounded text-xs hover:text-[#1cebce] transition-colors border border-transparent hover:border-[#1cebce]">
                    • List
                  </button>
                  <div className="w-px h-4 bg-[#2c2e33]"></div>
                  <button type="button" onClick={() => insertFormatting('<span style="font-size: 1.25em; color: white;">', '</span>')} className="px-3 py-1 bg-[#0c0c0e] rounded text-xs hover:text-[#1cebce] transition-colors border border-transparent hover:border-[#1cebce]">
                    Size +
                  </button>
                  
                  {!isEditorExpanded && (
                    <button type="button" onClick={() => setIsEditorExpanded(true)} className="ml-auto px-3 py-1 bg-transparent border border-[#1cebce] text-[#1cebce] rounded text-xs hover:bg-[#1cebce] hover:text-black transition-colors font-bold tracking-widest">
                      EXPAND
                    </button>
                  )}
                </div>

                <textarea 
                  ref={detailsRef}
                  required 
                  value={formData.details} 
                  onChange={e => setFormData({...formData, details: e.target.value})} 
                  className={`bg-transparent border border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] p-3 text-sm font-sans w-full ${isEditorExpanded ? 'flex-grow resize-none' : 'min-h-[120px]'}`} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">SOFTWARE & TOOLS (Comma separated)</label>
                  <input type="text" value={formData.softwareStr} onChange={e => setFormData({...formData, softwareStr: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" placeholder="C++, PlatformIO" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">APPLIED SKILLS (Comma separated)</label>
                  <input type="text" value={formData.skillsStr} onChange={e => setFormData({...formData, skillsStr: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" placeholder="Embedded Systems" />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">REPOSITORY_URL</label>
                <input type="text" value={formData.repo} onChange={e => setFormData({...formData, repo: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" placeholder="https://github.com/..." />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <label className="text-xs text-[#1cebce] uppercase tracking-widest">Upload Multiple Images</label>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-mono file:bg-[#1cebce] file:text-black hover:file:opacity-90 cursor-pointer" />
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative h-20 rounded border border-[#2c2e33] overflow-hidden group">
                        <img src={img} alt="Upload preview" className="object-cover w-full h-full" />
                        <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute inset-0 bg-black/60 text-red-500 font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                          REMOVE
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-[#2c2e33]">
                <label className="text-xs text-[#1cebce] uppercase tracking-widest">Attach Supplementary Files</label>
                <input type="file" multiple onChange={handleFileUpload} className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-mono file:bg-[#1cebce] file:text-black hover:file:opacity-90 cursor-pointer" />
                
                {formData.files && formData.files.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2">
                    {formData.files.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-[#1a1b1e] p-2 rounded border border-[#2c2e33]">
                        <div className="flex flex-col flex-grow">
                          <label className="text-[10px] text-gray-500">File Display Name</label>
                          <input type="text" value={file.title} onChange={e => handleFileTitleChange(idx, e.target.value)} className="bg-transparent border-b border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-1 text-sm" placeholder="e.g. EGR106_Report.pdf" />
                        </div>
                        <button type="button" onClick={() => handleRemoveFile(idx)} className="text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 rounded transition-colors text-xs border border-red-500">
                          REMOVE
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className="mt-4 border border-[#1cebce] rounded-xl text-[#1cebce] hover:bg-[#1cebce] hover:text-black transition-colors py-3 font-bold tracking-widest text-sm uppercase">
                {editingId ? 'Push Update to Database' : 'Push to Production'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}