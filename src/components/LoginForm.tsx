import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, User, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isRegistering) {
        // In a real app, we would call an API to register the user
        // For this demo, just show success and switch to login
        toast.success("Registration successful", {
          description: `Welcome, ${name}! You can now log in.`,
        });
        setIsRegistering(false);
      } else {
        // Accept any credentials and navigate to dashboard
        toast.success("Login successful", {
          description: `Welcome to the dashboard!`,
        });
        
        // Redirect to dashboard without authentication
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(isRegistering ? "Registration failed" : "Login failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    // Reset form fields when switching modes
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-security-primary/10 flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-security-primary" />
        </div>
        <h1 className="text-2xl font-bold text-white">AttendAI Guardian</h1>
        <p className="text-gray-400 mt-1">Smart Face Recognition System</p>
      </div>
      
      <div className="security-card">
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-4 w-4 text-gray-500" />
                </div>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-security-dark border-gray-700 focus:ring-security-primary"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-security-dark border-gray-700 focus:ring-security-primary"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-security-dark border-gray-700 focus:ring-security-primary"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          
          <div>
            <Button
              type="submit"
              className="w-full security-gradient gap-2"
              disabled={isLoading}
            >
              <LogIn className="h-4 w-4" />
              {isLoading ? (isRegistering ? "Registering..." : "Signing in...") : (isRegistering ? "Register" : "Sign In")}
            </Button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={toggleMode} 
            className="text-security-primary hover:text-security-primary/80 text-sm font-medium transition-colors"
          >
            {isRegistering ? "Already have an account? Sign In" : "Don't have an account? Register"}
          </button>
        </div>
        
        {!isRegistering && (
          <div className="mt-6 pt-4 border-t border-gray-800">
            <p className="text-center text-sm text-gray-400">
              Demo credentials: <br />
              <code className="text-xs bg-gray-800 px-1 py-0.5 rounded">admin@example.com / admin123</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
