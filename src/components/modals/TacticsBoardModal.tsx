import React, { useState } from 'react';

interface TacticsBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TacticsBoardModal: React.FC<TacticsBoardModalProps> = ({ isOpen, onClose }) => {
  const [defStyle, setDefStyle] = useState('Balanced');
  const [defWidth, setDefWidth] = useState(48);
  const [defDepth, setDefDepth] = useState(72);
  const [buildUp, setBuildUp] = useState('Direct Passing');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-2xl bg-[#101419] border border-white/10 p-5 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col font-label">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d9ef26]">tune</span>
            <h3 className="font-headline text-lg font-black italic uppercase text-white tracking-wide">
              MANAGER TACTICS BOARD
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#181c21] text-white/70 hover:text-white flex items-center justify-center transition active:scale-90 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="py-4 space-y-4">
          {/* Defense style */}
          <div>
            <label className="text-xs uppercase font-bold text-[#94a3b8] mb-1.5 block">
              DEFENSIVE APPROACH
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {['Drop Back', 'Balanced', 'Constant Press'].map((s) => (
                <button
                  key={s}
                  onClick={() => setDefStyle(s)}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer ${
                    defStyle === s
                      ? 'bg-[#d9ef26] text-[#0a0f13] shadow-[0_0_10px_rgba(217,239,38,0.4)]'
                      : 'bg-[#181c21] text-white/70 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Depth slider */}
          <div>
            <div className="flex justify-between text-xs text-white mb-1">
              <span className="text-[#94a3b8]">DEFENSIVE LINE DEPTH</span>
              <span className="text-[#d9ef26] font-bold">{defDepth}</span>
            </div>
            <input
              type="range"
              min="20"
              max="95"
              value={defDepth}
              onChange={(e) => setDefDepth(Number(e.target.value))}
              className="w-full accent-[#d9ef26] cursor-pointer"
            />
          </div>

          {/* Width slider */}
          <div>
            <div className="flex justify-between text-xs text-white mb-1">
              <span className="text-[#94a3b8]">FIELD WIDTH</span>
              <span className="text-[#00eefc] font-bold">{defWidth}</span>
            </div>
            <input
              type="range"
              min="20"
              max="90"
              value={defWidth}
              onChange={(e) => setDefWidth(Number(e.target.value))}
              className="w-full accent-[#00eefc] cursor-pointer"
            />
          </div>

          {/* Build up play */}
          <div>
            <label className="text-xs uppercase font-bold text-[#94a3b8] mb-1.5 block">
              CHANCE CREATION
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {['Possession', 'Direct Passing', 'Forward Runs'].map((b) => (
                <button
                  key={b}
                  onClick={() => setBuildUp(b)}
                  className={`py-1.5 px-2 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer ${
                    buildUp === b
                      ? 'bg-[#00eefc] text-[#0a0f13] shadow-[0_0_10px_rgba(0,238,252,0.4)]'
                      : 'bg-[#181c21] text-white/70 hover:text-white'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {saved ? (
          <div className="py-2.5 rounded-xl bg-[#00e676] text-[#0a0f13] font-headline text-center font-black italic uppercase tracking-wider">
            TACTICS SYNCHRONIZED
          </div>
        ) : (
          <button
            onClick={handleSave}
            className="w-full py-3 rounded-xl bg-[#d9ef26] text-[#0a0f13] font-headline text-sm font-black italic uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-[0_0_15px_rgba(217,239,38,0.4)] cursor-pointer"
          >
            APPLY TO FIRST TEAM
          </button>
        )}
      </div>
    </div>
  );
};
