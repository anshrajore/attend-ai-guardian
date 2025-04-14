
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { authenticate } from "@/lib/mockData";
import { toast } from "sonner";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
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
        const user = authenticate(email, password);
        
        if (user) {
          toast.success("Login successful", {
            description: `Welcome back, ${user.name}!`,
          });
          
          // For demo, redirect to dashboard
          navigate("/dashboard");
        } else {
          toast.error("Authentication failed", {
            description: "Please check your email and password.",
          });
        }
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
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-security-dark border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-security-primary"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-security-dark border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-security-primary"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-security-dark border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-security-primary"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div>
            <Button
              type="submit"
              className="w-full security-gradient"
              disabled={isLoading}
            >
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
