import React from 'react';
import { Trophy, Star } from 'lucide-react';

interface GameHeaderProps {
  score: number;
  level: number;
  phase: string;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ score, level, phase }) => {
  if (phase === 'welcome') return null;

  return (
    <div className="w-full bg-red-600 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="text-center md:text-left">
          <h1 className="text-lg md:text-xl font-bold">Açmalar İlk ve Ortaokulu</h1>
          <p className="text-xs md:text-sm text-red-100">Tutum, Yatırım ve Yerli Malları Haftası</p>
        </div>
        
        <div className="flex items-center gap-4 bg-red-800 px-4 py-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">Level {level}/5</span>
          </div>
          <div className="w-px h-6 bg-red-600"></div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-xl">{score} Puan</span>
          </div>
        </div>
      </div>
    </div>
  );
};