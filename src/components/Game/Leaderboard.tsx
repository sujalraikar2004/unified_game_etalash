import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Player {
  username: string;
  fastestTime: number;
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/leaderboard')
      .then(res => {
        console.log('Leaderboard API response:', res.data);
        // Accept either an array or an object containing an array
        if (Array.isArray(res.data)) {
          setPlayers(res.data);
        } else if (Array.isArray(res.data.players)) {
          setPlayers(res.data.players);
        } else {
          setPlayers([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load leaderboard');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white">Loading leaderboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!players.length) return <div className="text-white">No leaderboard data available.</div>;

  return (
    <div className="bg-white/10 rounded-lg p-6 mt-8 shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-game-gold mb-4 text-center">Leaderboard (Fastest Time)</h2>
      <table className="w-full text-white">
        <thead>
          <tr>
            <th className="py-2">Rank</th>
            <th className="py-2">Player</th>
            <th className="py-2">Finishing Time</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, idx) => (
            <tr key={player.username} className="text-center">
              <td className="py-2">{idx + 1}</td>
              <td className="py-2">{player.username}</td>
              <td className="py-2 font-mono">{formatTime(player.fastestTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
