'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  openLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  
  const router = useRouter();

  const login = () => {
    setIsAdmin(true);
    setIsModalOpen(false);
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const openLoginModal = () => {
    setIsAdmin(false);
    setIsModalOpen(true);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'keven' && password === 'admin123') {
      setError(false);
      login();
      setUsername('');
      setPassword('');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, openLoginModal }}>
      {children}

      {isModalOpen && !isAdmin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          <div 
            className="absolute inset-0 bg-[#0c0c0e]/80 backdrop-blur-md cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-lg bg-[#0a0a0c] border border-[#2c2e33] rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.9)] z-10 text-[#d1d0c5] font-mono">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1cebce] to-transparent opacity-50"></div>
            
            <div className="flex justify-between items-center mb-8 border-b border-[#2c2e33] pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ef4444] cursor-pointer hover:opacity-80" onClick={() => setIsModalOpen(false)}></div>
                <div className="w-3 h-3 rounded-full bg-[#eab308]"></div>
                <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-[#f8fafc] transition-colors text-sm">
                [ ESC ]
              </button>
            </div>
            
            <div className="mb-8">
              <p className="text-[#1cebce] mb-2 font-bold text-lg">KevenOS Authentication</p>
              <p className="text-gray-500 text-sm mb-4">root@kevenespinal.com:~# ./authenticate.sh</p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col relative group">
                <label className="text-xs text-gray-500 mb-1 tracking-widest">USER_ID</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2 transition-colors" 
                  autoFocus 
                />
              </div>
              <div className="flex flex-col relative group">
                <label className="text-xs text-gray-500 mb-1 tracking-widest">PASS_KEY</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="bg-transparent border-b-2 border-[#2c2e33] focus:border-[#1cebce] outline-none text-[#f8fafc] py-2 transition-colors" 
                />
              </div>
              
              <div className="h-6">
                {error && <p className="text-[#ef4444] text-xs animate-pulse tracking-wide">FATAL: Authentication failed. Unauthorized access attempt logged.</p>}
              </div>
              
              <button type="submit" className="mt-2 border border-[#1cebce] rounded-xl text-[#1cebce] hover:bg-[#1cebce] hover:text-black transition-colors py-3 font-bold tracking-widest text-sm uppercase">
                Initiate Handshake
              </button>
            </form>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}