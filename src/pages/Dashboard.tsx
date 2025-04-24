
import { useGame } from '@/contexts/GameContext';
import Header from '@/components/Layout/Header';
import RoomSelection from '@/components/Game/RoomSelection';
import GameRoom from '@/components/Game/GameRoom';

const Dashboard = () => {
  const { roomCode } = useGame();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8 px-4">
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
