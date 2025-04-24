
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Mail, User } from 'lucide-react';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm = ({ onSwitchToLogin }: SignupFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { signup, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !email || !password) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await signup(username, email, password);
    } catch (error) {
      // Error is already handled in the signup function
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="game-card w-full max-w-md mx-auto animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-game-gold">Join the Hunt</h2>
        <p className="text-white/70 mt-2">Create your account to start the adventure</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-game-primary" size={18} />
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white"
          />
        </div>
        
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-game-primary" size={18} />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white"
          />
        </div>
        
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-game-primary" size={18} />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white"
          />
        </div>
        
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-game-primary" size={18} />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white"
          />
        </div>
        
        <Button 
          type="submit" 
          className="game-button w-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-white/70">
          Already have an account?{' '}
          <button 
            onClick={onSwitchToLogin}
            className="text-game-gold hover:underline font-medium"
          >
            Login instead
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
