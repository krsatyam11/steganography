import React, { useState, useRef } from 'react';
import { Upload, Eye, Copy, AlertCircle, X } from 'lucide-react';
import { Card, NeonButton, cn } from './ui/Layout';
import { decodeMessage } from '../lib/steganography';

const DecoderTab = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [decodedMessage, setDecodedMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
          setDecodedMessage(null);
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
    setDecodedMessage(null);
    setError(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleDecode = async () => {
    if (!image) return;
    setIsProcessing(true);
    setDecodedMessage(null);
    setError(null);

    setTimeout(async () => {
      try {
        const result = await decodeMessage(image);
        if (result && result.length > 0) {
            setDecodedMessage(result);
        } else {
            setError("No hidden message found or message is corrupted.");
        }
        setIsProcessing(false);
      } catch (err) {
        setError("Decoding failed.");
        setIsProcessing(false);
      }
    }, 1500);
  };

  const copyToClipboard = () => {
    if (decodedMessage) {
      navigator.clipboard.writeText(decodedMessage);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Upload */}
        <Card className={cn(
            "p-8 border-dashed border-2 relative group text-center transition-colors",
            previewUrl ? "border-purple-500/50 bg-purple-500/5" : "hover:border-purple-500/50 cursor-pointer"
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
            
            {previewUrl ? (
                <div className="relative inline-block">
                    <img src={previewUrl} alt="Stego Preview" className="max-h-64 mx-auto rounded border border-border shadow-lg" />
                     {/* Clear Button */}
                     <button 
                      onClick={clearImage}
                      className="absolute -top-3 -right-3 bg-destructive text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg z-20"
                      title="Clear Image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <div className="py-8">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground group-hover:text-purple-500 transition-colors" />
                    <p className="mt-4 text-muted-foreground font-mono">Upload steganographic image</p>
                    <p className="text-xs text-muted-foreground/50 mt-2">Recommended: PNG Format</p>
                </div>
            )}
        </Card>

        {/* Action */}
        <div className="flex justify-center">
            <NeonButton 
                variant="purple" 
                onClick={handleDecode} 
                disabled={!image || isProcessing}
                className="w-full md:w-1/2"
            >
                {isProcessing ? 'EXTRACTING BITS...' : 'DECODE MESSAGE'}
            </NeonButton>
        </div>

        {/* Result */}
        {(decodedMessage || error) && (
            <div className="animate-fade-in-up">
                {error ? (
                    <div className="bg-destructive/10 border border-destructive/50 p-6 rounded-lg text-center">
                        <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
                        <p className="text-destructive font-mono">{error}</p>
                    </div>
                ) : (
                    <div className="bg-black/50 border border-purple-500/30 rounded-lg overflow-hidden relative">
                        <div className="bg-purple-500/10 p-2 border-b border-purple-500/20 flex justify-between items-center">
                            <span className="text-xs font-mono text-purple-400 pl-2">DECODED_OUTPUT</span>
                            <button onClick={copyToClipboard} className="text-xs flex items-center gap-1 text-purple-400 hover:text-white pr-2">
                                <Copy className="h-3 w-3" /> COPY
                            </button>
                        </div>
                        <div className="p-6 font-mono text-sm text-gray-300 whitespace-pre-wrap break-words min-h-[100px]">
                            <span className="text-purple-500 mr-2">{'>'}</span>
                            <span className="text-purple-400">{decodedMessage}</span>
                            <span className="inline-block w-2 h-4 bg-purple-500 ml-1 animate-pulse"/>
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default DecoderTab;