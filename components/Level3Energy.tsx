import React, { useState, useEffect } from 'react';
import { RoomItem } from '../types';
import { Lightbulb, Droplets, Tv, Zap, CheckCircle2 } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
  addScore: (amount: number) => void;
}

const INITIAL_ITEMS: RoomItem[] = [
  { id: 1, name: 'Mutfak Işığı', isOn: true, type: 'light', room: 'Mutfak' },
  { id: 2, name: 'Musluk', isOn: true, type: 'water', room: 'Mutfak' },
  { id: 3, name: 'Salon TV', isOn: true, type: 'device', room: 'Salon' },
  { id: 4, name: 'Salon Lambası', isOn: true, type: 'light', room: 'Salon' },
  { id: 5, name: 'Banyo Suyu', isOn: true, type: 'water', room: 'Banyo' },
  { id: 6, name: 'Banyo Işığı', isOn: false, type: 'light', room: 'Banyo' }, // Already off
  { id: 7, name: 'Oda Bilgisayarı', isOn: true, type: 'device', room: 'Oda' },
  { id: 8, name: 'Oda Lambası', isOn: true, type: 'light', room: 'Oda' },
];

export const Level3Energy: React.FC<Props> = ({ onComplete, addScore }) => {
  const [items, setItems] = useState<RoomItem[]>(INITIAL_ITEMS);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameOver, setGameOver] = useState(false);

  // Check if all waste is gone
  const wastedCount = items.filter(i => i.isOn).length;

  const handleToggle = (id: number) => {
    if (gameOver) return;
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        if(item.isOn) {
            // Turning off is good
            addScore(10);
        }
        return { ...item, isOn: !item.isOn };
      }
      return item;
    }));
  };

  useEffect(() => {
    if (wastedCount === 0 && !gameOver) {
      setGameOver(true);
      setTimeout(() => onComplete(50 + timeLeft * 2), 1500); // Bonus for time
    }
  }, [wastedCount, gameOver, onComplete, timeLeft]);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          onComplete(0); // Failed to save all
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  const renderIcon = (type: string, isOn: boolean) => {
    const colorClass = isOn ? (type === 'water' ? 'text-blue-500' : 'text-yellow-500 animate-pulse') : 'text-gray-300';
    if (type === 'light') return <Lightbulb className={`w-12 h-12 ${colorClass}`} fill={isOn ? "currentColor" : "none"} />;
    if (type === 'water') return <Droplets className={`w-12 h-12 ${colorClass}`} fill={isOn ? "currentColor" : "none"} />;
    if (type === 'device') return <Tv className={`w-12 h-12 ${colorClass}`} />;
    return <Zap className="w-12 h-12" />;
  };

  return (
    <div className="h-full flex flex-col bg-slate-800 rounded-2xl p-4 overflow-hidden relative">
      <div className="bg-slate-700 p-4 rounded-xl text-white flex justify-between items-center mb-4">
        <div>
           <h2 className="font-bold text-xl">3. Bölüm: Enerji Tasarrufu</h2>
           <p className="text-slate-300 text-sm">Gereksiz yananları kapat!</p>
        </div>
        <div className="flex gap-4">
             <div className="bg-slate-900 px-4 py-2 rounded-lg text-red-400 font-mono font-bold text-xl">
               00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </div>
        </div>
      </div>

      {wastedCount === 0 && (
          <div className="absolute inset-0 z-20 bg-green-500/90 flex flex-col items-center justify-center text-white animate-fade-in">
              <CheckCircle2 className="w-24 h-24 mb-4" />
              <h2 className="text-4xl font-bold">Harika!</h2>
              <p>Ev şimdi çok daha tasarruflu.</p>
          </div>
      )}

      <div className="grid grid-cols-2 gap-4 flex-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleToggle(item.id)}
            disabled={!item.isOn && !gameOver} // Can't turn back on for game logic simplicity
            className={`rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300
              ${item.isOn ? 'bg-slate-600 hover:bg-slate-500 shadow-[0_0_15px_rgba(255,255,0,0.3)]' : 'bg-slate-900 opacity-60'}
            `}
          >
            <div className="mb-2">{renderIcon(item.type, item.isOn)}</div>
            <div className={`font-bold ${item.isOn ? 'text-white' : 'text-gray-500'}`}>
                {item.room} {item.type === 'light' ? 'Işığı' : item.type === 'water' ? 'Suyu' : 'Cihazı'}
            </div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                {item.isOn ? 'AÇIK (KAPAT!)' : 'KAPALI'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};