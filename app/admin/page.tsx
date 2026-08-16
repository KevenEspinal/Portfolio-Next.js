'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute() {
  const { openLoginModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 1. Tell the global context to open the floating modal
    openLoginModal();
    // 2. Instantly route back to the home page so the modal overlays it
    router.push('/');
  }, [openLoginModal, router]);

  // This component renders nothing because the redirect happens instantly
  return null; 
}