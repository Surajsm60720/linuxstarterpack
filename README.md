# Linux Starter Pack

This is a webiste made for the project Linux Starter Pack, a cross-distribution package installation TUI (Terminal User Interface) for Linux that simplifies the software installation process across different Linux distributions.

## Features

- **Cross-Distribution Support**: Works seamlessly on Ubuntu, Fedora, Arch, openSUSE, and more
- **Intuitive Interface**: Beautiful TUI for easy navigation
- **Smart Package Management**: Automatically uses the correct package manager for your distro
- **Pre-configured Tools**: Common development tools, browsers, and applications ready to install
- **Batch Installation**: Install multiple packages with a single command
- **Category-based Organization**: Easy browsing through categorized software
- **Safe and Transparent**: Review installation commands before execution
- **Fast and Efficient**: Optimized for quick installations

## Getting Started

### Prerequisites

- Any Linux distribution with a supported package manager
- Node.js 18+ and npm (for the web interface)

### Installation

```bash
# Clone the repository
git clone https://github.com/Surajsm60720/linuxstarterpack.git

# Navigate to the project directory
cd linuxstarterpack

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

### Web Interface

The web interface provides a terminal-like experience to showcase the features of Linux Starter Pack:

1. Type `features.sh` to see a list of features
2. Type `contribute.sh` to see how you can contribute to the project
3. Type `hello.sh` to go back to the welcome screen

(There are also some easter eggs in the terminal interface. Do give it a shot ^_^)

## Development

```bash
# Run in development mode with hot reload
npm run dev

# Build for production
npm run build
```

## Architecture

Linux Starter Pack consists of two main components:

1. **Core CLI Tool**: Built with Python for a sleek and user friendly UI
2. **Web Interface**: Built with Next.js for showcasing the project features

The web interface uses:
- Next.js 15+
- React 19
- TailwindCSS 4
- TypeScript
- Anime.js for animations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgements

- [Next.js](https://nextjs.org/) for the web framework
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Anime.js](https://animejs.com/) for animations
- All contributors who have helped shape this project

---

Made with ❤️ by [Suraj](https://github.com/Surajsm60720)