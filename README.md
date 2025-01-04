# Claude Interface
A modern, user-friendly web application for interacting with Anthropic's Claude AI models. Built with Next.js and featuring a sleek dark theme, this interface provides seamless conversation management and an intuitive chat experience.

⚠️ **Note**: You'll need an Anthropic API key to use this application. Get one at [console.anthropic.com](https://console.anthropic.com)

## Features
- 🤖 Direct Claude model integration
- 💬 Complete chat history management
- ✏️ Conversation renaming capability
- 🗑️ Chat deletion functionality
- 🌙 Clean dark-themed interface
- 🔒 Secure API key handling
- 📱 Responsive design

## Installation
1. Clone the repository:
```bash
git clone https://github.com/cozbrozdevarc/claude-api-interface.git
cd claude-api-interface
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
# Create .env file with default settings
echo "NEXT_PUBLIC_DEFAULT_MODEL=claude-3-opus-20240229" > .env
```

4. Start development server:
```bash
npm run dev
```

## Project Structure
```
claude-api-interface/
├── app/                      # Next.js app directory
│   ├── favicon.ico          # Website favicon
│   ├── globals.css          # Global CSS styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
│
├── components/              # React components
│   ├── ApiKeyInput.tsx     # Component for API key input
│   ├── ChatInterface.tsx   # Main chat interface component
│   ├── CodeBlock.tsx       # Code block display component
│   ├── Settings.tsx        # Settings panel component
│   └── Sidebar.tsx         # Sidebar navigation component
│
├── public/                  # Static assets
│   ├── file.svg            # File icon
│   ├── globe.svg           # Globe icon
│   ├── next.svg            # Next.js logo
│   ├── vercel.svg          # Vercel logo
│   └── window.svg          # Window icon
│
├── .gitignore              # Git ignore configuration
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package-lock.json       # NPM package lock file
├── package.json            # Project dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project documentation
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json
```

## Requirements
- Node.js 16 or higher
- NPM or Yarn
- Anthropic API key
- Modern web browser

## Usage Guide
1. Launch the application
2. Enter your Anthropic API key in settings
3. Start chatting with Claude
4. Manage conversations:
   - Rename chats via edit button
   - Delete unwanted conversations
   - Switch between active chats

## Safety Features
- Client-side API key storage
- No server-side data retention
- Encrypted API communication
- Secure local storage

## Contributing
Contributions are welcome! Here's how:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to your branch
5. Submit a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support
Need help? Here's what to do:
- Check existing issues
- Create a new issue
- Provide detailed problem description
- Include steps to reproduce

## Acknowledgments
- Built on [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Powered by [Anthropic's Claude API](https://docs.anthropic.com/claude/docs)
