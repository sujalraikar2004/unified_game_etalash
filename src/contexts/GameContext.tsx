
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from "sonner";

interface Question {
  id: number;
  text: string;
  answer: string;
  points: number;
}

interface Player {
  id: string;
  username: string;
  score: number;
  completionTime?: number;
}

interface GameContextType {
  isGameActive: boolean;
  activeQuestion: Question | null;
  currentQuestionIndex: number;
  players: Player[];
  timeRemaining: number;
  gameStartCountdown: number;
  gameElapsedTime: number;
  roomCode: string | null;
  questions: Question[];
  
  startGame: () => void;
  joinRoom: (code: string) => void;
  createRoom: () => void;
  submitAnswer: (answer: string) => boolean;
  endGame: () => void;
  resetGame: () => void;
  readyUp: (playerId: string) => void;
  leaveRoom: () => void;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    text: "What has a golden key but no locks?",
    answer: "treasure",
    points: 100
  },
  {
    id: 2,
    text: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: "echo",
    points: 150
  },
  {
    id: 3,
    text: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    answer: "map",
    points: 200
  },
  {
    id: 4,
    text: "The more you take, the more you leave behind. What are they?",
    answer: "footsteps",
    points: 120
  },
  {
    id: 5,
    text: "I'm light as a feather, but even the strongest person can't hold me for more than a few minutes. What am I?",
    answer: "breath",
    points: 180
  },
  {
    id: 6,
    text: "What has many keys but can't open a single lock?",
    answer: "piano",
    points: 150
  },
  {
    id: 7,
    text: "What gets wet while drying?",
    answer: "towel",
    points: 100
  },
  {
    id: 8,
    text: "What goes up but never comes down?",
    answer: "age",
    points: 120
  },
  {
    id: 9,
    text: "If you drop me, I'm sure to crack. Give me a smile, and I'll smile back. What am I?",
    answer: "mirror",
    points: 180
  },
  {
    id: 10,
    text: "What treasure do pirates value most?",
    answer: "gold",
    points: 200
  }
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [gameStartCountdown, setGameStartCountdown] = useState(10);
  const [gameElapsedTime, setGameElapsedTime] = useState(0);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [questions] = useState<Question[]>(initialQuestions);
  const [readyPlayers, setReadyPlayers] = useState<Set<string>>(new Set());

  // In a real implementation, this would use WebSockets for real-time communication
  
  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createRoom = () => {
    const code = generateRoomCode();
    setRoomCode(code);
    toast.success(`Room created! Code: ${code}`);
    return code;
  };

  const joinRoom = (code: string) => {
    // In a real app, this would verify the room exists
    setRoomCode(code);
    // Add current player to the room
    toast.success("Joined room successfully!");
  };

  const startGame = () => {
    // Start countdown
    let countdown = 10;
    setGameStartCountdown(countdown);
    
    const countdownInterval = setInterval(() => {
      countdown -= 1;
      setGameStartCountdown(countdown);
      
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        
        // Start the actual game
        setIsGameActive(true);
        setActiveQuestion(questions[0]);
        
        // Start game timer
        const gameTimer = setInterval(() => {
          setGameElapsedTime(prevTime => prevTime + 1);
        }, 1000);
        
        // Cleanup function would clear this interval
        return () => clearInterval(gameTimer);
      }
    }, 1000);
  };

  const submitAnswer = (answer: string): boolean => {
    if (!activeQuestion) return false;
    
    const isCorrect = answer.toLowerCase().trim() === activeQuestion.answer.toLowerCase().trim();
    
    if (isCorrect) {
      // Move to next question
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      if (nextIndex < questions.length) {
        setActiveQuestion(questions[nextIndex]);
        toast.success("Correct! Moving to next question");
      } else {
        // Game completed
        toast.success("You've completed all questions!");
        endGame();
      }
    } else {
      toast.error("Incorrect answer. Try again!");
    }
    
    return isCorrect;
  };

  const endGame = () => {
    setIsGameActive(false);
    
    // Calculate final scores
    // In a real implementation, this would involve server-side validation
    
    // For now, just mock a random completion time for demo players
    const updatedPlayers = players.map(player => ({
      ...player,
      completionTime: gameElapsedTime + Math.floor(Math.random() * 60)
    }));
    
    setPlayers(updatedPlayers);
    toast.success("Game completed! Check the leaderboard");
  };

  const resetGame = () => {
    setIsGameActive(false);
    setActiveQuestion(null);
    setCurrentQuestionIndex(0);
    setGameElapsedTime(0);
    setGameStartCountdown(10);
    setReadyPlayers(new Set());
  };

  const readyUp = (playerId: string) => {
    const updatedReadyPlayers = new Set(readyPlayers);
    updatedReadyPlayers.add(playerId);
    setReadyPlayers(updatedReadyPlayers);
    
    toast.info("You're ready to play!");
    
    // If all players are ready, start the countdown automatically
    if (updatedReadyPlayers.size === players.length && players.length > 0) {
      startGame();
    }
  };

  const leaveRoom = () => {
    setRoomCode(null);
    resetGame();
    toast.info("You've left the room");
  };

  return (
    <GameContext.Provider
      value={{
        isGameActive,
        activeQuestion,
        currentQuestionIndex,
        players,
        timeRemaining,
        gameStartCountdown,
        gameElapsedTime,
        roomCode,
        questions,
        startGame,
        joinRoom,
        createRoom,
        submitAnswer,
        endGame,
        resetGame,
        readyUp,
        leaveRoom,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
