
import { useEffect, useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import Header from '@/components/Layout/Header';
import RoomSelection from '@/components/Game/RoomSelection';
import GameRoom from '@/components/Game/GameRoom';

const Dashboard = () => {
  const { roomCode, socket } = useGame();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (socket) {
      const handleConnect = () => {
        setIsConnected(true);
      };

      const handleDisconnect = () => {
        setIsConnected(false);
      };

      socket.on('connect', handleConnect);
      socket.on('disconnect', handleDisconnect);
      
      // Initial connection state
      setIsConnected(socket.connected);

      return () => {
        socket.off('connect', handleConnect);
        socket.off('disconnect', handleDisconnect);
      };
    }
  }, [socket]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        {socket && (
          <div className={`fixed top-16 right-4 flex items-center ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
            <div className={`w-2 h-2 rounded-full mr-1 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs">{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        )}
        
        <div className="max-w-2xl mx-auto">
          {roomCode ? <GameRoom /> : <RoomSelection />}
        </div>
      </main>
      
      <footer className="py-4 px-4 text-center text-white/40 text-sm">
        <p>Quest Chronicles Treasure Hunt &copy; 2025</p>
      </footer>
    </div>
  );
};

export default Dashboard;
