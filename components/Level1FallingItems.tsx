import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FallingItem } from '../types';
import { LEVEL1_GOOD_ITEMS, LEVEL1_BAD_ITEMS } from '../constants';

interface Props {
  onComplete: (score: number) => void;
  addScore: (amount: number) => void;
}

export const Level1FallingItems: React.FC<Props> = ({ onComplete, addScore }) => {
  const [items, setItems] = useState<FallingItem[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [localScore, setLocalScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs to access latest values inside useEffect without triggering re-runs
  const scoreRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const spawnItem = useCallback(() => {
    const isGood = Math.random() > 0.4; // 60% good items
    const type = isGood ? 'good' : 'bad';
    const list = isGood ? LEVEL1_GOOD_ITEMS : LEVEL1_BAD_ITEMS;
    const emoji = list[Math.floor(Math.random() * list.length)];

    const newItem: FallingItem = {
      id: Date.now() + Math.random(),
      type,
      emoji,
      x: Math.random() * 80 + 10,
      speed: Math.random() * 0.5 + 0.5,
    };

    setItems(prev => [...prev, newItem]);
  }, []);

  const handleItemClick = (id: number, type: 'good' | 'bad') => {
    setItems(prev => prev.filter(item => item.id !== id));
    
    if (type === 'good') {
      addScore(10);
      setLocalScore(s => s + 10);
      scoreRef.current += 10;
    } else {
      addScore(-5);
      setLocalScore(s => Math.max(0, s - 5));
      scoreRef.current = Math.max(0, scoreRef.current - 5);
    }
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying) return;

    const spawnInterval = setInterval(() => {
      spawnItem();
    }, 800);

    const timerInterval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsPlaying(false);
          clearInterval(spawnInterval);
          clearInterval(timerInterval);
          onCompleteRef.current(scoreRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(timerInterval);
    };
  }, [isPlaying, spawnItem]); // Depend ONLY on isPlaying and stable spawnItem

  const startGame = () => setIsPlaying(true);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden bg-sky-100 rounded-2xl shadow-inner border-4 border-sky-300">
      {!isPlaying && timeLeft === 30 && (
         <div className="absolute inset-0 bg-black/60 z-30 flex flex-col items-center justify-center p-6 text-center text-white backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">1. Bölüm: Yerli Malı Toplama</h2>
            <p className="mb-8 text-lg md:text-xl max-w-md">Yukarıdan düşen <strong>YERLİ</strong> ürünlere tıkla! Yabancı ürünlerden kaçın.</p>
            <button 
              onClick={startGame} 
              className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-10 py-4 rounded-2xl text-2xl font-bold shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              BAŞLA!
            </button>
         </div>
      )}

      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between z-20 pointer-events-none">
        <div className="bg-white/90 px-6 py-2 rounded-full font-bold text-sky-800 shadow-lg border border-sky-200 backdrop-blur-sm">
          ⏱️ {timeLeft} sn
        </div>
        <div className="bg-white/90 px-6 py-2 rounded-full font-bold text-sky-800 shadow-lg border border-sky-200 backdrop-blur-sm">
          ⭐ {localScore}
        </div>
      </div>

      {/* Game Area */}
      <div className="w-full h-full relative" ref={containerRef}>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={(e) => {
              e.stopPropagation(); 
              handleItemClick(item.id, item.type);
            }}
            className="absolute cursor-pointer select-none text-5xl md:text-6xl hover:scale-110 active:scale-90 transition-transform z-10 touch-manipulation"
            style={{
              left: `${item.x}%`,
              top: '-10%', 
              animation: `fall ${3 / item.speed}s linear forwards`,
            }}
            onAnimationEnd={() => setItems(prev => prev.filter(i => i.id !== item.id))}
          >
            {item.emoji}
          </div>
        ))}
      </div>
    </div>
  );
};