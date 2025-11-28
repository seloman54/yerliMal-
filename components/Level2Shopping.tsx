import React, { useState } from 'react';
import { ShoppingItem } from '../types';
import { SHOPPING_ITEMS } from '../constants';
import { ShoppingCart, Wallet } from 'lucide-react';
import { Button } from './Button';

interface Props {
  onComplete: (score: number) => void;
  addScore: (amount: number) => void;
}

export const Level2Shopping: React.FC<Props> = ({ onComplete, addScore }) => {
  const [cart, setCart] = useState<ShoppingItem[]>([]);
  const [budget] = useState(25);
  const [isFinished, setIsFinished] = useState(false);

  const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);
  const remainingBudget = budget - cartTotal;

  const toggleItem = (item: ShoppingItem) => {
    if (cart.find(i => i.id === item.id)) {
      setCart(prev => prev.filter(i => i.id !== item.id));
    } else {
      if (remainingBudget >= item.price) {
        setCart(prev => [...prev, item]);
      } else {
        alert("Paran yetmiyor! Başka bir ürün çıkar.");
      }
    }
  };

  const finishShopping = () => {
    setIsFinished(true);
    let levelScore = 0;
    let correctCount = 0;

    cart.forEach(item => {
      if (item.isDomestic) {
        levelScore += 20;
        correctCount++;
      } else {
        levelScore -= 10;
      }
    });

    // Bonus for using most of the budget wisely
    if (remainingBudget < 5) levelScore += 10;

    addScore(Math.max(0, levelScore));
    
    setTimeout(() => {
        onComplete(Math.max(0, levelScore));
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-amber-50 rounded-2xl p-4 overflow-y-auto">
       {isFinished ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl font-bold text-green-600 mb-4">Alışveriş Tamamlandı!</h2>
              <p className="text-lg text-gray-700">Kasanın başına geldin ve ödemeyi yaptın.</p>
              <div className="text-4xl mt-4">🛒 ✅</div>
          </div>
       ) : (
           <>
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md mb-6 sticky top-0 z-10 border-b-2 border-amber-200">
                <div className="flex items-center gap-2 text-green-700">
                    <Wallet className="w-8 h-8" />
                    <div>
                        <p className="text-xs font-bold text-gray-500">BÜTÇEN</p>
                        <p className="text-2xl font-bold">{remainingBudget} TL</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-blue-700">
                    <ShoppingCart className="w-8 h-8" />
                    <div>
                        <p className="text-xs font-bold text-gray-500">SEPET</p>
                        <p className="text-2xl font-bold">{cartTotal} TL</p>
                    </div>
                </div>
            </div>

            <div className="mb-4 text-center">
                <h2 className="text-xl font-bold text-amber-800">2. Bölüm: Tutumlu Alışveriş</h2>
                <p className="text-sm text-gray-600">Bütçeni aşmadan <strong>YERLİ</strong> ve sağlıklı ürünleri sepete at!</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                {SHOPPING_ITEMS.map((item) => {
                const inCart = !!cart.find(i => i.id === item.id);
                return (
                    <button
                    key={item.id}
                    onClick={() => toggleItem(item)}
                    className={`relative p-4 rounded-xl border-4 transition-all flex flex-col items-center justify-between h-40
                        ${inCart 
                        ? 'bg-green-100 border-green-500 shadow-inner' 
                        : 'bg-white border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1'
                        } ${remainingBudget < item.price && !inCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={remainingBudget < item.price && !inCart}
                    >
                        <div className="text-4xl mb-2">{item.emoji}</div>
                        <div className="text-center">
                            <div className="font-bold text-sm leading-tight mb-1">{item.name}</div>
                            <div className="text-lg font-bold text-amber-600">{item.price} TL</div>
                        </div>
                        {inCart && <div className="absolute top-2 right-2 text-green-600">✅</div>}
                    </button>
                );
                })}
            </div>

            <div className="mt-6 flex justify-center pb-4">
                <Button 
                    onClick={finishShopping} 
                    disabled={cart.length === 0}
                    className="w-full md:w-1/2 py-4 text-xl"
                >
                    Alışverişi Tamamla
                </Button>
            </div>
           </>
       )}
    </div>
  );
};