'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function Home() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = anime.timeline({
      easing: 'easeOutExpo'
    });

    timeline
      .add({
        targets: terminalRef.current,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1000
      })
      .add({
        targets: '.command-line',
        opacity: [0, 1],
        duration: 800
      })
      .add({
        targets: '.welcome-text',
        opacity: [0, 1],
        duration: 800
      })
      .add({
        targets: '.feature-item',
        translateX: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800
      })
      .add({
        targets: '.action-button',
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 600
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="max-w-4xl mx-auto" ref={terminalRef}>
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-center flex-1">
              <span className="text-gray-400 text-sm font-mono">linux-starter-pack</span>
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-4 font-mono text-sm" ref={contentRef}>
            <div className="text-green-400 command-line opacity-0">
              <span className="text-blue-400">~</span> $ linux-starter-pack
            </div>
            <div className="text-gray-100 mt-2 welcome-text opacity-0">
              Welcome to Linux Starter Pack! 🐧
            </div>
            <div className="mt-4 text-gray-300">
              <p className="welcome-text opacity-0">Features:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li className="feature-item opacity-0">Interactive TUI for Linux system management</li>
                <li className="feature-item opacity-0">System information dashboard</li>
                <li className="feature-item opacity-0">Package management made easy</li>
                <li className="feature-item opacity-0">Service control interface</li>
                <li className="feature-item opacity-0">Network configuration tools</li>
              </ul>
            </div>
            
            <div className="mt-6">
              <span className="text-green-400 command-line opacity-0">
                <span className="text-blue-400">~</span> $ try-it-now
              </span>
              <div className="mt-4 flex space-x-4">
                <a
                  href="https://github.com/Surajsm60720/linux-starter-pack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button opacity-0 bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-md transition-colors"
                >
                  View on GitHub
                </a>
                <a
                  href="https://github.com/Surajsm60720/linux-starter-pack#installation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button opacity-0 bg-blue-500 hover:bg-blue-600 text-black px-4 py-2 rounded-md transition-colors"
                >
                  Installation Guide
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
