import React, { useState } from 'react';
import { Upload, Download, AlertTriangle, Cpu } from 'lucide-react';
import { Card, NeonButton, cn } from './ui/Layout';
import { encodeMessage, calculateCapacity } from '../lib/steganography';

const EncoderTab = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [encodedUrl, setEncodedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capacity, setCapacity] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Set explicit limit
  const MAX_FILE_SIZE_MB = 5;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Security: Check file size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`File is too large! Please upload an image smaller than ${MAX_FILE_SIZE_MB}MB.`);
        // Reset image if invalid
        setImage(null);
        setPreviewUrl(null);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setCapacity(calculateCapacity(img.width, img.height));
          setEncodedUrl(null);
          setError(null);
        };
        img.src = event.target?.result as string;
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEncode = async () => {
    if (!image || !message) return;
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate processing delay for "hacker" effect
      setTimeout(async () => {
        try {
          const result = await encodeMessage(image, message);
          setEncodedUrl(result);
          setIsProcessing(false);
        } catch (err) {
          setError(String(err));
          setIsProcessing(false);
        }
      }, 1500);
    } catch (err) {
      setError("Encoding failed.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Card className="p-6 border-dashed border-2 hover:border-cyan-500/50 cursor-pointer relative group transition-colors">
             <input 
                type="file" 
                accept="image/png, image/jpeg" 
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
             />
             <div className="text-center py-8">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded border border-border" />
                ) : (
                  <>
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground group-hover:text-cyan-500 transition-colors" />
                    <p className="mt-4 text-muted-foreground font-mono">Click to upload image</p>
                    <p className="text-xs text-muted-foreground/50 mt-2">
                        PNG or JPG • Max {MAX_FILE_SIZE_MB}MB
                    </p>
                  </>
                )}
             </div>
          </Card>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-muted-foreground">
              <span>SECRET MESSAGE</span>
              <span className={cn(message.length > capacity ? "text-red-500" : "text-cyan-500")}>
                {message.length} / {capacity > 0 ? capacity : '0'} chars
              </span>
            </div>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter the secret message you want to hide..."
              className="w-full bg-black/50 border border-border rounded-lg p-4 font-mono text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none min-h-[150px] resize-none placeholder:text-muted-foreground/40"
              disabled={!image}
            />
          </div>

          <NeonButton 
            className="w-full" 
            onClick={handleEncode}
            disabled={!image || !message || isProcessing || message.length > capacity}
          >
            {isProcessing ? 'ENCRYPTING...' : 'ENCODE MESSAGE'}
          </NeonButton>
          
          {error && (
            <div className="bg-destructive/10 border border-destructive/50 p-4 rounded text-destructive text-sm font-mono flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              {error}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="h-full bg-black/30 border border-border rounded-lg p-6 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
             {/* Decor */}
             <div className="absolute top-0 left-0 p-4 font-mono text-xs text-muted-foreground/30">OUTPUT_TERMINAL</div>
             
             {isProcessing && (
               <div className="text-center space-y-4">
                 <Cpu className="h-12 w-12 text-cyan-500 animate-spin mx-auto" />
                 <p className="font-mono text-cyan-500 animate-pulse">Hiding your message...</p>
               </div>
             )}

             {!isProcessing && encodedUrl && (
               <div className="w-full space-y-6 text-center animate-fade-in-up">
                 <div className="relative group">
                   <img src={encodedUrl} alt="Encoded" className="max-h-64 mx-auto rounded border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]" />
                   <div className="absolute top-2 right-2">
                     <span className="bg-black/80 text-cyan-500 text-xs px-2 py-1 rounded font-mono border border-cyan-500/30">ENCODED</span>
                   </div>
                 </div>
                 
                 <div className="bg-black/50 border border-green-500/30 rounded p-4 font-mono text-left text-sm">
                    <p className="text-green-500">
                      <span className="text-green-400">sys@kaizen:~$</span> Message successfully hidden.
                    </p>
                    <p className="text-gray-500 text-xs mt-1">Image ready for download.</p>
                 </div>

                 <a 
                   href={encodedUrl} 
                   download="stego_image.png"
                   className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 font-mono border-2 rounded-lg border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300"
                 >
                   <Download className="h-4 w-4" />
                   DOWNLOAD IMAGE
                 </a>
               </div>
             )}

             {!isProcessing && !encodedUrl && (
               <div className="text-muted-foreground/30 font-mono text-sm">
                 Waiting for input...
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncoderTab;