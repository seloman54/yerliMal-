import React, { useState } from 'react';
import { PiggyBank, Sprout, Store } from 'lucide-react';
import { Button } from './Button';

interface Props {
  totalScore: number;
  onRestart: () => void;
}

export const Level5Investment: React.FC<Props> = ({ totalScore, onRestart }) => {
  const [choice, setChoice] = useState<'kumbara' | 'agac' | 'kobi' | null>(null);

  const getResult = () => {
    switch(choice) {
        case 'kumbara':
            return {
                title: 'Tasarruf Ustası!',
                desc: 'Paranı kumbarada biriktirmeyi seçtin. Bu en güvenli yol. Zor zamanlar için her zaman hazırlıklısın!',
                bonus: Math.floor(totalScore * 0.1),
                icon: <PiggyBank className="w-24 h-24 text-pink-500" />
            };
        case 'agac':
            return {
                title: 'Doğa Dostu Yatırımcı!',
                desc: 'Geleceğe nefes oldun. Diktiğin ağaçlar büyüdükçe hem doğa kazanacak hem de meyve verecek.',
                bonus: Math.floor(totalScore * 0.3), // High bonus for nature
                icon: <Sprout className="w-24 h-24 text-green-600" />
            };
        case 'kobi':
            return {
                title: 'Yerli Ekonomi Kahramanı!',
                desc: 'Mahallendeki yerli üreticiye destek oldun. Paramız ülkemizde kaldı, ekonomi canlandı!',
                bonus: Math.floor(totalScore * 0.5), // Highest bonus for domestic support theme
                icon: <Store className="w-24 h-24 text-blue-600" />
            };
        default: return null;
    }
  };

  const result = getResult();
  const finalScore = totalScore + (result ? result.bonus : 0);

  if (choice && result) {
      return (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl overflow-y-auto">
              <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full my-auto">
                  <div className="flex justify-center mb-6">{result.icon}</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{result.title}</h2>
                  <p className="text-gray-600 mb-6">{result.desc}</p>
                  
                  <div className="bg-green-100 p-4 rounded-xl mb-6">
                      <p className="text-sm text-green-800 font-bold uppercase">Toplam Puan</p>
                      <p className="text-4xl font-bold text-green-600">{finalScore}</p>
                      <p className="text-xs text-green-600">+ {result.bonus} Yatırım Bonusu</p>
                  </div>

                  <div className="border-t pt-6">
                      <p className="font-bold text-amber-800 mb-2">Açmalar İlk ve Ortaokulu</p>
                      <p className="text-sm text-gray-500 mb-6">Tutum, Yatırım ve Yerli Malları Haftası Etkinliği Tamamlandı.</p>
                      <Button onClick={onRestart} variant="primary" className="w-full">
                          Tekrar Oyna
                      </Button>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="h-full flex flex-col bg-indigo-50 rounded-2xl p-6 overflow-y-auto">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-indigo-900">5. Bölüm: Büyük Karar</h2>
            <p className="text-indigo-700">Kazandığın {totalScore} puanı nasıl değerlendirmek istersin?</p>
            <p className="text-sm text-indigo-500 mt-2">Doğru yatırım geleceğini şekillendirir.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full flex-1 content-center">
            {/* Option 1 */}
            <button 
                onClick={() => setChoice('kumbara')}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all border-b-8 border-pink-200 group flex flex-col items-center h-full justify-center"
            >
                <div className="bg-pink-100 w-24 h-24 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <PiggyBank className="w-12 h-12 text-pink-500" />
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-2">Kumbaraya At</h3>
                <p className="text-sm text-gray-500">Paranı güvende tut. Damlaya damlaya göl olur.</p>
            </button>

            {/* Option 2 */}
            <button 
                onClick={() => setChoice('agac')}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all border-b-8 border-green-200 group flex flex-col items-center h-full justify-center"
            >
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Sprout className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-2">Fidan Dik</h3>
                <p className="text-sm text-gray-500">Doğaya yatırım yap. Geleceğin nefesi olsun.</p>
            </button>

            {/* Option 3 */}
            <button 
                onClick={() => setChoice('kobi')}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all border-b-8 border-blue-200 group flex flex-col items-center h-full justify-center"
            >
                <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Store className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-2">Yerli Esnafı Destekle</h3>
                <p className="text-sm text-gray-500">Mahallendeki üreticiden alışveriş yap. Ülke kazansın.</p>
            </button>
        </div>
    </div>
  );
};