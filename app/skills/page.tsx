'use client';

import React, { useState, useEffect, MouseEvent, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const initialSkillsData = [
  // Physical Chips
  { id: "U1", type: "chip", name: "U1_EMBEDDED" },
  { id: "U2", type: "chip", name: "U2_SOFTWARE" },
  { id: "U3", type: "chip", name: "U3_SYSTEMS" },
  
  // Logical Pins
  { id: "esp32", type: "pin", name: "ESP32_MCU", net: "XTAL_IN", symbol: "crystal", title: "ESP32 Microcontrollers", desc: "Engineered functional desktop peripheral control hubs utilizing ESP32 chips, focusing on active Bluetooth pairing and serial monitor optimizations." },
  { id: "stm32", type: "pin", name: "STM32_ARCH", net: "GPIO_14", symbol: "capacitor", title: "STM32 Architecture", desc: "Configured and assembled hardware systems leveraging the STM32 processor architecture for high-performance embedded operations." },
  { id: "cpp", type: "pin", name: "C++_FIRMWARE", net: "TXD_0", symbol: "resistor", title: "C++ Firmware Development", desc: "My primary programming language. Used extensively to write custom state-machine logic and manage complex data structures mirroring stack and heap allocations in hardware." },
  { id: "rotary", type: "pin", name: "ROTARY_ENCODERS", net: "PWM_OUT", symbol: "switch", title: "Rotary Encoders", desc: "Integrated mechanical rotary encoders into digital circuits to serve as primary physical control vectors for peripheral devices." },
  { id: "i2c", type: "pin", name: "I2C_UART_SPI", net: "SDA_0", symbol: "none", title: "Hardware Communication", desc: "Established and optimized communication lines across serial monitors utilizing standard I2C, UART, and SPI protocols." },
  { id: "python", type: "pin", name: "PYTHON_3", net: "RXD_1", symbol: "none", title: "Python Scripting", desc: "Leveraged for high-level scripting, rapid prototyping, and integrating logic alongside microprocessor architectures." },
  { id: "ros2", type: "pin", name: "ROS2_CORE", net: "CAN_H", symbol: "resistor", title: "ROS2 Navigation", desc: "Executed robotics operating software to program and navigate scaled autonomous vehicles for the Autonomous Racing Car Club." },
  { id: "linux", type: "pin", name: "LINUX_KERNEL", net: "CAN_L", symbol: "switch", title: "Linux Environments", desc: "Proficient in navigating and configuring full Linux environments necessary for heavy development tools and networking." },
  { id: "ml", type: "pin", name: "MACHINE_LEARNING", net: "SPI_MOSI", symbol: "none", title: "Machine Learning", desc: "Studied basic machine learning fundamentals to process sensor data and execute real-time autonomous vehicle control decisions." },
  { id: "bash", type: "pin", name: "BASH_SCRIPTING", net: "SPI_CLK", symbol: "capacitor", title: "Bash Scripting", desc: "Utilized command-line automation and scripts to initialize development environments and manage system processes." },
  { id: "sys", type: "pin", name: "SYS_ASSEMBLY", net: "V_BATT", symbol: "switch", title: "Systems Assembly", desc: "Procured and assembled heavy-duty programming workstations specifically optimized to prevent component bottlenecks." },
  { id: "therm", type: "pin", name: "THERMAL_MGMT", net: "TEMP_SENS", symbol: "resistor", title: "Thermal Management", desc: "Configured hardware and airflow strategies to sustain optimal temperatures under heavy processing loads." },
  { id: "frame", type: "pin", name: "FRAME_OPTIMIZATION", net: "PCIE_TX", symbol: "none", title: "Frame-Rate Optimization", desc: "Tuned BIOS settings, operating systems, and graphics drivers to maximize sustained frame rates in competitive tactical environments." },
  { id: "sec", type: "pin", name: "NETWORK_SEC", net: "ETH_TX", symbol: "crystal", title: "Network Security", desc: "Applied advanced defensive technical strategies and strict problem-solving protocols to secure a first-place finish in a campus cybersecurity competition." }
];

const Resistor = () => (
  <svg width="36" height="18" viewBox="0 0 24 12" className="stroke-current fill-none stroke-2 shrink-0">
    <polyline points="0,6 3,6 5,2 9,10 13,2 17,10 19,6 24,6" />
  </svg>
);

const Crystal = () => (
  <svg width="36" height="24" viewBox="0 0 24 16" className="stroke-current fill-none stroke-2 shrink-0">
    <line x1="0" y1="8" x2="6" y2="8" />
    <line x1="6" y1="2" x2="6" y2="14" />
    <rect x="9" y="3" width="6" height="10" />
    <line x1="18" y1="2" x2="18" y2="14" />
    <line x1="18" y1="8" x2="24" y2="8" />
  </svg>
);

const Capacitor = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" className="stroke-current fill-none stroke-2 shrink-0">
    <line x1="0" y1="8" x2="6" y2="8" />
    <line x1="6" y1="2" x2="6" y2="14" />
    <line x1="10" y1="2" x2="10" y2="14" />
    <line x1="10" y1="8" x2="16" y2="8" />
  </svg>
);

