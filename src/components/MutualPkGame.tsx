import React from 'react';
import { Swords, Lock, Sparkles, Smartphone, ArrowRight, Clock } from 'lucide-react';

interface MutualPkGameProps {
  onGoToSinglePlayer?: () => void;
}

export const MutualPkGame: React.FC<MutualPkGameProps> = ({ onGoToSinglePlayer }) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900/95 p-6 md:p-8 rounded-3xl border border-rose-500/30 shadow-2xl flex flex-col items-center text-center gap-6 relative overflow-hidden my-4">
      {/* Background Aura */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />

      {/* Header Badge */}
      <div className="inline-flex items-center gap-2 p-3 bg-rose-500/10 rounded-2xl border border-rose-500/30 text-rose-400">
        <Swords className="w-8 h-8" />
        <Lock className="w-5 h-5 text-amber-400" />
      </div>

      <div>
        <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 uppercase tracking-widest inline-flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> 未來待更新 (Coming Soon)
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-3 tracking-tight">
          1v1 互相出題 PK 戰
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
          此模式專為手機客群開發中，目前正在進行行動端體驗與連線優化！
        </p>
      </div>

      {/* Feature Teaser Cards */}
      <div className="w-full bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-col gap-3.5 text-left text-xs">
        <h3 className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" /> 預告玩法亮點 (Preview)
        </h3>

        <div className="flex items-start gap-3 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/60">
          <Smartphone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white text-xs">自動讀取手機實體電量</h4>
            <p className="text-slate-400 text-[11px] mt-0.5">
              出題時系統將自動擷取您當前手機真正的電池 % 數作為秘密答案！
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800/60">
          <Swords className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white text-xs">極簡出題 ⚔️ 攻守對調</h4>
            <p className="text-slate-400 text-[11px] mt-0.5">
              出題者只需要寫下荒謬情境題目（例：「猜猜我手機剛打完遊戲剩幾 %？」），傳給對手猜測，揭曉後輪流攻防！
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      {onGoToSinglePlayer && (
        <button
          onClick={onGoToSinglePlayer}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-base shadow-lg shadow-emerald-500/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
        >
          <span>先玩經典速刷 (數學/荒謬題)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
