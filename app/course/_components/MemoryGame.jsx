import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, X } from 'lucide-react';
import Card from './Card';

const CARDS = [
  '🌟', '🌙', '🌍', '🌈',
  '🦋', '🌺', '🍀', '🎨'
].flatMap(emoji => [emoji, emoji]);

const MemoryGame = ({ setShowMemoryGame }) => {
  const [cards, setCards] = useState(() => 
    CARDS.sort(() => Math.random() - 0.5).map((content, index) => ({
      id: index,
      content,
      isFlipped: false,
      isMatched: false
    }))
  );
  
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      setMoves(prev => prev + 1);
      
      if (cards[first].content === cards[second].content) {
        setCards(prev => prev.map((card, index) => 
          index === first || index === second
            ? { ...card, isMatched: true }
            : card
        ));
        setScore(prev => prev + 1);
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, index) => 
            index === first || index === second
              ? { ...card, isFlipped: false }
              : card
          ));
          setSelectedCards([]);
        }, 1000);
      }
    }
  }, [selectedCards, cards]);

  useEffect(() => {
    if (score === CARDS.length / 2) {
      setIsGameComplete(true);
    }
  }, [score]);

  const handleCardClick = (index) => {
    if (
      selectedCards.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) return;

    setCards(prev => prev.map((card, i) => 
      i === index ? { ...card, isFlipped: true } : card
    ));
    
    setSelectedCards(prev => [...prev, index]);
  };

  const resetGame = () => {
    setCards(CARDS.sort(() => Math.random() - 0.5).map((content, index) => ({
      id: index,
      content,
      isFlipped: false,
      isMatched: false
    })));
    setSelectedCards([]);
    setScore(0);
    setMoves(0);
    setIsGameComplete(false);
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl h-[87vh] w-[400px] relative">
      <button
        onClick={() => setShowMemoryGame(false)}
        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full flex items-center justify-center"
        aria-label="Close game"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Memory Match
        </h1>
        <div className="flex justify-center gap-6 text-gray-600 text-sm mt-1">
          <p>Score: {score}</p>
          <p>Moves: {moves}</p>
        </div>
      </div>

      {!isGameComplete && <div className="grid grid-cols-4 gap-2 mb-4 h-[calc(87vh-160px)]">
        {cards.map((card, index) => (
          <Card 
            key={card.id}
            card={card}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>}

      {isGameComplete ? (
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-xl font-bold text-green-600 mb-2">
            <Trophy className="w-5 h-5" />
            Congratulations!
          </div>
          <p className="text-gray-600 text-sm mb-3">
            You completed the game in {moves} moves!
          </p>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
          >
            Play Again
          </button>
        </div>
      ) : (
        <button
          onClick={resetGame}
          className="w-full mt-2 bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-300 transition-colors"
        >
          Reset Game
        </button>
      )}
    </div>
  );
};

export default MemoryGame;