const Switch = () => (
  <svg width="36" height="18" viewBox="0 0 24 12" className="stroke-current fill-none stroke-2 shrink-0">
    <line x1="0" y1="6" x2="6" y2="6" />
    <line x1="6" y1="6" x2="16" y2="2" />
    <circle cx="18" cy="6" r="1.5" />
    <line x1="20" y1="6" x2="24" y2="6" />
  </svg>
);

const icChipsLayout = [
  {
    id: "U1",
    offsetClass: "md:-translate-x-[15%]",
    traceOut: (
      <div className="group/trace w-full h-32 relative hidden md:block">
        <svg className="absolute inset-0 w-full h-full stroke-[#2c2e33] fill-none stroke-2 transition-colors" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 35 0 L 35 20 L 80 20 L 80 80 L 65 80 L 65 100" vectorEffect="non-scaling-stroke" className="group-hover/trace:stroke-[#fbbf24]" />
        </svg>
        <div className="absolute top-[20%] left-[80%] w-2.5 h-2.5 rounded-full bg-[#0c0c0e] border-2 border-[#2c2e33] group-hover/trace:border-[#fbbf24] transition-colors transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-[80%] left-[65%] w-2.5 h-2.5 rounded-full bg-[#0c0c0e] border-2 border-[#2c2e33] group-hover/trace:border-[#fbbf24] transition-colors transform -translate-x-1/2 -translate-y-1/2"></div>
        <span className="absolute top-[10%] left-[82%] text-xs font-mono text-gray-600 group-hover/trace:text-[#fbbf24] transition-colors">JMP_A1</span>
      </div>
    ),
    leftPinIds: ["esp32", "stm32"],
    rightPinIds: ["cpp", "rotary", "i2c"]
  },
  {
    id: "U2",
    offsetClass: "md:translate-x-[15%]",
    traceOut: (
      <div className="group/trace w-full h-40 relative hidden md:block">
        <svg className="absolute inset-0 w-full h-full stroke-[#2c2e33] fill-none stroke-2 transition-colors" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 65 0 L 65 30 L 20 30 L 20 70 L 45 70 L 45 100" vectorEffect="non-scaling-stroke" className="group-hover/trace:stroke-[#fbbf24]" />
        </svg>
        <div className="absolute top-[30%] left-[20%] w-2.5 h-2.5 rounded-full bg-[#0c0c0e] border-2 border-[#2c2e33] group-hover/trace:border-[#fbbf24] transition-colors transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-[70%] left-[45%] w-2.5 h-2.5 rounded-full bg-[#0c0c0e] border-2 border-[#2c2e33] group-hover/trace:border-[#fbbf24] transition-colors transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    ),
    leftPinIds: ["python", "ros2", "linux"],
    rightPinIds: ["ml", "bash"]
  },
  {
    id: "U3",
    offsetClass: "md:-translate-x-[5%]",
    traceOut: (
      <div className="group/trace flex w-full h-20 relative hidden md:block">
        <svg className="absolute inset-0 w-full h-full stroke-[#2c2e33] fill-none stroke-2" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 45 0 L 45 50 L 50 50 L 50 100" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    ),
    leftPinIds: ["sys", "therm"],
    rightPinIds: ["frame", "sec"]
  }
];

export default function SkillsSchematic() {
  const { isAdmin } = useAuth();
  
  const [skillsList, setSkillsList] = useState<any[]>(initialSkillsData);
  const [typedText, setTypedText] = useState('');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [lockedSkill, setLockedSkill] = useState<string | null>(null);
  const fullText = 'Keven Espinal Hazim';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditorExpanded, setIsEditorExpanded] = useState(false);
  const detailsRef = useRef<HTMLTextAreaElement>(null);
  
  const [formData, setFormData] = useState({
    customId: '',
    type: 'pin',
    name: '',
    net: '',
    title: '',
    desc: ''
  });

  const fetchLiveSkills = async () => {
    try {
      const res = await fetch('/api/skills', { cache: 'no-store' });
      const data = await res.json();
      if (data && Array.isArray(data)) {
        const dbIds = data.map((item: any) => item.id);
        const notInDb = initialSkillsData.filter(skill => !dbIds.includes(skill.id));
        setSkillsList([...notInDb, ...data]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchLiveSkills();
  }, []);

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

  const handlePinClick = (id: string) => {
    if (lockedSkill === id) {
      setLockedSkill(null);
    } else {
      setLockedSkill(id);
    }
  };

  const handlePinEnter = (id: string) => {
    setHoveredSkill(id);
  };

  const handlePinLeave = () => {
    setHoveredSkill(null);
  };

  const handleMigrateData = async () => {
    const dbIds = skillsList.filter(f => f._id).map(f => f.id);
    for (const skill of initialSkillsData) {
      if (!dbIds.includes(skill.id)) {
        const { ...rest } = skill; 
        await fetch('/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rest),
        });
      }
    }
    fetchLiveSkills();
  };

  const handleEditPin = (skill: any) => {
    setFormData({
      customId: skill.id,
      type: 'pin',
      name: skill.name || '',
      net: skill.net || '',
      title: skill.title || '',
      desc: skill.desc || ''
    });
    setEditingId(skill._id || null);
    setIsEditorExpanded(false);
    setIsModalOpen(true);
  };

  const handleEditChip = (chip: any) => {
    setFormData({
      customId: chip.id,
      type: 'chip',
      name: chip.name || '',
      net: '',
      title: '',
      desc: ''
    });
    setEditingId(chip._id || null);
    setIsModalOpen(true);
  };

  const insertFormatting = (before: string, after: string) => {
    const el = detailsRef.current;
    if (!el) return;
    
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = formData.desc;
    
    const newText = text.substring(0, start) + before + text.substring(start, end) + after + text.substring(end);
    setFormData({ ...formData, desc: newText });
    
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        id: formData.customId,
        type: formData.type,
        name: formData.name,
        ...(formData.type === 'pin' && {
          net: formData.net,
          title: formData.title,
          desc: formData.desc
        })
      };

      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { _id: editingId, ...payload } : payload;

      const res = await fetch('/api/skills', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        alert("Failed to save entry.");
        return;
      }
      setIsModalOpen(false);
      setEditingId(null);
      fetchLiveSkills();
    } catch (error) {
      alert("Network Error");
    }
  };

  const activeSkillId = lockedSkill || hoveredSkill;
  const activePinData = skillsList.find(pin => pin.id === activeSkillId && pin.type === 'pin') || null;

  return (
    <div className="min-h-screen h-fit w-full m-0 p-0 relative bg-[#0c0c0e] text-[#d1d0c5] font-sans overflow-x-clip selection:bg-[#fbbf24] selection:text-black">
      <style jsx global>{`
        .bg-grid {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
        .text-accent { color: #1cebce; }
        .glass {
          background: rgba(12, 12, 14, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.5rem;
          backdrop-filter: blur(16px);
        }
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
        html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar { display: none; }
        html, body, * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="fixed inset-0 bg-grid z-0 pointer-events-none"></div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0e]/80 backdrop-blur-md border-b border-[#2c2e33]">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-mono text-xl md:text-2xl font-bold text-accent flex items-center">
            [<span>{typedText}</span><span className="animate-pulse">_</span>]
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-sm font-medium nav-link">home</Link>
            <Link href="/work" className="text-sm font-medium nav-link">work</Link>
            <Link href="/skills" className="text-sm font-medium nav-link text-accent">skills</Link>
            <Link href="/about" className="text-sm font-medium nav-link">about</Link>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-40 pb-24 relative z-10" onMouseMove={handleMouseMove}>
        <div className="flex items-end justify-between mb-16 border-b border-[#2c2e33] pb-6 bg-[#0c0c0e]/60 backdrop-blur-sm">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#f8fafc] tracking-tight">Technical Stack</h1>
              <p className="text-gray-400 mt-4 text-lg">Hardware and software capabilities mapped via schematic topology</p>
            </div>
            {isAdmin && (
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleMigrateData}
                  className="px-4 py-2 rounded border border-gray-500 text-gray-500 flex items-center justify-center hover:border-white hover:text-white transition-colors font-mono text-xs tracking-widest uppercase"
                >
                  Migrate Data
                </button>
              </div>
            )}
          </div>
          <div className="font-mono text-accent hidden md:block">02 // SKILLS</div>
        </div>

        <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto mt-8 relative">
          
          <div className="w-full lg:w-[60%] flex flex-col items-center">
            
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-t-[3px] border-l-[3px] border-[#1cebce] transform rotate-45 mb-2"></div>
              <div className="font-mono text-[#1cebce] text-base font-bold">VCC_5V</div>
            </div>
            
            <div className="flex w-full h-20 relative hidden md:block">
              <svg className="absolute inset-0 w-full h-full stroke-[#2c2e33] fill-none stroke-2" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M 50 0 L 50 50 L 35 50 L 35 100" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="absolute top-[50%] left-[35%] w-2 h-2 rounded-full bg-[#2c2e33] transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="md:hidden w-[2px] h-16 bg-[#2c2e33] mx-auto"></div>

            {icChipsLayout.map((chip, chipIndex) => {
              const chipData = skillsList.find(s => s.id === chip.id) || initialSkillsData.find(s => s.id === chip.id);
              const chipName = chipData?.name || chip.id;

              return (
                <React.Fragment key={chip.id}>
                  
                  <div className={`flex flex-col md:flex-row relative justify-center items-stretch w-full my-4 ${chip.offsetClass}`}>
                    
                    <div className="flex flex-row md:flex-col justify-around items-end w-full md:w-[35%] pr-0 md:pr-1 gap-6 md:gap-10 mb-8 md:mb-0 order-2 md:order-1 flex-wrap md:flex-nowrap">
                      {chip.leftPinIds.map((pinId) => {
                        const pin = skillsList.find(p => p.id === pinId) || initialSkillsData.find(p => p.id === pinId);
                        if (!pin) return null;
                        const isActive = activeSkillId === pin.id;
                        return (
                          <div 
                            key={pin.id} 
                            className="flex items-center w-auto md:w-full justify-end cursor-pointer px-2 md:px-0 group"
                            onClick={() => handlePinClick(pin.id)}
                            onMouseEnter={() => handlePinEnter(pin.id)}
                            onMouseLeave={handlePinLeave}
                          >
                            <span className={`font-mono transition-colors text-sm md:text-base tracking-tight ${isActive ? 'text-[#fbbf24] font-bold' : 'text-gray-500 group-hover:text-gray-300'}`}>{pin.name}</span>
                            <span className={`font-mono text-xs md:text-sm mx-3 transition-colors ${isActive ? 'text-[#fbbf24]' : 'text-[#1cebce] group-hover:text-[#1cebce]/80'}`}>{pin.net}</span>
                            <div className={`hidden md:flex items-center w-16 lg:w-32 transition-colors justify-end ${isActive ? 'text-[#fbbf24]' : 'text-[#2c2e33] group-hover:text-gray-500'}`}>
                              <div className="h-[2px] flex-grow bg-current"></div>
                              {pin.symbol === 'resistor' && <Resistor />}
                              {pin.symbol === 'crystal' && <Crystal />}
                              {pin.symbol === 'capacitor' && <Capacitor />}
                              {pin.symbol === 'switch' && <Switch />}
                              <div className="h-[2px] w-4 bg-current"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className={`w-full md:w-56 lg:w-72 bg-[#0a0a0c] border-2 rounded-sm relative flex flex-col items-center justify-center py-10 md:py-20 shadow-[0_0_20px_rgba(0,0,0,0.8)] z-10 order-1 md:order-2 mb-8 md:mb-0 transition-colors ${activePinData && chip.leftPinIds.concat(chip.rightPinIds).includes(activePinData.id) ? 'border-[#fbbf24]' : 'border-[#2c2e33]'}`}>
                      <div className="hidden md:block absolute -top-6 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[#2c2e33]">
                        <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 text-[#2c2e33] rotate-90 scale-100">
                          <Capacitor />
                        </div>
                      </div>

                      <div className={`hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 border-b-2 rounded-b-full bg-[#0c0c0e] transition-colors ${activePinData && chip.leftPinIds.concat(chip.rightPinIds).includes(activePinData.id) ? 'border-[#fbbf24]' : 'border-[#2c2e33]'}`}></div>
                      
                      <div className="text-gray-600 font-mono text-sm absolute top-3 left-3">{chip.id}</div>
                      
                      {isAdmin && (
                        <button 
                          onClick={() => handleEditChip(chipData)}
                          className="absolute top-3 right-3 text-[10px] text-[#eab308] border border-[#eab308] px-2 py-0.5 rounded hover:bg-[#eab308] hover:text-white transition-colors"
                        >
                          EDIT
                        </button>
                      )}

                      <div className="text-[#f8fafc] font-mono text-xl md:text-2xl font-bold tracking-widest text-center px-4">{chipName}</div>
                      
                      <div className={`hidden md:block absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full transition-colors ${activePinData && chip.leftPinIds.concat(chip.rightPinIds).includes(activePinData.id) ? 'bg-[#fbbf24]' : 'bg-[#2c2e33]'}`}></div>
                      <div className="hidden md:block absolute -bottom-6 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[#2c2e33]"></div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-around items-start w-full md:w-[35%] pl-0 md:pl-1 gap-6 md:gap-10 order-3 flex-wrap md:flex-nowrap mt-2 md:mt-0">
                      {chip.rightPinIds.map((pinId) => {
                        const pin = skillsList.find(p => p.id === pinId) || initialSkillsData.find(p => p.id === pinId);
                        if (!pin) return null;
                        const isActive = activeSkillId === pin.id;
                        return (
                          <div 
                            key={pin.id} 
                            className="flex items-center w-auto md:w-full justify-start cursor-pointer px-2 md:px-0 group"
                            onClick={() => handlePinClick(pin.id)}
                            onMouseEnter={() => handlePinEnter(pin.id)}
                            onMouseLeave={handlePinLeave}
                          >
                            <div className={`hidden md:flex items-center w-16 lg:w-32 transition-colors justify-start ${isActive ? 'text-[#fbbf24]' : 'text-[#2c2e33] group-hover:text-gray-500'}`}>
                              <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                              <div className="h-[2px] w-4 bg-current"></div>
                              {pin.symbol === 'resistor' && <Resistor />}
                              {pin.symbol === 'crystal' && <Crystal />}
                              {pin.symbol === 'capacitor' && <Capacitor />}
                              {pin.symbol === 'switch' && <Switch />}
                              <div className="h-[2px] flex-grow bg-current"></div>
                            </div>
                            <span className={`font-mono text-xs md:text-sm mx-3 transition-colors ${isActive ? 'text-[#fbbf24]' : 'text-[#1cebce] group-hover:text-[#1cebce]/80'}`}>{pin.net}</span>
                            <span className={`font-mono transition-colors text-sm md:text-base tracking-tight ${isActive ? 'text-[#fbbf24] font-bold' : 'text-gray-500 group-hover:text-gray-300'}`}>{pin.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {chip.traceOut}
                  
                  {chipIndex < icChipsLayout.length - 1 && (
                    <div className="md:hidden w-[2px] h-16 bg-[#2c2e33] mx-auto"></div>
                  )}
                </React.Fragment>
              );
            })}
            
            <div className="flex flex-col items-center">
              <div className="md:hidden w-[2px] h-16 bg-[#2c2e33]"></div>
              <div className="w-12 h-[2px] bg-[#1cebce] mb-2 md:mt-0"></div>
              <div className="w-8 h-[2px] bg-[#1cebce] mb-2"></div>
              <div className="w-3 h-[2px] bg-[#1cebce]"></div>
              <div className="font-mono text-[#1cebce] text-base font-bold mt-3">GND</div>
            </div>

          </div>

          <div className="w-full lg:w-[40%] mt-12 lg:mt-0 relative lg:left-16 xl:left-34">
            <div className={`lg:sticky lg:top-32 w-full glass p-10 lg:p-12 shadow-2xl transition-all duration-300 z-50 border-t-4 ${lockedSkill ? 'border-t-[#fbbf24]' : 'border-t-[#1cebce]'} ${activePinData ? 'opacity-100 translate-x-0' : 'opacity-0 lg:translate-x-12 pointer-events-none'}`}>
              <div className="flex justify-between items-center mb-8 border-b border-[#2c2e33] pb-6">
                <h3 className="text-3xl lg:text-4xl font-bold text-[#f8fafc] tracking-tight">{activePinData?.title}</h3>
                
                {isAdmin && activePinData && (
                  <button 
                    onClick={() => handleEditPin(activePinData)}
                    className="text-xs text-[#eab308] border border-[#eab308] px-3 py-1 rounded hover:bg-[#eab308] hover:text-white transition-colors ml-4 shrink-0"
                  >
                    EDIT
                  </button>
                )}
              </div>
              <div className="mb-8">
                <span className={`text-base font-mono uppercase tracking-widest px-4 py-2 rounded bg-[#1a1b1e] border ${lockedSkill ? 'text-[#fbbf24] border-[#fbbf24]/30' : 'text-[#1cebce] border-[#1cebce]/30'}`}>
                  {lockedSkill ? '[ STATUS: LATCHED ]' : '[ STATUS: PROBING ]'}
                </span>
              </div>
              
              <div 
                className="text-gray-300 leading-relaxed text-lg lg:text-xl mt-8 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: activePinData?.desc || '' }}
              />
            </div>
          </div>

        </div>
      </div>

      {isModalOpen && isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0c0c0e]/80 backdrop-blur-md cursor-pointer" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-2xl bg-[#0a0a0c] border border-[#2c2e33] rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] z-10 text-[#d1d0c5] font-mono max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1cebce] to-transparent opacity-50"></div>
            
            <div className="flex justify-between items-center mb-6 border-b border-[#2c2e33] pb-4">
              <p className="text-[#1cebce] font-bold text-lg">{editingId ? (formData.type === 'chip' ? 'Edit Chip Layout' : 'Edit Skill Properties') : 'Add New Object'}</p>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-[#f8fafc] text-sm">[ ESC ]</button>
            </div>

            <form onSubmit={handleSaveSkill} className="flex flex-col gap-4 relative">
              
              {formData.type === 'pin' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500 mb-1">SKILL_NAME (Short)</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" placeholder="e.g. C++_FIRMWARE" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500 mb-1">NET_LABEL (Tiny text)</label>
                      <input required type="text" value={formData.net} onChange={e => setFormData({...formData, net: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" placeholder="e.g. TXD_0" />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">FULL_TITLE</label>
                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" placeholder="e.g. C++ Firmware Development" />
                  </div>

                  <div className={`transition-all duration-300 ${isEditorExpanded ? 'fixed inset-4 md:inset-12 z-[200] bg-[#0a0a0c] border border-[#1cebce] rounded-2xl p-6 md:p-8 flex flex-col shadow-[0_0_100px_rgba(28,235,206,0.15)]' : 'flex flex-col relative'}`}>
                    
                    <div className="flex justify-between items-end mb-2">
                      <label className="text-xs text-gray-500">FULL_DESCRIPTION</label>
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
                      value={formData.desc} 
                      onChange={e => setFormData({...formData, desc: e.target.value})} 
                      className={`bg-transparent border border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] p-3 text-sm font-sans w-full ${isEditorExpanded ? 'flex-grow resize-none' : 'min-h-[160px]'}`} 
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">CHIP_NAME</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2" placeholder="e.g. U1_EMBEDDED" />
                </div>
              )}

              <button type="submit" className="mt-4 border border-[#1cebce] rounded-xl text-[#1cebce] hover:bg-[#1cebce] hover:text-black transition-colors py-3 font-bold tracking-widest text-sm uppercase">
                Push Update to Database
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}