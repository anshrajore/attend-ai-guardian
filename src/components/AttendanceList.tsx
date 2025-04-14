
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Clock, UserCheck, Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { attendanceRecords } from "@/lib/mockData";
import { format } from "date-fns";

interface AttendanceListProps {
  className?: string;
}

const AttendanceList = ({ className }: AttendanceListProps) => {
  const [filter, setFilter] = useState<'all' | 'present' | 'late' | 'absent'>('all');
  const [showAll, setShowAll] = useState(false);
  
  const filteredRecords = attendanceRecords
    .filter(record => filter === 'all' || record.status === filter)
    .slice(0, showAll ? undefined : 8);
  
  return (
    <Card className={cn("security-card", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center">
            <FileSpreadsheet className="mr-2 h-5 w-5 text-security-primary" />
            Recent Attendance
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="h-4 w-4 mr-1" />
              <span className="sr-only sm:not-sr-only sm:inline">Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Download className="h-4 w-4 mr-1" />
              <span className="sr-only sm:not-sr-only sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          <Button 
            variant={filter === 'all' ? "default" : "ghost"} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'present' ? "default" : "ghost"} 
            size="sm"
            onClick={() => setFilter('present')}
            className={filter === 'present' ? 'bg-security-success hover:bg-security-success/90' : ''}
          >
            Present
          </Button>
          <Button 
            variant={filter === 'late' ? "default" : "ghost"} 
            size="sm"
            onClick={() => setFilter('late')}
            className={filter === 'late' ? 'bg-security-warning hover:bg-security-warning/90' : ''}
          >
            Late
          </Button>
          <Button 
            variant={filter === 'absent' ? "default" : "ghost"} 
            size="sm"
            onClick={() => setFilter('absent')}
            className={filter === 'absent' ? 'bg-security-danger hover:bg-security-danger/90' : ''}
          >
            Absent
          </Button>
        </div>
        
        <div className="divide-y divide-gray-800">
          {filteredRecords.length === 0 ? (
            <div className="py-6 text-center text-gray-500">
              No attendance records matching the selected filter
            </div>
          ) : (
            filteredRecords.map((record) => (
              <div key={record.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-security-dark-accent overflow-hidden mr-3">
                    {record.imageUrl ? (
                      <img src={record.imageUrl} alt={record.userName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-security-accent">
                        {record.userName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{record.userName}</div>
                    <div className="text-xs text-gray-400 flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {format(record.timestamp, 'MMM d, h:mm a')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className={cn(
                    "rounded-full capitalize",
                    record.status === 'present' && "border-security-success text-security-success",
                    record.status === 'late' && "border-security-warning text-security-warning",
                    record.status === 'absent' && "border-security-danger text-security-danger"
                  )}>
                    {record.status}
                  </Badge>
                  {record.verified && (
                    <div className="ml-2 text-security-success">
                      <UserCheck className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        
        {attendanceRecords.length > 8 && (
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              onClick={() => setShowAll(!showAll)}
              className="text-security-primary"
            >
              {showAll ? "Show Less" : "Show All"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceList;
