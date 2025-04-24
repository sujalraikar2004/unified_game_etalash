
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Mail } from 'lucide-react';

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

const LoginForm = ({ onSwitchToSignup }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await login(email, password);
    } catch (error) {
      // Error is already handled in the login function
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="game-card w-full max-w-md mx-auto animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-game-gold">Treasure Hunter Login</h2>
        <p className="text-white/70 mt-2">Enter your credentials to continue the adventure</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
        
        <Button 
          type="submit" 
          className="game-button w-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-white/70">
          Don't have an account?{' '}
          <button 
            onClick={onSwitchToSignup}
            className="text-game-gold hover:underline font-medium"
          >
            Sign up now
          </button>
        </p>
        
        <p className="text-xs text-white/50 mt-4">
          Demo login: demo@example.com / password
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
