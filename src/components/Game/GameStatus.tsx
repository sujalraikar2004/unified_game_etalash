
import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { User, Circle } from 'lucide-react';

const GameStatus = () => {
  const { players, isGameActive, checkAllReady } = useGame();
  
  // Display different statuses based on player state
  const getPlayerStatus = (isReady: boolean) => {
    if (isGameActive) {
      return <span className="text-green-500">Playing</span>;
    }
    
    return isReady ? 
      <span className="text-green-500">Ready</span> : 
      <span className="text-yellow-500">Not Ready</span>;
  };

  // Calculate and display how many players are ready
  const getReadyCount = () => {
    const readyCount = players.filter(player => player.isReady).length;
    return `${readyCount}/${players.length} players ready`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <User className="text-game-gold mr-2" size={20} />
          <h3 className="text-lg font-semibold text-white">Players Status</h3>
        </div>
        <span className="text-sm text-white/70">{getReadyCount()}</span>
      </div>
      
      <div className="space-y-2">
        {players.map((player) => (
          <div key={player.id} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
            <div className="flex items-center">
              <Circle className={`w-2 h-2 ${player.isReady ? 'text-green-500' : 'text-yellow-500'} mr-2`} size={8} />
              <span>{player.username}</span>
            </div>
            {getPlayerStatus(player.isReady)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameStatus;
