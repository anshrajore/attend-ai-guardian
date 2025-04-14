
import { useRef, useState, useEffect } from "react";
import useFaceDetection, { Face } from "@/hooks/useFaceDetection";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Maximize, Minimize, Video, VideoOff } from "lucide-react";

interface VideoFeedProps {
  className?: string;
  cameraName?: string;
  location?: string;
}

const VideoFeed = ({ className, cameraName = "Main Camera", location = "Entrance" }: VideoFeedProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  
  const { faces, isLoading, error } = useFaceDetection({
    videoElement: videoRef,
    enabled: isActive
  });

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const videoContainer = document.getElementById("video-container");
      if (videoContainer) {
        if (videoContainer.requestFullscreen) {
          videoContainer.requestFullscreen();
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleCamera = () => {
    setIsActive(!isActive);
    
    if (videoRef.current?.srcObject && !isActive) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className={cn("security-card", className)}>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="font-medium text-lg flex items-center">
            <Camera className="mr-2 h-5 w-5 text-security-primary" /> 
            {cameraName}
          </h3>
          <p className="text-sm text-gray-400">{location}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleCamera}
          >
            {isActive ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4 text-security-danger" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <div id="video-container" className="video-container">
        {isActive ? (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline
              muted 
              className="w-full h-full object-cover"
            />
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                <div className="text-white">Loading camera...</div>
              </div>
            )}
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                <div className="text-security-danger">{error}</div>
              </div>
            )}
            
            {/* Face detection boxes */}
            {faces.map((face, index) => (
              <div 
                key={index}
                className="detection-box" 
                style={{
                  left: `${face.x}px`,
                  top: `${face.y}px`,
                  width: `${face.width}px`,
                  height: `${face.height}px`
                }}
              >
                <div className="absolute -top-5 left-0 bg-security-primary text-white text-xs px-1 rounded">
                  Person {index + 1} {face.confidence ? `(${Math.round(face.confidence * 100)}%)` : ''}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
            <CameraOff size={48} className="text-gray-500 mb-2" />
            <div className="text-gray-400">Camera is off</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoFeed;
