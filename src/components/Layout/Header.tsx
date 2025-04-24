
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import GameLogo from './GameLogo';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/5 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto py-4 px-4 flex justify-between items-center">
        <GameLogo />
        
        {user && (
          <div className="flex items-center">
            <div className="mr-6 hidden md:block">
              <div className="text-white/70 text-sm">Logged in as</div>
              <div className="font-medium text-white flex items-center">
                <User size={14} className="mr-1 text-game-gold" />
                {user.username}
              </div>
            </div>
            
            <Button 
              onClick={logout}
              variant="ghost" 
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <LogOut size={18} className="mr-2" />
              <span>Logout</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
