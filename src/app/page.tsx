'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function Home() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
            // Start animations after text is set
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
                targets: '.welcome-text',
                opacity: [0, 1],
                duration: 800
              })
              .add({
                targets: '.command-line',
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

  const asciiArt = `
  _      _                       _____  _                 _                ______               _    
 | |    (_)                     /  ___|| |               | |               | ___ \\             | |   
 | |     _  _ __   _   _ __  __  \\--. | |_   __ _  _ __ | |_   ___  _ __  | |_/ /  __ _   ___ | | __
 | |    | || '_ \\ | | | |\\ \\/ /  \\--. \\| __| / _\` || '__|| __| / _ \\| '__| |  __/  / _\` | / __|| |/ /
 | |____| || | | || |_| | >  <  /\\__/ /| |_ | (_| || |   | |_ |  __/| |    | |    | (_| || (__ |   < 
 \\_____/|_||_| |_| \\__,_|/_/\\_\\ \\____/  \\__| \\__,_||_|    \\__| \\___|_|    \\_|     \\__,_| \\___||_|\\_\\
`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-300 to-amber-200 flex items-center justify-center">
      <div className="w-full h-[80vh] max-w-9/10 px-4" ref={terminalRef}>
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700 h-full">
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
          <div className="p-4 font-mono text-sm h-[calc(100%-2.5rem)]" ref={contentRef}>
            <div className="text-gray-100 mt-2 welcome-text opacity-0">
              <pre className="font-mono whitespace-pre overflow-x-auto text-center">
                {asciiArt}
              </pre>
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
