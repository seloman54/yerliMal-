import React, { useState, useEffect, useRef } from 'react';
import { FactoryItem } from '../types';
import { FACTORY_GOOD_ITEMS, FACTORY_BAD_ITEMS } from '../constants';
import { Trash2 } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
  addScore: (amount: number) => void;
}

export const Level4Factory: React.FC<Props> = ({ onComplete, addScore }) => {
  const [items, setItems] = useState<(FactoryItem & { x: number })[]>([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(25);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Refs for stable access in loop
  const scoreRef = useRef(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const startGame = () => setIsPlaying(true);

  // Game Loop
  useEffect(() => {
    if (!isPlaying) return;
    
    const spawnInterval = setInterval(() => {
       const isCorrect = Math.random() > 0.4;
       const list = isCorrect ? FACTORY_GOOD_ITEMS : FACTORY_BAD_ITEMS;
       const emoji = list[Math.floor(Math.random() * list.length)];
       
       setItems(prev => [
           ...prev,
           {
               id: Date.now(),
               type: isCorrect ? 'correct' : 'wrong',
               emoji,
               processed: false,
               x: 100 // Start at right (100%)
           }
       ]);
    }, 1200);

    const timer = setInterval(() => {
        setTime(t => {
            if (t <= 1) {
                setIsPlaying(false);
                clearInterval(spawnInterval);
                clearInterval(timer);
                onCompleteRef.current(scoreRef.current);
                return 0;
            }
            return t - 1;
        });
    }, 1000);

    // Movement Loop
    const moveInterval = setInterval(() => {
        setItems(prev => {
            return prev
              .map(item => ({ ...item, x: item.x - 1.5 })) // Move left by 1.5%
              .filter(item => item.x > -10); // Remove if off screen
        });
    }, 30);

    return () => {
        clearInterval(spawnInterval);
        clearInterval(timer);
        clearInterval(moveInterval);
    };
  }, [isPlaying]); // No score or item dependency

  const handleItemClick = (id: number, type: 'correct' | 'wrong') => {
      if (type === 'wrong') {
          addScore(15);
          setScore(s => s + 15);
          scoreRef.current += 15;
          setItems(prev => prev.filter(i => i.id !== id));
      } else {
          addScore(-10);
          setScore(s => Math.max(0, s - 10));
          scoreRef.current = Math.max(0, scoreRef.current - 10);
      }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100 rounded-2xl overflow-hidden relative border-4 border-gray-300">
       {!isPlaying && time === 25 && (
         <div className="absolute inset-0 bg-black/70 z-30 flex flex-col items-center justify-center p-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">4. Bölüm: Mini Fabrika</h2>
            <p className="mb-6 text-lg">Banttan <strong>YANLIŞ</strong> veya YABANCI maddeleri tıkla ve yok et! Elma ve süt gibi yerli ürünlere DOKUNMA.</p>
            <button onClick={startGame} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg animate-pulse">
              Fabrikayı Çalıştır
            </button>
         </div>
      )}

      <div className="bg-gray-800 text-white p-4 flex justify-between items-center z-10 shadow-lg">
          <div>
              <h3 className="font-bold text-lg">Yerli Üretim Hattı</h3>
              <p className="text-xs text-gray-400">Yabancı/Hatalı ürünleri tıkla!</p>
          </div>
          <div className="bg-gray-700 px-4 py-2 rounded font-mono">
              {time}sn
          </div>
      </div>

      {/* Factory Floor */}
      <div className="flex-1 relative bg-gray-200 flex flex-col justify-center items-center overflow-hidden">
           {/* Background decor */}
           <div className="absolute inset-0 opacity-10 pointer-events-none grid grid-cols-6 gap-4 p-4">
               {Array.from({length: 24}).map((_, i) => (
                   <div key={i} className="bg-black rounded h-full w-full"></div>
               ))}
           </div>

           {/* Conveyor Belt */}
           <div className="w-full h-32 bg-slate-700 relative flex items-center shadow-2xl border-y-8 border-slate-600">
               {/* Moving track pattern */}
               <div className="absolute inset-0 flex animate-slide-left opacity-30">
                   {Array.from({length: 20}).map((_, i) => (
                       <div key={i} className="w-20 h-full border-r-4 border-slate-900"></div>
                   ))}
               </div>

               {items.map(item => (
                   <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id, item.type)}
                        className={`absolute top-1/2 -translate-y-1/2 text-6xl hover:scale-110 active:scale-90 transition-transform cursor-pointer z-20`}
                        style={{ left: `${item.x}%` }}
                   >
                       {item.emoji}
                   </button>
               ))}
           </div>

           {/* Trash Bin Area (Visual only, since we click to delete) */}
           <div className="mt-8 flex flex-col items-center text-red-500 opacity-50">
                <Trash2 className="w-16 h-16" />
                <span className="font-bold">Hatalıları Buraya Tıkla</span>
           </div>
      </div>
    </div>
  );
};