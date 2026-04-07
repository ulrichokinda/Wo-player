import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Maximize, Minimize, Play, Pause, Volume2, VolumeX, Settings, SkipBack, SkipForward, Wifi, WifiOff } from 'lucide-react';
import { Button, cn } from './ui';

interface PlayerProps {
  url: string;
  title?: string;
}

export const VideoPlayer: React.FC<PlayerProps> = ({ url, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [error, setError] = useState<string | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [lowBandwidthMode, setLowBandwidthMode] = useState(false);
  const [connectionHealth, setConnectionHealth] = useState<'good' | 'fair' | 'poor'>('good');

  useEffect(() => {
    if (!videoRef.current || !url) return;

    const video = videoRef.current;
    let hls: Hls | null = null;
    setError(null);

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);

    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('canplay', handlePlaying);

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90, // Even more back buffer
        maxBufferLength: lowBandwidthMode ? 60 : 30, // Larger buffer for low bandwidth
        maxMaxBufferLength: 120,
        maxBufferSize: lowBandwidthMode ? 100 * 1000 * 1000 : 60 * 1000 * 1000,
        manifestLoadingMaxRetry: 10,
        manifestLoadingRetryDelay: 2000,
        levelLoadingMaxRetry: 10,
        fragLoadingMaxRetry: 20,
        fragLoadingRetryDelay: 1000,
        startLevel: 0, 
        abrEwmaFastLive: lowBandwidthMode ? 1.0 : 2.0,
        abrEwmaSlowLive: lowBandwidthMode ? 2.0 : 4.0,
        xhrSetup: (xhr) => {
          xhr.timeout = 15000;
        }
      });
      
      hls.loadSource(url);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => {
          console.warn("Autoplay blocked or failed:", err);
        });
        setIsPlaying(true);
      });

      hls.on(Hls.Events.FRAG_LOADED, (event, data: any) => {
        const loadTime = data.stats.loading.end - data.stats.loading.start;
        if (loadTime > 2000) setConnectionHealth('poor');
        else if (loadTime > 800) setConnectionHealth('fair');
        else setConnectionHealth('good');
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error("HLS Fatal Error:", data.type, data.details);
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setError("Problème de connexion... Tentative de reconnexion");
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setError("Erreur de flux... Récupération en cours");
              hls?.recoverMediaError();
              break;
            default:
              setError("Erreur fatale du lecteur");
              hls?.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
        setIsPlaying(true);
      });
      video.addEventListener('error', () => {
        setError("Erreur de chargement du flux");
      });
    }

    return () => {
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('canplay', handlePlaying);
      if (hls) {
        hls.destroy();
      }
    };
  }, [url]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.parentElement?.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative group bg-black rounded-xl overflow-hidden aspect-video shadow-2xl">
      <video
        ref={videoRef}
        className="w-full h-full cursor-pointer"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        playsInline
      />
      
      {isBuffering && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white text-xs font-black uppercase tracking-widest animate-pulse">Chargement...</p>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 text-white p-6 text-center z-10">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <VolumeX size={32} className="text-red-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">{error}</h3>
          <p className="text-sm text-zinc-400 max-w-xs mb-6">
            Le lien de diffusion est peut-être expiré ou votre connexion est instable.
          </p>
          <Button 
            size="sm" 
            onClick={() => {
              setError(null);
              // Trigger a reload by resetting the URL or similar
              const currentUrl = url;
              // This is a bit hacky but forces a re-render/re-init
              window.dispatchEvent(new CustomEvent('player-retry'));
            }}
          >
            Réessayer
          </Button>
        </div>
      )}
      
      {/* Overlay Controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none group-active:opacity-100">
        <div className="flex flex-col gap-2 pointer-events-auto">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-black/40 rounded-full border border-white/5">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full animate-pulse",
                  connectionHealth === 'good' ? "bg-emerald-500" : 
                  connectionHealth === 'fair' ? "bg-amber-500" : "bg-red-500"
                )} />
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">
                  {connectionHealth === 'good' ? "Stable" : 
                   connectionHealth === 'fair' ? "Instable" : "Faible"}
                </span>
              </div>
              <button onClick={togglePlay} className="hover:text-primary transition-colors p-1 tv-focus rounded-lg">
                {isPlaying ? <Pause size={20} className="lg:w-6 lg:h-6" /> : <Play size={20} className="lg:w-6 lg:h-6" />}
              </button>
              <button onClick={toggleMute} className="hover:text-primary transition-colors p-1 tv-focus rounded-lg">
                {isMuted ? <VolumeX size={20} className="lg:w-6 lg:h-6" /> : <Volume2 size={20} className="lg:w-6 lg:h-6" />}
              </button>
              <span className="text-[10px] lg:text-sm font-mono opacity-80 truncate max-w-[100px] lg:max-w-none">
                {title || "Direct"}
              </span>
            </div>
            
            <div className="flex items-center gap-3 lg:gap-4">
              <button 
                onClick={() => setLowBandwidthMode(!lowBandwidthMode)} 
                className={cn(
                  "px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest transition-all tv-focus",
                  lowBandwidthMode ? "bg-primary text-black" : "bg-zinc-800 text-zinc-500"
                )}
                title={lowBandwidthMode ? "Désactiver le mode basse connexion" : "Activer le mode basse connexion"}
              >
                {lowBandwidthMode ? "Mode Stable" : "Mode Standard"}
              </button>
              <button className="hover:text-primary transition-colors p-1 tv-focus rounded-lg">
                <Settings size={18} className="lg:w-5 lg:h-5" />
              </button>
              <button onClick={toggleFullscreen} className="hover:text-primary transition-colors p-1 tv-focus rounded-lg">
                <Maximize size={18} className="lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
