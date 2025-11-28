import React, { useState, useCallback } from 'react';
import { GameHeader } from './components/GameHeader';
import { Level1FallingItems } from './components/Level1FallingItems';
import { Level2Shopping } from './components/Level2Shopping';
import { Level3Energy } from './components/Level3Energy';
import { Level4Factory } from './components/Level4Factory';
import { Level5Investment } from './components/Level5Investment';
import { Button } from './components/Button';
import { GamePhase } from './types';
import { Play, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>('welcome');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);

  const addScore = useCallback((amount: number) => {
    setScore(prev => prev + amount);
  }, []);

  const handleLevelComplete = useCallback((_levelScore: number) => {
    setPhase('transition');
  }, []);

  const nextLevel = useCallback(() => {
    if (level === 1) { setLevel(2); setPhase('level2'); }
    else if (level === 2) { setLevel(3); setPhase('level3'); }
    else if (level === 3) { setLevel(4); setPhase('level4'); }
    else if (level === 4) { setLevel(5); setPhase('level5'); }
  }, [level]);

  const restartGame = useCallback(() => {
    setScore(0);
    setLevel(1);
    setPhase('welcome');
  }, []);

  const renderContent = () => {
    switch(phase) {
      case 'welcome':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-8 animate-fade-in">
             <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg border-b-8 border-red-200">
               <div className="bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full inline-block mb-4">
                  12-18 Aralık
               </div>
               <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                 Açmalar İlk ve Ortaokulu
               </h1>
               <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-6">
                 Tutum, Yatırım ve Yerli Malları Haftası
               </h2>
               <p className="text-gray-600 mb-8 leading-relaxed">
                 Merhaba Kahraman! Türkiye'nin zenginliklerini keşfetmeye, yerli mallarımızı kullanmaya ve tasarruf etmeye hazır mısın?
               </p>
               <Button onClick={() => { setPhase('level1'); }} className="w-full text-xl py-4 flex items-center justify-center gap-2">
                 <Play className="fill-current" /> Oyuna Başla
               </Button>
             </div>
             
             <div className="flex gap-4 text-gray-400 text-sm">
                <span>🍎 Yerli Malı</span>
                <span>•</span>
                <span>💡 Tasarruf</span>
                <span>•</span>
                <span>📈 Yatırım</span>
             </div>
          </div>
        );
      case 'level1':
        return <Level1FallingItems onComplete={handleLevelComplete} addScore={addScore} />;
      case 'level2':
        return <Level2Shopping onComplete={handleLevelComplete} addScore={addScore} />;
      case 'level3':
        return <Level3Energy onComplete={handleLevelComplete} addScore={addScore} />;
      case 'level4':
        return <Level4Factory onComplete={handleLevelComplete} addScore={addScore} />;
      case 'level5':
        return <Level5Investment totalScore={score} onRestart={restartGame} />;
      case 'transition':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-blue-50/50 rounded-2xl">
             <div className="bg-white p-8 rounded-2xl shadow-xl">
               <h2 className="text-3xl font-bold text-green-600 mb-4">Harika Gidiyorsun!</h2>
               <p className="text-xl mb-6">Şu anki Puanın: <span className="font-bold text-blue-600">{score}</span></p>
               <Button onClick={nextLevel} className="flex items-center gap-2">
                 Sonraki Bölüm <ArrowRight />
               </Button>
             </div>
          </div>
        );
      default:
        return <div>Bilinmeyen Hata</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 flex flex-col">
      <GameHeader score={score} level={level} phase={phase} />
      
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 h-[calc(100vh-80px)]">
        <div className="bg-white w-full h-full rounded-3xl shadow-xl border-4 border-slate-200 overflow-hidden relative">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;