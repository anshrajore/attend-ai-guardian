
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Camera, 
  LayoutDashboard, 
  Users, 
  FileSpreadsheet, 
  Settings, 
  LogOut, 
  Shield,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, isActive, onClick }: NavItemProps) => (
  <Link 
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
      isActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
    )}
    onClick={onClick}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </Link>
);

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const sidebarContent = (
    <div className={cn(
      "flex flex-col h-full bg-sidebar py-4",
      className
    )}>
      <div className="px-4 mb-6">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-security-primary" />
          <h1 className="text-xl font-bold text-security-primary">AttendAI</h1>
        </div>
      </div>
      
      <div className="space-y-1 px-2">
        <NavItem 
          to="/dashboard" 
          icon={<LayoutDashboard size={18} />} 
          label="Dashboard" 
          isActive={location.pathname === '/dashboard'} 
          onClick={closeSidebar}
        />
        <NavItem 
          to="/cameras" 
          icon={<Camera size={18} />} 
          label="Cameras" 
          isActive={location.pathname === '/cameras'} 
          onClick={closeSidebar}
        />
        <NavItem 
          to="/users" 
          icon={<Users size={18} />} 
          label="People" 
          isActive={location.pathname === '/users'} 
          onClick={closeSidebar}
        />
        <NavItem 
          to="/reports" 
          icon={<FileSpreadsheet size={18} />} 
          label="Reports" 
          isActive={location.pathname === '/reports'} 
          onClick={closeSidebar}
        />
        <NavItem 
          to="/settings" 
          icon={<Settings size={18} />} 
          label="Settings" 
          isActive={location.pathname === '/settings'} 
          onClick={closeSidebar}
        />
      </div>
      
      <div className="mt-auto px-2">
        <NavItem 
          to="/login" 
          icon={<LogOut size={18} />} 
          label="Logout" 
          isActive={false}
          onClick={closeSidebar}
        />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={closeSidebar} />
        )}

        <div className={cn(
          "fixed top-0 left-0 w-64 h-full z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="absolute top-4 right-4">
            <Button variant="ghost" size="icon" onClick={closeSidebar}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <div className="w-64 h-full border-r border-gray-800">
      {sidebarContent}
    </div>
  );
};

export default Sidebar;
