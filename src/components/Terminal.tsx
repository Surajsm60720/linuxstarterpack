import { useState, useEffect, useRef } from "react";
import { useTypewriter } from "react-simple-typewriter";
import anime from "animejs";
import { TerminalIcon } from "../assets/icons/termicon";
import { Images } from "../assets/memes/memes";
import Image from 'next/image';

export default function Terminal() {
  const [userInput, setUserInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTerminalClosed, setIsTerminalClosed] = useState(false);
  const [currentEasterEgg, setCurrentEasterEgg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const validCommands = ['features.sh', 'hello.sh', 'features. sh', 'hello. sh'];

  useEffect(() => {
    const timeline = anime.timeline({
      easing: "easeOutExpo",
    });

    // Set loading to false after initial animation completes
    timeline
      .add({
        targets: terminalRef.current,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
        begin: () => {
          setIsLoading(false);
        }
      })
      .add({
        targets: ".welcome-text",
        opacity: [0, 1],
        duration: 800,
      })
      .add({
        targets: ".command-line",
        opacity: [0, 1],
        duration: 800,
      })
      .add({
        targets: ".feature-item",
        translateX: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
      })
      .add({
        targets: ".action-button",
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 600,
      });
  }, []);

  const [text] = useTypewriter({
    words: [
      'Type "features.sh" to view the feature list...(already changed the file permissions using chmod +x dont worry ≧◠◡◠≦)',
    ],
    typeSpeed: 15,
    loop: 1,
    delaySpeed: 1,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = userInput.trim();

      if (command) {
        // Clear screen animation
        if (contentRef.current) {
          anime({
            targets: contentRef.current,
            opacity: [1, 0],
            duration: 200,
            easing: "easeOutQuad",
            complete: () => {
              // Only store valid commands in history
              if (validCommands.includes(command.toLowerCase())) {
                setCommandHistory([...commandHistory, command]);
              } else {
                setCommandHistory([]);
              }
              setUserInput("");
              setCursorPosition(0);
              // Fade back in
              anime({
                targets: contentRef.current,
                opacity: [0, 1],
                duration: 200,
                easing: "easeInQuad"
              });
            },
          });
        }
      }
    }
  };

  const handleMinimizeToggle = () => {
    if (terminalRef.current) {
      anime({
        targets: terminalRef.current,
        scale: isMinimized ? [1, 1] : [1, 1],
        opacity: isMinimized ? [0.6, 1] : [1, 0.6],
        translateY: isMinimized ? [-50, 0] : [0, -50],
        duration: 600,
        easing: 'easeInOutExpo',
        complete: () => setIsMinimized(!isMinimized)
      });
    }
  };

  const handleClose = () => {
    if (terminalRef.current) {
      // First animate terminal closing
      anime({
        targets: terminalRef.current,
        scale: [1, 0.9],
        opacity: [1, 0],
        translateY: [0, 20],
        duration: 400,
        easing: 'easeInExpo',
        complete: () => {
          setIsTerminalClosed(true);
          const randomImage = Images[Math.floor(Math.random() * Images.length)];
          setCurrentEasterEgg(randomImage);

          // Add a small delay before showing the image
          setTimeout(() => {
            anime({
              targets: '.easter-egg-image',
              opacity: [0, 1],
              scale: [0.8, 1],
              duration: 800, // Increased duration
              easing: 'easeOutElastic(1, 0.8)',
              begin: () => {
                // Make sure the container is visible
                const container = document.querySelector('.easter-egg-image') as HTMLElement;
                if (container) {
                  container.style.display = 'block';
                }
              }
            });
          }, 100); // Small delay to ensure state is updated
        }
      });
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
    <div className="min-h-screen bg-gradient-to-b from-orange-300 to-amber-200 flex items-center justify-center p-2">
      {isLoading ? (
        <div className="h-[80vh] w-[80vw] bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700 opacity-0">
          {/* Loading placeholder that matches your terminal layout */}
          <div className="bg-gray-800 px-2 py-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      ) : (
        !isTerminalClosed ? (
          <div className={`transition-all duration-300 ease-in-out ${isMinimized ? 'h-12 w-12 cursor-pointer bg-gray-900 rounded-lg shadow-lg hover:shadow-xl' : 'h-[80vh] w-[80vw] px-2'
            }`} ref={terminalRef}>
            {isMinimized ? (
              <div
                className="h-full w-full flex items-center justify-center hover:scale-110 transition-transform"
                onClick={handleMinimizeToggle}
              >
                <TerminalIcon />
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700 h-full">
                {/* Terminal Header */}
                <div className="bg-gray-800 px-2 py-2 flex items-center">
                  <div className="flex space-x-2">
                    <div
                      className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-400 transition-colors"
                      onClick={handleClose}
                    ></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div
                      className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-400 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMinimizeToggle();
                      }}
                    ></div>
                  </div>
                  <div className={`text-center flex-1 ${isMinimized ? 'hidden' : ''}`}>
                    <span className="text-gray-400 text-sm font-mono">
                      linux-starter-pack
                    </span>
                  </div>
                </div>

                {/* Only render content if not minimized */}
                {!isMinimized && (
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono">
                    <div className="h-full" ref={contentRef}>
                      {/* Show ASCII art only when no commands have been entered */}
                      {commandHistory.length === 0 ? (
                        <div className="mt-4 animate-fadeIn text-center">
                          {/* Hide ASCII on small screens, show on medium and up with fractional scaling */}
                          <pre className="text-green-400 whitespace-pre-wrap overflow-x-auto hidden md:block text-[0.55rem] lg:text-[0.65rem] xl:text-xs 2xl:text-sm">
                            {asciiArt}
                          </pre>
                          {/* Show text title only on small screens (below md) */}
                          <h1 className="md:hidden text-2xl font-bold text-center mb-4">
                            Linux Starter Pack
                          </h1>
                          <div className="mt-4 text-gray-300 space-y-2">
                            <p>A Linux distro based package installation CLI</p><br />
                          </div>
                        </div>
                      ) : (
                        // Show last command and its output only if it was a valid command
                        commandHistory.length > 0 && validCommands.includes(commandHistory[commandHistory.length - 1].toLowerCase()) ? (
                          <div className="animate-fadeIn">
                            <div className="flex items-center space-x-2 mb-4 font-mono">
                              <span className="text-green-400">user@linux</span>
                              <span className="text-gray-400">:</span>
                              <span className="text-blue-400">~</span>
                              <span className="text-gray-400">$ </span>
                              <span>{commandHistory[commandHistory.length - 1]}</span>
                            </div>

                            {/* Command output */}
                            {(commandHistory[commandHistory.length - 1]?.toLowerCase() === "hello.sh" ||
                              commandHistory[commandHistory.length - 1]?.toLowerCase() === "hello. sh") && (
                                <div className="mt-4 animate-fadeIn">
                                  {/* Hide ASCII on small screens, show on medium and up with fractional scaling */}
                                  <pre className="text-green-400 whitespace-pre-wrap overflow-x-auto hidden md:block text-[0.55rem] lg:text-[0.65rem] xl:text-xs 2xl:text-sm">
                                    {asciiArt}
                                  </pre>
                                  {/* Show text title only on small screens (below md) */}
                                  <h1 className="md:hidden text-2xl font-bold mb-4">
                                    Linux Starter Pack
                                  </h1>
                                  <div className="mt-4 text-gray-300 space-y-2">
                                    <p>A Linux distro based package installation CLI</p>
                                  </div>
                                </div>
                              )}
                            {(commandHistory[commandHistory.length - 1]?.toLowerCase() === "features.sh" ||
                              commandHistory[commandHistory.length - 1]?.toLowerCase() === "features. sh") && (
                                <div className="mt-4 animate-fadeIn">
                                  <div className="text-gray-300 space-y-4">
                                    <h2 className="text-xl text-green-400 font-bold mb-4">
                                      Features
                                    </h2>
                                    <h3 className="text-blue-400 text-lg mb-2">
                                      Package Management
                                    </h3>
                                    <p className="text-sm">
                                      Easily install and manage packages across different
                                      Linux distributions
                                    </p>
                                    <h3 className="text-blue-400 text-lg mb-2">
                                      System Updates
                                    </h3>
                                    <p className="text-sm">
                                      Keep your system up to date with automatic update
                                      checks
                                    </p>
                                    <h3 className="text-blue-400 text-lg mb-2">
                                      System Tools
                                    </h3>
                                    <p className="text-sm">
                                      Essential system maintenance and optimization tools
                                    </p>
                                    <h3 className="text-blue-400 text-lg mb-2">
                                      Smart Search
                                    </h3>
                                    <p className="text-sm">
                                      Find packages across multiple repositories instantly
                                    </p>
                                    <div className="mt-6 text-left font-mono">
                                      <p className="text-gray-400 text-sm">
                                        Type anything to clear the screen...
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>
                        ) : (
                          // Show empty terminal for invalid commands
                          <div className="animate-fadeIn">
                            <div className="flex items-center space-x-2 mb-4 font-mono">
                              <span className="text-green-400">user@linux</span>
                              <span className="text-gray-400">:</span>
                              <span className="text-blue-400">~</span>
                              <span className="text-gray-400">$ </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Always show current command line at bottom */}
                    <div className="flex items-center space-x-2 mt-4 font-mono">
                      <span className="text-green-400">user@linux</span>
                      <span className="text-gray-400">:</span>
                      <span className="text-blue-400">~</span>
                      <span className="text-gray-400">$ </span>
                      <div className="flex-1 flex items-center relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={userInput}
                          onChange={handleInput}
                          onKeyDown={handleKeyPress}
                          onKeyUp={(e) =>
                            setCursorPosition(e.currentTarget.selectionStart || 0)
                          }
                          onClick={(e) =>
                            setCursorPosition(e.currentTarget.selectionStart || 0)
                          }
                          className="bg-transparent border-none outline-none flex-1 text-gray-100 relative z-10 caret-transparent"
                          placeholder={text}
                        />
                        <div
                          className="absolute top-0 left-0 text-gray-100 pointer-events-none"
                          style={{
                            position: "absolute",
                            left: `${cursorPosition * 10}px`,
                            opacity: 1,
                          }}
                        >
                          <span className="animate-blink">▋</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="easter-egg-image opacity-0 transition-all duration-300">
            <Image
              src={currentEasterEgg}
              alt="Easter Egg"
              width={500}
              height={400}
              priority
              unoptimized
              className="max-w-md rounded-lg shadow-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => {
                anime({
                  targets: '.easter-egg-image',
                  opacity: [1, 0],
                  scale: [1, 0.8],
                  duration: 300,
                  easing: 'easeInExpo',
                  complete: () => {
                    setIsTerminalClosed(false);
                    setCurrentEasterEgg('');
                    if (terminalRef.current) {
                      terminalRef.current.style.opacity = '1';
                      terminalRef.current.style.transform = 'scale(1) translateY(0)';
                    }
                  }
                });
              }}
            />
          </div>
        )
      )}
    </div>
  );
}
