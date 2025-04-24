
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const [animate, setAnimate] = useState(false);
  
  // Start animation after component mounts
  useEffect(() => {
    setAnimate(true);
  }, []);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="relative flex-grow flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-game-primary opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-game-accent opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-game-gold opacity-10 rounded-full blur-3xl"></div>
        </div>
        
        <div className={`relative z-10 text-center transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mx-auto mb-8 w-28 h-28 bg-game-gold rounded-full flex items-center justify-center animate-treasure-bounce">
            <Trophy size={56} className="text-game-dark" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Quest <span className="text-game-gold">Chronicles</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-lg mx-auto">
            The ultimate treasure hunt game. Solve riddles, beat the clock, claim your victory.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="game-button text-lg py-6 px-10" 
              onClick={() => window.location.href = '/auth'}
              size="lg"
            >
              Start Your Adventure
            </Button>
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className={`relative z-10 mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 transition-all duration-1000 delay-300 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="game-card text-center">
            <div className="w-14 h-14 bg-game-secondary rounded-full mx-auto flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Challenging Riddles</h3>
            <p className="text-white/60">Solve brain-teasing riddles that will test your wit and knowledge</p>
          </div>
          
          <div className="game-card text-center">
            <div className="w-14 h-14 bg-game-primary rounded-full mx-auto flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Race Against Time</h3>
            <p className="text-white/60">Every second counts as you compete to be the fastest treasure hunter</p>
          </div>
          
          <div className="game-card text-center">
            <div className="w-14 h-14 bg-game-accent rounded-full mx-auto flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Compete & Win</h3>
            <p className="text-white/60">Battle with friends to claim the top spot on the leaderboard</p>
          </div>
        </div>
      </div>
      
      <footer className="relative z-10 py-6 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white/50">&copy; 2025 Quest Chronicles Treasure Hunt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
