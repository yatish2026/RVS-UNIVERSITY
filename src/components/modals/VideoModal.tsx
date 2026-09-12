import React, { useRef, useEffect, useState } from 'react';
import { X, Play, Volume2, Film, Sparkles, Video } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc = '/videos/prospectus.mp4',
  title = 'RVS University — Official Video Prospectus',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentVideo, setCurrentVideo] = useState<string>(videoSrc);

  // Sync with prop when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentVideo(videoSrc);
    }
  }, [isOpen, videoSrc]);

  // Lock body scroll and handle autoplay/pause on open/close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback
        });
      }
    } else {
      document.body.style.overflow = 'unset';
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentVideo]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn bg-black/85 backdrop-blur-md">
      {/* Click backdrop to close */}
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Video Container Box - Compact Max Width (max-w-3xl) */}
      <div className="relative w-full max-w-2xl lg:max-w-3xl bg-[#0A192F] text-white rounded-2xl border border-gold-400/50 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]">
        
        {/* Compact Video Header Bar */}
        <div className="bg-gradient-to-r from-navy-950 via-[#102444] to-navy-950 px-4 py-3 sm:px-5 sm:py-3 border-b border-gold-400/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gold-500/20 border border-gold-400/50 flex items-center justify-center text-gold-400 flex-shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-gold-400" />
                  Official Video Prospectus
                </span>
              </div>
              <h3 className="font-serif text-xs sm:text-sm md:text-base font-bold text-white truncate">
                {title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors border border-white/20 cursor-pointer flex-shrink-0"
            aria-label="Close Video"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Stage - Compact Aspect Ratio */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            key={currentVideo}
            controls
            autoPlay
            playsInline
            preload="metadata"
            controlsList="nodownload"
            className="w-full h-full object-contain"
          >
            <source src={currentVideo} type="video/mp4" />
            <source src="/videos/prospectus.mp4" type="video/mp4" />
            <source src="/videos/videobanner.mp4" type="video/mp4" />
            Your browser does not support HTML5 video playback.
          </video>
        </div>

        {/* Compact Cinema Bottom Bar with Video Switcher */}
        <div className="px-4 py-2.5 sm:px-5 bg-navy-950 border-t border-navy-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Full HD
            </span>
            <span className="text-slate-400 hidden sm:inline">RVS University Smart Campus Tour</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Switch Button if they want to view either */}
            <button
              onClick={() => setCurrentVideo('/videos/prospectus.mp4')}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                currentVideo === '/videos/prospectus.mp4'
                  ? 'bg-gold-500 text-navy-950 font-bold'
                  : 'bg-navy-800 text-slate-300 hover:bg-navy-700'
              }`}
            >
              Prospectus Video
            </button>
            <button
              onClick={() => setCurrentVideo('/videos/videobanner.mp4')}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                currentVideo === '/videos/videobanner.mp4'
                  ? 'bg-gold-500 text-navy-950 font-bold'
                  : 'bg-navy-800 text-slate-300 hover:bg-navy-700'
              }`}
            >
              Campus Tour
            </button>

            <a
              href="#admissions"
              onClick={onClose}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 font-bold text-[10px] uppercase tracking-wider transition-all ml-1"
            >
              Apply →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
