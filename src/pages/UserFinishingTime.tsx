import { useEffect, useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';

function formatTime(seconds: number | undefined) {
  if (typeof seconds !== 'number' || isNaN(seconds)) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const UserFinishingTime = () => {
  const { roomCode } = useGame();
  const { user } = useAuth();
  const [finishingTime, setFinishingTime] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!user) return;
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        let players = Array.isArray(data) ? data : data.players;
        if (!Array.isArray(players)) return;
        const current = players.find((p: any) => p.username === user.username);
        setFinishingTime(current?.fastestTime);
      })
      .catch(() => setFinishingTime(undefined));
  }, [user, roomCode]);

  if (!user) return null;
  return (
    <div className="mt-2 text-center text-white/80">
      <span className="font-semibold">Your Finishing Time: </span>
      <span className="font-mono">{formatTime(finishingTime)}</span>
    </div>
  );
};

export default UserFinishingTime;
