import React, { useState } from 'react';
import Navbar from './components/Navbar';
import EncoderTab from './components/EncoderTab';
import DecoderTab from './components/DecoderTab';
import { Card } from './components/ui/Layout';
import { Lock, Image as ImageIcon, Download, Eye, Github, Linkedin, Youtube, Mail, Instagram } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'encode' | 'decode'>('encode');

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Background Grid - Lower opacity for smoothness */}
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none -z-10" />
      
      {/* Navbar with navigation logic */}
      <Navbar onNavigate={setActiveTab} />

      <main className="flex-1 container px-4 py-8 md:py-12 mx-auto max-w-6xl">
        
        {/* Hero Section */}
        <section className="text-center mb-16 space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-2 relative inline-block">
            <span className="relative">Steganography Tool</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-mono">
            <span className="text-cyan-500">{'>'}</span> Hide Secret Messages Inside Images
          </p>
        </section>

        {/* Main Interface */}
        <div className="mb-20 scroll-mt-24" id="tool-interface">
          {/* Custom Tabs Header */}
          <div className="flex justify-center mb-8">
            <div className="bg-secondary/30 p-1 rounded-lg backdrop-blur-sm border border-border inline-flex shadow-lg">
              <button
                onClick={() => setActiveTab('encode')}
                className={`px-8 py-2 rounded-md font-mono text-sm transition-all duration-300 ${
                  activeTab === 'encode' 
                    ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                ENCODE
              </button>
              <button
                onClick={() => setActiveTab('decode')}
                className={`px-8 py-2 rounded-md font-mono text-sm transition-all duration-300 ${
                  activeTab === 'decode' 
                    ? 'bg-purple-500/10 text-purple-500 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                DECODE
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px] transition-all duration-500 ease-in-out">
            {activeTab === 'encode' ? <EncoderTab /> : <DecoderTab />}
          </div>
        </div>

        {/* How It Works - Simplified */}
        <section id="about" className="mb-20 space-y-8 scroll-mt-24">
          <h2 className="text-2xl font-mono text-center mb-8 border-b border-border pb-4 w-fit mx-auto text-white">
            HOW IT WORKS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { icon: ImageIcon, title: "1. Choose Image", desc: "Pick any normal photo (PNG or JPG) from your device." },
               { icon: Lock, title: "2. Write Secret", desc: "Type the password or message you want to hide." },
               { icon: Eye, title: "3. We Hide It", desc: "The tool mixes your text into the image colors invisible to the eye." },
               { icon: Download, title: "4. Save & Share", desc: "Download the image. It looks exactly the same!" }
             ].map((step, i) => (
               <Card key={i} className="p-6 text-center hover:bg-secondary/40 hover:-translate-y-1 transition-transform duration-300">
                 <step.icon className="h-8 w-8 mx-auto text-white/80 mb-4" />
                 <h3 className="font-mono text-lg font-bold mb-2 text-white">{step.title}</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
               </Card>
             ))}
          </div>
        </section>

        {/* The Science Behind It - Renamed & Simplified */}
        <section className="mb-20">
          <Card className="p-8 border-l-4 border-l-cyan-500 bg-zinc-950/80 shadow-2xl">
            <h3 className="text-xl font-mono font-bold text-white mb-4">The Science Behind It</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-white">Digital Magic (LSB):</strong> 
                  Every image is made of millions of pixels. Each pixel has numbers that define its color (Red, Green, Blue).
                </p>
                <p>
                  This tool slightly tweaks the "Least Significant" numbers of those pixels to store your message letter by letter. Because the change is so tiny (like changing a color value from 254 to 255), the human eye cannot see the difference at all.
                </p>
                <p className="text-xs opacity-70 italic mt-2">
                  *Note: This is fragile! If you compress the image (like sending it on WhatsApp), the hidden data might get lost. Always send as a "File" or "Document".
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded border border-border overflow-x-auto flex items-center justify-center">
                <div className="text-center">
                    <div className="text-xs font-mono text-gray-500 mb-2">Visual Representation</div>
                    <div className="flex gap-2 justify-center mb-2">
                        <div className="w-8 h-8 bg-red-500 rounded" title="Original Red"></div>
                        <span className="text-gray-500 self-center">≈</span>
                        <div className="w-8 h-8 bg-[rgb(254,0,0)] rounded" title="Modified Red (Hidden Data)"></div>
                    </div>
                    {/* FIXED: Replaced "<-" with "←" to prevent JSX error */}
                    <p className="text-xs text-green-400 font-mono">
                        Red: 255 (11111111) <br/> 
                        Red: 254 (11111110) ← Data Hidden
                    </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-black/50 backdrop-blur-md py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Copyright */}
          <div className="text-center md:text-left text-sm text-muted-foreground font-mono order-2 md:order-1">
            <p>© 2026 Kr Satyam. All rights reserved.</p>
            <p className="text-xs opacity-50 mt-1">Educational Purpose Only</p>
          </div>

          {/* Right: Social Links */}
          <div className="flex gap-6 order-1 md:order-2">
            <a href="https://github.com/krsatyam11" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-transform hover:scale-110">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/krsatyam07" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-transform hover:scale-110">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://youtube.com/@KaizenBreach" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-transform hover:scale-110">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/kaizenbreach" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-transform hover:scale-110">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="mailto:kaizenbreach@gmail.com" className="text-muted-foreground hover:text-white transition-transform hover:scale-110">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;