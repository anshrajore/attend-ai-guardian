
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // This simulates a redirect from the index page to the login page
    // In a real app, we might check if the user is already authenticated
    navigate("/login");
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
};

export default Index;
