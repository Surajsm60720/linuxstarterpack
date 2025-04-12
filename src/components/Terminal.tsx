import { useState, useEffect, useRef } from "react";
import { useTypewriter } from "react-simple-typewriter";
import anime from "animejs";

export default function Terminal() {
  const [userInput, setUserInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const timeline = anime.timeline({
      easing: "easeOutExpo",
    });

    timeline
      .add({
        targets: terminalRef.current,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
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
      'Type "features.sh" to view the feature list...(already changed the file permissions using chmod +x dont worry >_<)',
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
      setCommandHistory([...commandHistory, userInput]);

      setUserInput("");
      setCursorPosition(0);
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
      <div className="h-[80vh] w-[80vw] px-2" ref={terminalRef}>
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700 h-full">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-2 py-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-center flex-1">
              <span className="text-gray-400 text-sm font-mono">
                linux-starter-pack
              </span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono">
            <div className="mt-4 animate-fadeIn text-center"> 
              <pre className="text-green-400 whitespace-pre-wrap text-[0.6rem] sm:text-xs md:text-sm lg:text-base overflow-x-auto">
                {asciiArt}
              </pre>
              <h1 className="md:hidden text-2xl font-bold text-center mb-4">
                Linux Starter Pack
              </h1>
              <div className="mt-4 text-gray-300 space-y-2">
                <p>A Linux distro based package installation CLI</p><br/>
              </div>
            </div>
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
                    left: `${cursorPosition * 8}px`,
                    opacity: 1,
                  }}
                >
                  <span className="animate-blink">▋</span>
                </div>
              </div>
            </div>
            <div
              className="p-4 font-mono text-sm h-[calc(100%-2.5rem)]"
              ref={contentRef}
            >
              {commandHistory.map((cmd, index) => (
                <div key={index} className="command-line opacity-100">
                  {cmd.toLowerCase() === "features.sh" &&
                    index === commandHistory.length - 1 && (
                      <div className="mt-4 animate-fadeIn">
                        <div className="mt-4 text-gray-300 space-y-4">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
