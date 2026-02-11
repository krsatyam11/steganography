import React, { useState, useRef } from 'react';
import { Upload, Download, AlertTriangle, Cpu, X, Trash2 } from 'lucide-react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Updated Limit: 20MB
  const MAX_FILE_SIZE_MB = 20;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`File is too large! Max limit is ${MAX_FILE_SIZE_MB}MB.`);
        clearImage();
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

  const clearImage = () => {
    setImage(null);
    setPreviewUrl(null);
    setEncodedUrl(null);
    setCapacity(0);
    setMessage('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEncode = async () => {
    if (!image || !message) return;
    setIsProcessing(true);
    setError(null);

    try {
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
          <Card className={cn(
            "p-6 border-dashed border-2 relative group transition-colors",
            previewUrl ? "border-cyan-500/50 bg-cyan-500/5" : "hover:border-cyan-500/50 cursor-pointer"
          )}>
             {!previewUrl && (
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg" 
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
             )}
             
             <div className="text-center py-8">
                {previewUrl ? (
                  <div className="relative inline-block">
                    <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded border border-cyan-500/50 shadow-lg" />
                    {/* Clear Button */}
                    <button 
                      onClick={clearImage}
                      className="absolute -top-3 -right-3 bg-destructive text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg z-20"
                      title="Clear Image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="mt-2 text-xs font-mono text-cyan-500">
                        {image ? `${image.width}x${image.height}px` : ''}
                    </div>
                  </div>
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
                {message.length} / {capacity > 0 ? capacity.toLocaleString() : '0'} chars
              </span>
            </div>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={capacity > 0 ? "Enter your secret message here..." : "Upload an image first to enable typing..."}
              maxLength={capacity > 0 ? capacity : 0}
              className="w-full bg-black/50 border border-border rounded-lg p-4 font-mono text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none min-h-[150px] resize-none placeholder:text-muted-foreground/40 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!image}
            />
            {capacity > 0 && message.length >= capacity && (
                <p className="text-xs text-red-500 font-mono">Maximum character limit reached for this image size.</p>
            )}
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
                 <div className="relative group inline-block">
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
                 
                 <button 
                    onClick={clearImage}
                    className="block w-full text-center text-xs text-muted-foreground hover:text-white mt-2 underline"
                 >
                    Start Over
                 </button>
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