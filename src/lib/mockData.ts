
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
  email: string;
  password: string; // In a real app, we would never store plain text passwords
  avatar?: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  timestamp: Date;
  status: 'present' | 'late' | 'absent';
  verified: boolean;
  imageUrl?: string;
}

export interface CameraDevice {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  lastActive: Date;
}

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    role: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  {
    id: '2',
    name: 'John Doe',
    role: 'user',
    email: 'john@example.com',
    password: 'user123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
  },
  {
    id: '3',
    name: 'Jane Smith',
    role: 'user',
    email: 'jane@example.com',
    password: 'user123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane'
  },
  {
    id: '4',
    name: 'Robert Johnson',
    role: 'user',
    email: 'robert@example.com',
    password: 'user123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=robert'
  },
  {
    id: '5',
    name: 'Emily Davis',
    role: 'user',
    email: 'emily@example.com',
    password: 'user123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily'
  }
];

// Mock attendance records
export const generateAttendanceRecords = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  
  // Generate records for the last 7 days
  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    
    // For each user except admin
    users.filter(user => user.role !== 'admin').forEach(user => {
      // Random status weighted towards present
      const statusRandom = Math.random();
      let status: 'present' | 'late' | 'absent' = 'present';
      
      if (statusRandom > 0.8) {
        status = 'absent';
      } else if (statusRandom > 0.6) {
        status = 'late';
      }
      
      // Create morning entry time (around 9 AM)
      const morningTime = new Date(day);
      morningTime.setHours(9);
      morningTime.setMinutes(Math.floor(Math.random() * 30));
      
      records.push({
        id: `${user.id}-${i}-1`,
        userId: user.id,
        userName: user.name,
        timestamp: morningTime,
        status,
        verified: Math.random() > 0.1, // 90% verification rate
        imageUrl: user.avatar
      });
      
      // Create evening exit time (around 5 PM) if not absent
      if (status !== 'absent') {
        const eveningTime = new Date(day);
        eveningTime.setHours(17);
        eveningTime.setMinutes(Math.floor(Math.random() * 60));
        
        records.push({
          id: `${user.id}-${i}-2`,
          userId: user.id,
          userName: user.name,
          timestamp: eveningTime,
          status: 'present',
          verified: Math.random() > 0.1,
          imageUrl: user.avatar
        });
      }
    });
  }
  
  return records.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const attendanceRecords = generateAttendanceRecords();

// Mock camera devices
export const cameraDevices: CameraDevice[] = [
  {
    id: 'cam-1',
    name: 'Main Entrance',
    location: 'Building A',
    status: 'online',
    lastActive: new Date()
  },
  {
    id: 'cam-2',
    name: 'Lobby',
    location: 'Building A',
    status: 'online',
    lastActive: new Date()
  },
  {
    id: 'cam-3',
    name: 'Side Entrance',
    location: 'Building B',
    status: 'warning',
    lastActive: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  },
  {
    id: 'cam-4',
    name: 'Back Door',
    location: 'Building B',
    status: 'offline',
    lastActive: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
  }
];

// Function to simulate authentication
export const authenticate = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};
