
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import useFaceDetection, { Face } from "@/hooks/useFaceDetection";
import { Camera, User, UserCheck, AlertTriangle, Shield } from "lucide-react";
import { users } from "@/lib/mockData";
import { toast } from "sonner";

interface FaceDetectionProps {
  className?: string;
}

const FaceDetection = ({ className }: FaceDetectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeTab, setActiveTab] = useState("detection");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [recognizedPeople, setRecognizedPeople] = useState<string[]>([]);

  const { faces, isLoading } = useFaceDetection({
    videoElement: videoRef,
    onFaceDetected: handleFaceDetected
  });

  function handleFaceDetected(faces: Face[]) {
    // Simulate recognition by randomly recognizing existing users
    if (faces.length > 0 && Math.random() > 0.7) {
      const randomUserIndex = Math.floor(Math.random() * users.length);
      const randomUser = users[randomUserIndex];
      
      if (!recognizedPeople.includes(randomUser.id)) {
        setRecognizedPeople(prev => [...prev, randomUser.id]);
        
        toast(`${randomUser.name} recognized`, {
          description: "Attendance marked successfully",
          icon: <UserCheck className="h-4 w-4 text-green-500" />,
        });
      }
    }
  }

  const startEnrollment = () => {
    setIsEnrolling(true);
    
    // Simulate enrollment process with a timer
    setTimeout(() => {
      setIsEnrolling(false);
      toast("Enrollment complete", {
        description: "New user has been enrolled successfully",
      });
    }, 3000);
  };

  return (
    <Card className={cn("security-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Shield className="mr-2 h-5 w-5 text-security-primary" />
          Face Recognition System
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="detection">Live Detection</TabsTrigger>
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="detection" className="space-y-4">
            <div className="video-container h-48">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                muted 
                className="w-full h-full object-cover"
              />
              
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
                />
              ))}
              
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                  <div className="text-white">Loading...</div>
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <User className="mr-1 h-4 w-4" />
                Recognition Status:
              </h4>
              
              <div className="grid grid-cols-1 gap-2">
                {faces.length === 0 ? (
                  <div className="text-sm text-gray-400 flex items-center">
                    <Camera className="mr-1 h-4 w-4" />
                    Waiting for faces...
                  </div>
                ) : (
                  <div className="text-sm text-security-primary flex items-center">
                    <UserCheck className="mr-1 h-4 w-4" />
                    {faces.length} face{faces.length !== 1 ? 's' : ''} detected
                  </div>
                )}
                
                {recognizedPeople.length > 0 && (
                  <div className="text-sm text-security-success flex items-center">
                    <UserCheck className="mr-1 h-4 w-4" />
                    {recognizedPeople.length} person{recognizedPeople.length !== 1 ? 's' : ''} recognized
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="enrollment" className="space-y-4">
            <div className="video-container h-48">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                muted 
                className="w-full h-full object-cover"
              />
              
              {isEnrolling && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-security-primary mb-2"></div>
                  <div className="text-white text-sm">Processing...</div>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="bg-security-dark border border-gray-700 rounded-md w-full p-2 text-sm"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label htmlFor="id" className="block text-sm font-medium mb-1">
                    ID
                  </label>
                  <input
                    id="id"
                    type="text"
                    className="bg-security-dark border border-gray-700 rounded-md w-full p-2 text-sm"
                    placeholder="Enter ID"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Position face clearly in frame
                </div>
                <Button 
                  className="security-gradient"
                  disabled={isEnrolling}
                  onClick={startEnrollment}
                >
                  {isEnrolling ? "Enrolling..." : "Enroll Face"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FaceDetection;
