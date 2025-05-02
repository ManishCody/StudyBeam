import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const Card= ({ card, onClick }) => {
  return (
    <motion.div
      className="aspect-square cursor-pointer h-full"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <AnimatePresence initial={false}>
          <motion.div
            className={`absolute w-full h-full rounded-lg ${
              card.isFlipped || card.isMatched
                ? 'bg-gradient-to-br from-violet-500 to-indigo-500 text-white'
                : 'bg-gray-300'
            } flex items-center justify-center text-2xl transform transition-all duration-300`}
            initial={false}
            animate={{
              rotateY: card.isFlipped || card.isMatched ? 180 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {(card.isFlipped || card.isMatched) && (
              <span className="transform rotate-180">{card.content}</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Card;