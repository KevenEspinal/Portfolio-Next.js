import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#d1d0c5] font-sans overflow-x-hidden selection:bg-[#1cebce] selection:text-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0c0e]/80 backdrop-blur-md border-b border-[#2c2e33]">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-mono text-xl md:text-2xl font-bold text-[#1cebce] flex items-center">
            [<span>Keven Espinal Hazim</span><span className="animate-pulse">_</span>]
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-sm font-medium hover:text-[#1cebce] transition-colors">home</Link>
            <Link href="#work" className="text-sm font-medium hover:text-[#1cebce] transition-colors">work</Link>
            <Link href="#skills" className="text-sm font-medium hover:text-[#1cebce] transition-colors">skills</Link>
            <Link href="#about" className="text-sm font-medium hover:text-[#1cebce] transition-colors">about</Link>
          </div>
        </div>
      </nav>

      <main className="w-full flex flex-col items-center pt-40 pb-24 px-8 relative z-10">
        <section className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="w-full md:w-3/5">
            <div className="mb-4">
              <span className="font-mono text-[#1cebce] text-lg font-medium">&gt;&gt; status: online</span>
            </div>
            <h1 className="font-bold text-6xl md:text-8xl mb-8 tracking-tighter text-[#f8fafc]">
              Keven Espinal Hazim.
            </h1>
            <div className="space-y-3 mb-10 border-l-4 border-[#1cebce] pl-6">
              <div className="text-2xl md:text-3xl font-light text-gray-400">Electrical Engineering</div>
              <div className="text-2xl md:text-3xl font-light text-gray-400">Embedded Systems</div>
              <div className="text-2xl md:text-3xl font-light text-gray-400">Computer Science</div>
            </div>
            <div className="flex gap-6 mt-8">
              <Link href="/resume.pdf" className="px-8 py-3 border border-[#1cebce] text-[#1cebce] hover:bg-[#1cebce]/10 font-semibold rounded font-mono text-sm transition-all hover:-translate-y-1">
                /resume
              </Link>
              <Link href="https://github.com/KevenEspinal" className="px-8 py-3 border border-[#404245] text-gray-300 hover:border-[#1cebce] hover:text-[#1cebce] font-semibold rounded font-mono text-sm transition-all hover:-translate-y-1">
                /github
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex w-2/5 justify-end mt-12 md:mt-0">
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              <div className="bg-[#1e1e22]/40 backdrop-blur-md border border-white/10 rounded-xl p-6 text-left transition-all hover:-translate-y-1 hover:border-[#1cebce]/40">
                <div className="text-3xl font-bold text-[#1cebce] mb-1">C++</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Primary</div>
              </div>
              <div className="bg-[#1e1e22]/40 backdrop-blur-md border border-white/10 rounded-xl p-6 text-left transition-all hover:-translate-y-1 hover:border-[#1cebce]/40">
                <div className="text-3xl font-bold text-[#1cebce] mb-1">URI</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Institution</div>
              </div>
              <div className="bg-[#1e1e22]/40 backdrop-blur-md border border-white/10 rounded-xl p-6 text-left col-span-2 transition-all hover:-translate-y-1 hover:border-[#1cebce]/40">
                <div className="text-3xl font-bold text-[#1cebce] mb-1">2</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Academic Majors</div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="max-w-7xl w-full mt-32">
          <div className="flex items-end justify-between mb-12 border-b border-[#2c2e33] pb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-[#f8fafc] tracking-tight">Latest Projects</h2>
            <div className="font-mono text-[#1cebce]">01 //</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1e1e22]/40 backdrop-blur-md border border-white/10 rounded-xl p-8 transition-all hover:-translate-y-1 hover:border-[#1cebce]/40 flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="font-mono text-[#1cebce] text-sm mb-4">&lt; hardware &gt;</div>
                <h3 className="text-3xl font-bold text-[#f8fafc] mb-4">The Do-All-Inator</h3>
                <p className="text-gray-400">A custom functional desktop peripheral control hub engineered using an ESP32 microcontroller. Built entirely with custom state-machine logic, active Bluetooth pairing, and optimized serial monitor communication.</p>
              </div>
              <div className="mt-8 flex gap-3">
                <span className="text-xs px-3 py-1 bg-[#1a1b1e] rounded text-gray-300 border border-[#404245]">ESP32</span>
                <span className="text-xs px-3 py-1 bg-[#1a1b1e] rounded text-gray-300 border border-[#404245]">C++</span>
              </div>
            </div>

            <div className="bg-[#1e1e22]/40 backdrop-blur-md border border-white/10 rounded-xl p-8 transition-all hover:-translate-y-1 hover:border-[#1cebce]/40 flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="font-mono text-[#1cebce] text-sm mb-4">&lt; software &gt;</div>
                <h3 className="text-3xl font-bold text-[#f8fafc] mb-4">Autonomous Racing</h3>
                <p className="text-gray-400">Execution of robotics operating software (ROS2) alongside basic machine learning fundamentals for autonomous vehicle control.</p>
              </div>
              <div className="mt-8 flex gap-3">
                <span className="text-xs px-3 py-1 bg-[#1a1b1e] rounded text-gray-300 border border-[#404245]">ROS2</span>
                <span className="text-xs px-3 py-1 bg-[#1a1b1e] rounded text-gray-300 border border-[#404245]">Linux</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}