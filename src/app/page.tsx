'use client';

import Terminal from '@/components/Terminal';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-300 to-amber-200 flex items-center justify-center p-4">
      <div className="h-[80vh] w-[80vw] px-2 h-full">
        <Terminal />
      </div>
    </div>
  );
}