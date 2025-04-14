
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import VideoFeed from "./VideoFeed";
import AttendanceList from "./AttendanceList";
import FaceDetection from "./FaceDetection";
import { attendanceRecords, cameraDevices } from "@/lib/mockData";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  colorClass?: string;
}

const StatCard = ({ title, value, icon, description, trend, colorClass = "text-security-primary" }: StatCardProps) => (
  <Card className="security-card">
    <CardContent className="p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className={cn("text-2xl font-bold mt-1", colorClass)}>{value}</p>
          {description && (
            <p className="text-xs mt-1 text-gray-400">{description}</p>
          )}
        </div>
        <div className={cn("h-12 w-12 rounded-full flex items-center justify-center", colorClass)}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

interface DashboardProps {
  className?: string;
}

const Dashboard = ({ className }: DashboardProps) => {
  // Calculate stats from attendance records
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayRecords = attendanceRecords.filter(record => {
    const recordDate = new Date(record.timestamp);
    recordDate.setHours(0, 0, 0, 0);
    return recordDate.getTime() === today.getTime();
  });
  
  const presentToday = new Set(todayRecords
    .filter(record => record.status === 'present')
    .map(record => record.userId)).size;

  const lateToday = new Set(todayRecords
    .filter(record => record.status === 'late')
    .map(record => record.userId)).size;

  const absentToday = 4 - (presentToday + lateToday); // Assuming 4 total expected users
  
  const onlineCameras = cameraDevices.filter(device => device.status === 'online').length;
  
  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Present Today" 
          value={presentToday}
          icon={<CheckCircle className="h-6 w-6" />}
          description="On time attendance"
          colorClass="text-security-success"
        />
        <StatCard 
          title="Late Today" 
          value={lateToday}
          icon={<Clock className="h-6 w-6" />}
          description="Arrived late"
          colorClass="text-security-warning"
        />
        <StatCard 
          title="Absent Today" 
          value={absentToday}
          icon={<Users className="h-6 w-6" />}
          description="No show"
          colorClass="text-security-danger"
        />
        <StatCard 
          title="Active Cameras" 
          value={`${onlineCameras}/${cameraDevices.length}`}
          icon={<AlertTriangle className="h-6 w-6" />}
          description={`${cameraDevices.length - onlineCameras} offline`}
          colorClass="text-security-primary"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VideoFeed />
        </div>
        <div>
          <FaceDetection />
        </div>
      </div>
      
      <div>
        <AttendanceList />
      </div>
    </div>
  );
};

export default Dashboard;
