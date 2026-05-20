'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function RedirectOnRefresh() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if not already on homepage
    if (pathname !== '/') {
      router.push('/');
    }
  }, [pathname, router]);

  return null;
}
