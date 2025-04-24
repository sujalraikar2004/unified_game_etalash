
import { Trophy } from 'lucide-react';

const GameLogo = () => {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 bg-game-gold rounded-full flex items-center justify-center mr-2 animate-pulse-glow">
        <Trophy size={24} className="text-game-dark" />
      </div>
      <div>
        <h1 className="font-bold text-xl text-white">Quest Chronicles</h1>
        <span className="text-xs text-game-gold">Treasure Hunt</span>
      </div>
    </div>
  );
};

export default GameLogo;
