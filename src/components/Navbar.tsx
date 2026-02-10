import { Menu } from 'lucide-react';
import React from 'react';

interface NavbarProps {
  onNavigate: (tab: 'encode' | 'decode') => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const handleNavClick = (tab: 'encode' | 'decode', e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(tab);
    const toolSection = document.getElementById('tool-interface');
    if (toolSection) {
      toolSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2 select-none">
          {/* Terminal Style Name */}
          <span className="text-xl font-bold font-mono tracking-tight text-white hover:text-cyan-500 transition-colors cursor-pointer">
            ~/KrSatyam
          </span>
          <span className="animate-pulse bg-cyan-500 h-5 w-2.5 block ml-1"></span>
        </div>
        
        <div className="hidden md:flex gap-8 font-mono text-sm text-muted-foreground">
          <button 
            onClick={(e) => handleNavClick('encode', e)} 
            className="hover:text-cyan-500 transition-colors hover:underline decoration-cyan-500/50 underline-offset-4"
          >
            Encoder
          </button>
          <button 
            onClick={(e) => handleNavClick('decode', e)} 
            className="hover:text-purple-500 transition-colors hover:underline decoration-purple-500/50 underline-offset-4"
          >
            Decoder
          </button>
          <a 
            href="#about" 
            className="hover:text-white transition-colors hover:underline decoration-white/50 underline-offset-4"
          >
            How It Works
          </a>
        </div>
        
        <div className="md:hidden">
          <Menu className="h-6 w-6 text-white" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;