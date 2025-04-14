
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { users } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
  title?: string;
}

const Header = ({ className, title = "Dashboard" }: HeaderProps) => {
  const admin = users.find(user => user.role === "admin");
  
  return (
    <header className={cn("flex items-center justify-between py-4 px-6 bg-security-dark-accent border-b border-gray-800", className)}>
      <h1 className="text-xl font-medium">{title}</h1>
      
      <div className="flex items-center">
        <div className="relative mr-4 hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 bg-security-dark border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-security-primary w-56"
          />
        </div>
        
        <div className="relative mr-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full bg-security-primary">
            2
          </Badge>
        </div>
        
        <div className="flex items-center">
          <div className="hidden sm:block mr-2 text-right">
            <div className="text-sm font-medium">{admin?.name || "Admin User"}</div>
            <div className="text-xs text-gray-400">Administrator</div>
          </div>
          <div className="h-8 w-8 rounded-full overflow-hidden">
            {admin?.avatar ? (
              <img src={admin.avatar} alt={admin.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-security-primary">
                {admin?.name.charAt(0) || "A"}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
