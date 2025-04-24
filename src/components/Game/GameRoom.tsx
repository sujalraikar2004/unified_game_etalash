
import React, { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import QuestionDisplay from './QuestionDisplay';
import GameTimer from './GameTimer';
import GameStatus from './GameStatus';
import { Check, Copy, Trophy, Users } from 'lucide-react';
import { toast } from "sonner";

const GameRoom = () => {
  const { 
    roomCode, 
    isGameActive, 
    gameStartCountdown, 
    startGame, 
    readyUp,
    players,
    currentQuestionIndex,
    questions,
    gameElapsedTime,
    endGame,
    socket
  } = useGame();
  
  const { user } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  // Connect to the room when component mounts
  useEffect(() => {
    if (socket && roomCode && user) {
      // Emit join room event with user details
      socket.emit('joinRoom', {
        roomCode,
        user: {
          id: user.id,
          username: user.username,
          isReady: false
        }
      });
    }
  }, [socket, roomCode, user]);

  const copyRoomCode = () => {
    if (!roomCode) return;
    
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    toast.success("Room code copied to clipboard!");
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReadyUp = () => {
    if (!user?.id) return;
    
    setIsReady(true);
    readyUp(user.id);
  };

  const handleGameComplete = () => {
    endGame();
    setShowResults(true);
  };

  // Current game state UI
  if (showResults) {
    return (
      <div className="game-card animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <Trophy className="text-game-gold mr-2" size={32} />
          <h2 className="text-3xl font-bold text-white">Hunt Results</h2>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70">Total Time:</span>
            <span className="text-white font-bold">{gameElapsedTime} seconds</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">Questions Completed:</span>
            <span className="text-white font-bold">{currentQuestionIndex} / {questions.length}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-game-gold mb-4">Leaderboard</h3>
        
        <div className="space-y-3 mb-6">
          {/* Display actual player results ordered by completion time */}
          {players
            .sort((a, b) => (a.completionTime || 999) - (b.completionTime || 999))
            .map((player, index) => (
              <div 
                key={player.id}
                className={`${index === 0 ? 'bg-game-gold/20 border border-game-gold' : 'bg-white/10'} p-3 rounded-lg flex justify-between items-center`}
              >
                <div className="flex items-center">
                  <span 
                    className={`${index === 0 ? 'bg-game-gold text-game-dark' : 'bg-white/20'} w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2`}
                  >
                    {index + 1}
                  </span>
                  <span className="font-semibold">{player.username} {player.id === user?.id ? '(You)' : ''}</span>
                </div>
                <span>{player.score} points</span>
              </div>
            ))}
        </div>
        
        <Button 
          onClick={() => window.location.reload()} 
          className="game-button w-full"
        >
          Play Again
        </Button>
      </div>
    );
  }

  if (isGameActive) {
    return (
      <div className="game-container">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Treasure Hunt</h2>
            <p className="text-white/70">Question {currentQuestionIndex + 1} of {questions.length}</p>
          </div>
          <GameTimer />
        </div>
        
        <QuestionDisplay onComplete={handleGameComplete} />
      </div>
    );
  }

  if (gameStartCountdown < 10) {
    return (
      <div className="game-card text-center py-12 animate-fade-in">
        <h2 className="text-4xl font-bold text-game-gold mb-8">Game Starting In</h2>
        <div className="text-6xl font-bold text-white animate-pulse-glow mb-8">
          {gameStartCountdown}
        </div>
        <p className="text-white/70">Get ready to find the treasure!</p>
      </div>
    );
  }

  return (
    <div className="game-card animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Game Room</h2>
        <div className="flex items-center mt-4 md:mt-0">
          <div className="bg-white/10 rounded-lg px-3 py-1 flex items-center">
            <span className="text-white/70 mr-2">Room Code:</span>
            <span className="font-mono font-bold text-game-gold">{roomCode}</span>
            <button 
              onClick={copyRoomCode} 
              className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Copy room code"
            >
              {copied ? (
                <Check className="text-green-500" size={16} />
              ) : (
                <Copy className="text-white/70" size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 rounded-lg p-4 mb-6">
        <GameStatus />
      </div>
      
      <div className="flex flex-col items-center">
        <Button 
          onClick={handleReadyUp} 
          className={`game-button w-full ${isReady ? 'bg-green-600 hover:bg-green-700' : ''}`} 
          disabled={isReady}
        >
          {isReady ? 'Ready!' : 'Ready Up'}
        </Button>
        
        <p className="text-white/60 text-sm mt-4 text-center">
          Waiting for all players to be ready. The game will start automatically once everyone is ready.
        </p>
      </div>
    </div>
  );
};

export default GameRoom;
