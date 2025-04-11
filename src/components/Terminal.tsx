import { useState, useEffect, useRef } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import anime from 'animejs';

export default function Terminal() {
  const [userInput, setUserInput] = useState('');
  const [showAscii, setShowAscii] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);

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

  const [text] = useTypewriter({
    words: ['Type "hello.sh" to start...'],
    loop: 1,
    delaySpeed: 2000,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
    if (e.target.value.toLowerCase() === 'hello.sh') {
      setShowAscii(true);
    }
  };

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
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono">
            <div className="flex items-center space-x-2 mb-2 font-mono">
              <span className="text-green-400">user@linux</span>
              <span className="text-gray-400">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-gray-400">$</span>
              <div className="flex-1 flex items-center relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleInput}
                  onKeyUp={(e) => setCursorPosition(e.currentTarget.selectionStart || 0)}
                  onClick={(e) => setCursorPosition(e.currentTarget.selectionStart || 0)}
                  className="bg-transparent border-none outline-none flex-1 text-gray-100 relative z-10 caret-transparent"
                  placeholder={text}
                />
                <div 
                  className="absolute top-0 left-0 text-gray-100 pointer-events-none"
                  style={{
                    position: 'absolute',
                    left: `${cursorPosition * 8}px`,
                    opacity: 1
                  }}
                >
                  <span className="animate-blink">▋</span>
                </div>
              </div>
            </div>
            <div className="p-4 font-mono text-sm h-[calc(100%-2.5rem)]" ref={contentRef}>
               <div className="flex items-center space-x-2">
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}