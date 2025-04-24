
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/Auth/LoginForm';
import SignupForm from '@/components/Auth/SignupForm';
import GameLogo from '@/components/Layout/GameLogo';
import { Trophy } from 'lucide-react';

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-game-primary opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-game-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-game-gold opacity-10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md mx-auto mb-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-game-gold rounded-full flex items-center justify-center animate-float">
            <Trophy size={40} className="text-game-dark" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2">Quest Chronicles</h1>
        <p className="text-xl text-game-gold font-medium mb-1">Treasure Hunt</p>
        <p className="text-white/60">Solve riddles. Find treasures. Beat the clock.</p>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        {isLoginMode ? (
          <LoginForm onSwitchToSignup={() => setIsLoginMode(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setIsLoginMode(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
