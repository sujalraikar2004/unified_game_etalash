
import { useEffect, useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Clock } from 'lucide-react';

const GameTimer = () => {
  const { gameElapsedTime, isGameActive } = useGame();
  const [formattedTime, setFormattedTime] = useState('00:00');

  useEffect(() => {
    if (!isGameActive) return;
    
    const minutes = Math.floor(gameElapsedTime / 60);
    const seconds = gameElapsedTime % 60;
    
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    setFormattedTime(`${formattedMinutes}:${formattedSeconds}`);
  }, [gameElapsedTime, isGameActive]);

  return (
    <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center animate-pulse-glow">
      <Clock className="text-game-gold mr-2" size={20} />
      <span className="font-mono text-xl font-bold text-white">{formattedTime}</span>
    </div>
  );
};

export default GameTimer;
