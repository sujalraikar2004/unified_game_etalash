
import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Flag, HelpCircle } from 'lucide-react';
import { toast } from "sonner";

interface QuestionDisplayProps {
  onComplete: () => void;
}

const QuestionDisplay = ({ onComplete }: QuestionDisplayProps) => {
  const { activeQuestion, submitAnswer, currentQuestionIndex, questions } = useGame();
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!activeQuestion) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!answer.trim()) {
      toast.error("Please enter an answer");
      return;
    }
    
    setIsSubmitting(true);
    
    // Small delay to create suspense
    setTimeout(() => {
      const isCorrect = submitAnswer(answer);
      setAnswer('');
      setIsSubmitting(false);
      
      // Check if this was the last question
      if (isCorrect && currentQuestionIndex >= questions.length - 1) {
        onComplete();
      }
    }, 1000);
  };
  
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="question-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-shrink-0 w-12 h-12 bg-game-primary rounded-full flex items-center justify-center">
          <HelpCircle size={24} className="text-white" />
        </div>
        <div>
          <span className="block text-sm text-white/60">Riddle {currentQuestionIndex + 1}</span>
          <span className="block text-lg font-medium text-white">{activeQuestion.points} points</span>
        </div>
      </div>
      
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
        <p className="text-xl font-medium text-white leading-relaxed">
          {activeQuestion.text}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Enter your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="bg-white/10 border-white/20 text-white text-lg py-6"
          disabled={isSubmitting}
        />
        
        <Button
          type="submit"
          className="game-button w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Checking..."
          ) : isLastQuestion ? (
            <span className="flex items-center gap-2">
              <Flag size={18} />
              Claim Final Treasure
            </span>
          ) : (
            "Submit Answer"
          )}
        </Button>
      </form>
    </div>
  );
};

export default QuestionDisplay;
