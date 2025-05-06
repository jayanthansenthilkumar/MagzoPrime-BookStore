import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from './ui/button';
import { LogOut } from 'lucide-react';
import { setCurrentUser } from '../data/users';
import { toast } from 'sonner';

interface LogoutButtonProps extends ButtonProps {
  showIcon?: boolean;
  redirectTo?: string;
}

const LogoutButton = ({ 
  showIcon = true, 
  redirectTo = '/',
  children,
  ...props 
}: LogoutButtonProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    toast.success('Logged out successfully');
    navigate(redirectTo);
  };

  return (
    <Button onClick={handleLogout} {...props}>
      {showIcon && <LogOut className="mr-2 h-4 w-4" />}
      {children || 'Logout'}
    </Button>
  );
};

export default LogoutButton;
