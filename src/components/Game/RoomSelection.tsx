
import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Map, Plus, Search } from 'lucide-react';

const RoomSelection = () => {
  const [joinCode, setJoinCode] = useState('');
  const { createRoom, joinRoom } = useGame();

  const handleCreateRoom = () => {
    createRoom();
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!joinCode) return;
    joinRoom(joinCode);
  };

  return (
    <div className="game-card animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-game-gold">Treasure Hunt</h2>
        <p className="text-white/70 mt-2">Create or join a game room to start your adventure</p>
      </div>

      <div className="grid gap-6 mb-8">
        <div className="text-center p-6 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
          <div className="mx-auto w-16 h-16 bg-game-primary rounded-full flex items-center justify-center mb-4">
            <Plus size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Create a New Room</h3>
          <p className="text-white/70 mb-4">Start a new treasure hunt and invite friends</p>
          <Button onClick={handleCreateRoom} className="game-button">
            Create Room
          </Button>
        </div>

        <div className="p-6 border border-white/10 rounded-lg bg-white/5">
          <div className="mx-auto w-16 h-16 bg-game-secondary rounded-full flex items-center justify-center mb-4">
            <Map size={32} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Join Existing Room</h3>
          <p className="text-white/70 mb-4">Enter a room code to join an existing hunt</p>
          
          <form onSubmit={handleJoinRoom} className="flex gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-game-primary" size={18} />
              <Input
                placeholder="Enter room code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                className="pl-10 bg-white/10 border-white/20 text-white"
              />
            </div>
            <Button type="submit" className="game-button">
              Join
            </Button>
          </form>
        </div>
      </div>

      <div className="text-center text-white/50 text-sm">
        <p>Ready for an adventure? Create a room to be the host, or join with a code.</p>
      </div>
    </div>
  );
};

export default RoomSelection;
