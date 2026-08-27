import React, { useState } from 'react';
import { Question } from '../types/game';
import { BatteryGauge } from './BatteryGauge';
import { PlusCircle, Trash2, Play, Download, Upload, Check } from 'lucide-react';

interface CustomCreatorProps {
  customQuestions: Question[];
  onAddQuestion: (q: Question) => void;
  onDeleteQuestion: (id: string) => void;
  onImportDeck: (questions: Question[]) => void;
  onPlayCustom: () => void;
}

export const CustomCreator: React.FC<CustomCreatorProps> = ({
  customQuestions,
  onAddQuestion,
  onDeleteQuestion,
  onImportDeck,
  onPlayCustom
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [officialBattery, setOfficialBattery] = useState(50);
  const [explanation, setExplanation] = useState('');
  const [emoji, setEmoji] = useState('🔋');
  const [importJson, setImportJson] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newQ: Question = {
      id: `custom_${Date.now()}`,
      title: title.trim(),
      officialBattery,
      explanation: explanation.trim() || '出題者的直覺答案！',
      category: 'custom',
      emoji: emoji || '🔋'
    };

    onAddQuestion(newQ);
    setTitle('');
    setExplanation('');
    setOfficialBattery(50);
    setIsModalOpen(false);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(customQuestions, null, 2);
    navigator.clipboard.writeText(dataStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        onImportDeck(parsed);
        setImportJson('');
        alert(`成功匯入 ${parsed.length} 道自訂題目！`);
      } else {
        alert('無效的 JSON 題庫格式！');
      }
    } catch {
      alert('解析 JSON 失敗，請檢查格式！');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/95 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <PlusCircle className="w-7 h-7 text-rose-400" />
            <span>自訂荒謬出題器</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            出考題考朋友！生活中的任何人事物都可以變成電量題目！
          </p>
        </div>

        <div className="flex items-center gap-2">
          {customQuestions.length > 0 && (
            <button
              onClick={onPlayCustom}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs shadow-md shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center gap-1.5"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>開玩自訂題庫 ({customQuestions.length})</span>
            </button>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-extrabold text-xs shadow-md shadow-rose-500/20 hover:scale-[1.02] transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>新建題目</span>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          目前已建立的題目 ({customQuestions.length})
        </h3>

        {customQuestions.length === 0 ? (
          <div className="text-center py-10 bg-slate-950/60 rounded-2xl border border-dashed border-slate-800 text-slate-500 text-xs">
            還沒有建立任何自訂題目喔！點擊右上角「新建題目」開始發揮創意！
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
            {customQuestions.map((q) => (
              <div
                key={q.id}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span className="text-xl">{q.emoji}</span>
                  <div className="truncate">
                    <h4 className="font-bold text-slate-200 truncate">{q.title}</h4>
                    <span className="text-[11px] text-slate-400">答案：{q.officialBattery}%</span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteQuestion(q.id)}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="刪除題目"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Export / Import Deck Section */}
      <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          📦 題庫分享與匯入
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleExport}
            disabled={customQuestions.length === 0}
            className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
            <span>{copied ? '題庫 JSON 已複製！' : '匯出自訂題庫 JSON'}</span>
          </button>

          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="貼上題庫 JSON 代碼..."
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
            />
            <button
              onClick={handleImport}
              className="py-2 px-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1 shrink-0"
            >
              <Upload className="w-4 h-4" />
              <span>匯入</span>
            </button>
          </div>
        </div>
      </div>

      {/* New Question Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl flex flex-col gap-5">
            <h3 className="text-xl font-black text-white">建立新的荒謬電量題目</h3>

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">
                  題目名稱 (例如：「我今天上完五堂課還剩多少電？」)
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="輸入題目..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">
                  設定官方正確電量 (0% ~ 100%)
                </label>
                <BatteryGauge value={officialBattery} label="官方答案" size="sm" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={officialBattery}
                  onChange={(e) => setOfficialBattery(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500 mt-2"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">
                  荒謬官方解說 (可選)
                </label>
                <textarea
                  rows={2}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="說明為什麼是這個數字..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">
                  代表圖示 Emoji
                </label>
                <input
                  type="text"
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value)}
                  className="w-20 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-center text-xl text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-xs shadow-md shadow-rose-500/20"
                >
                  確認建立
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
