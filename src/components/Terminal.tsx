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

  const validCommands = ['features.sh', 'hello.sh', 'features. sh', 'hello. sh', 'contribute.sh', 'contribute. sh'];

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
      'Type "features.sh" to view the feature list...Type "contribute.sh" to view the Github link',
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
          <div className={`transition-all duration-300 ease-in-out ${isMinimized ? 'h-12 w-12 cursor-pointer bg-gray-900 rounded-lg shadow-lg hover:shadow-xl' : 'h-[85vh] w-[80vw] px-2'
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
                                  {/* Apply responsive text sizes */}
                                  <div className="text-gray-300 space-y-3 sm:space-y-4">
                                    <h2 className="text-base sm:text-lg md:text-xl text-green-400 font-bold mb-2 sm:mb-4">
                                      Features
                                    </h2>

                                    <h3 className="text-sm md:text-lg text-blue-400 mb-1 sm:mb-2">
                                      Cross-Distribution Support
                                    </h3>
                                    <p className="text-xs sm:text-sm">
                                      Works seamlessly on Ubuntu, Fedora, Arch, openSUSE, and more.
                                    </p>

                                    <h3 className="text-sm md:text-lg text-blue-400 mb-1 sm:mb-2">
                                      Intuitive Interface
                                    </h3>
                                    <p className="text-xs sm:text-sm">
                                      Beautiful TUI (Terminal User Interface) for easy navigation.
                                    </p>

                                    <h3 className="text-sm md:text-lg text-blue-400 mb-1 sm:mb-2">
                                      Smart Package Management
                                    </h3>
                                    <p className="text-xs sm:text-sm">
                                      Automatically uses the correct package manager for your distro.
                                    </p>

                                    <h3 className="text-sm md:text-lg text-blue-400 mb-1 sm:mb-2">
                                      Pre-configured Tools
                                    </h3>
                                    <p className="text-xs sm:text-sm">
                                      Common development tools, browsers, and applications ready to install.
                                    </p>

                                    <h3 className="text-sm md:text-lg text-blue-400 mb-1 sm:mb-2">
                                      Batch Installation
                                    </h3>
                                    <p className="text-xs sm:text-sm">
                                      Install multiple packages with a single command.
                                    </p>

                                    <h3 className="text-sm md:text-lg text-blue-400 mb-1 sm:mb-2">
                                      Category-based Organization
                                    </h3>
                                    <p className="text-xs sm:text-sm">
                                      Easy browsing through categorized software.
                                    </p>

                                    <h3 className="text-sm md:text-lg text-blue-400 mb-1 sm:mb-2">
                                      Safe and Transparent
                                    </h3>
                                    <p className="text-xs sm:text-sm">
                                      Review installation commands before execution.
                                    </p>

                                    <h3 className="text-sm md:text-lg text-blue-400 mb-1 sm:mb-2">
                                      Fast and Efficient
                                    </h3>
                                    <p className="text-xs sm:text-sm">
                                      Optimized for quick installations.
                                    </p>

                                    <div className="mt-4 sm:mt-6 text-left font-mono">
                                      <p className="text-gray-400 text-xs sm:text-sm">
                                        Type anything to clear the screen...
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            {(commandHistory[commandHistory.length - 1]?.toLowerCase() === "contribute.sh" ||
                              commandHistory[commandHistory.length - 1]?.toLowerCase() === "contribute. sh") && (
                                <div className="mt-4 animate-fadeIn">
                                  <div className="text-gray-300 space-y-3 sm:space-y-4">
                                    <h2 className="text-base sm:text-lg md:text-xl text-green-400 font-bold mb-2 sm:mb-4">
                                      Contributing
                                    </h2>

                                    <p className="text-xs sm:text-sm">
                                      Thank you for your interest in contributing to Linux Starter Pack!
                                    </p>

                                    <h3 className="text-sm md:text-lg text-blue-400 mb-1 sm:mb-2">
                                      GitHub Repository
                                    </h3>
                                    <p className="text-xs sm:text-sm">
                                      Find the source code, report issues, or submit pull requests on GitHub:
                                      <a
                                        href="https://github.com/surajsm60720/linux-starter-pack"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-yellow-400 hover:text-yellow-300 underline ml-2"
                                      >
                                        surajsm60720/linux-starter-pack
                                      </a>
                                    </p>

                                    <h3 className="text-sm md:text-lg text-blue-400 mb-1 sm:mb-2">
                                      How to Contribute
                                    </h3>
                                    <p className="text-xs sm:text-sm">
                                      1. Fork the repository.
                                      <br />
                                      2. Create a new branch for your feature or bug fix.
                                      <br />
                                      3. Make your changes.
                                      <br />
                                      4. Submit a pull request with a clear description.
                                    </p>

                                    <h3 className="text-sm md:text-lg text-blue-400 mb-1 sm:mb-2">
                                      Ideas Welcome!
                                    </h3>
                                    <p className="text-xs sm:text-sm">
                                      Feel free to open an issue to suggest new features or improvements.
                                    </p>

                                    <div className="mt-4 sm:mt-6 text-left font-mono">
                                      <p className="text-gray-400 text-xs sm:text-sm">
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
              className="max-w-md rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        )
      )}
    </div>
  );
}
