import { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Check,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onComplete?: () => void;
}

export function VideoPlayer({ videoUrl, title, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  // ✅ Dropdown playback speed options
  const speedOptions = [0.5, 1, 1.25, 1.5, 2];
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // ✅ prevents multiple onComplete calls
  const hasCompletedRef = useRef(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;

    setProgress((current / total) * 100);
    setCurrentTime(formatTime(current));

    // ✅ Trigger next lesson ONCE
    if (!hasCompletedRef.current && current >= total - 0.5) {
      hasCompletedRef.current = true;
      onComplete?.();
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;

    setDuration(formatTime(videoRef.current.duration));
    hasCompletedRef.current = false;

    // ✅ Apply selected speed on load
    videoRef.current.playbackRate = playbackSpeed;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;

    videoRef.current.currentTime = pos * videoRef.current.duration;
    hasCompletedRef.current = false;
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime += seconds;
    hasCompletedRef.current = false;
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  return (
    <div className="relative bg-black rounded-xl overflow-hidden group border border-white/10 shadow-lg">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full aspect-video"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
      />

      {/* ✅ Play overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition"
          >
            <Play size={36} fill="currentColor" className="ml-1" />
          </button>
        </div>
      )}

      {/* ✅ Controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent p-4 transition-opacity",
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        )}
      >
        {/* ✅ Progress bar */}
        <div
          className="h-1 bg-white/20 rounded-full cursor-pointer mb-4"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-white/70 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Left Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => skip(-10)}
              className="text-white/70 hover:text-white transition"
              title="Back 10s"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play
                  size={20}
                  fill="currentColor"
                  className="text-white ml-0.5"
                />
              )}
            </button>

            <button
              onClick={() => skip(10)}
              className="text-white/70 hover:text-white transition"
              title="Forward 10s"
            >
              <SkipForward size={20} />
            </button>

            <button
              onClick={toggleMute}
              className="text-white/70 hover:text-white transition ml-2"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <span className="text-sm text-white/70 ml-2">
              {currentTime} / {duration}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* ✅ Playback Speed Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/10 px-3"
                >
                  {playbackSpeed}x
                  <ChevronDown size={14} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-zinc-950 border border-white/10 text-white min-w-[130px]"
              >
                {speedOptions.map((speed) => (
                  <DropdownMenuItem
                    key={speed}
                    onClick={() => changeSpeed(speed)}
                    className={cn(
                      "cursor-pointer flex items-center justify-between hover:bg-white/10 focus:bg-white/10",
                      playbackSpeed === speed && "text-white font-semibold"
                    )}
                  >
                    <span>{speed}x</span>
                    {playbackSpeed === speed && (
                      <Check size={16} className="text-white" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={toggleFullscreen}
              className="text-white/70 hover:text-white transition"
              title="Fullscreen"
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
