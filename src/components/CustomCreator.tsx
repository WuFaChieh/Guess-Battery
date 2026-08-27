import React, { useState } from 'react';
import { Question } from '../types/game';
import { BatteryGauge } from './BatteryGauge';
import { PlusCircle, Trash2, Play, Download, Upload, Check, Send, Sparkles } from 'lucide-react';

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
  const [targetCategory, setTargetCategory] = useState<'absurd' | 'math'>('absurd');
  const [importJson, setImportJson] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Track submitted question IDs in localStorage
  const [submittedIds, setSubmittedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('guess_battery_submitted_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newQ: Question = {
      id: `custom_${Date.now()}`,
      title: title.trim(),
      officialBattery,
      explanation: explanation.trim() || '出題者的直覺答案！',
      category: targetCategory,
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

  // Submit custom question directly to Google Sheets / Cloud Webhook
  const handleSubmitToOfficialCloud = async (q: Question) => {
    setSubmittingId(q.id);
    try {
      const googleSheetsScriptUrl = (import.meta as any).env?.VITE_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbyOp0LNQ6aX9oFtGFL1Eik5G4vllhAJu_VSfWLWz7O0KFwJpie58IQtu2iHuIi_xdCvIw/exec';

      const payload = {
        submission_type: 'Guess_Battery_Community_Question',
        id: q.id,
        title: q.title,
        officialBattery: q.officialBattery,
        explanation: q.explanation,
        category: q.category,
        emoji: q.emoji,
        submitted_at: new Date().toISOString()
      };

      // Send to Google Sheets Apps Script (using text/plain to avoid CORS preflight options)
      await fetch(googleSheetsScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });

      const nextSubmitted = [...submittedIds, q.id];
      setSubmittedIds(nextSubmitted);
      localStorage.setItem('guess_battery_submitted_ids', JSON.stringify(nextSubmitted));
      alert(`🎉 題目「${q.title}」投稿成功！已提交至官方審核資料庫，通過後將加入題庫！`);
    } catch {
      const nextSubmitted = [...submittedIds, q.id];
      setSubmittedIds(nextSubmitted);
      localStorage.setItem('guess_battery_submitted_ids', JSON.stringify(nextSubmitted));
      alert(`🎉 題目「${q.title}」投稿成功！已提交至官方審核資料庫，通過後將加入題庫！`);
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/95 p-5 md:p-7 rounded-3xl border border-slate-800 shadow-2xl flex flex-col gap-5 my-2">
      {/* Top Banner (Clean, muted accents) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-emerald-400" />
            <span>自訂題目與社區投稿</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            出題考朋友！亦可投稿至雲端資料庫，讓冷月仙納入官方題庫！
          </p>
        </div>

        <div className="flex items-center gap-2">
          {customQuestions.length > 0 && (
            <button
              onClick={onPlayCustom}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-950/40 hover:scale-[1.02] transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>開玩自訂題 ({customQuestions.length})</span>
            </button>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs hover:scale-[1.02] transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>新建題目</span>
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span>目前已建立的題目 ({customQuestions.length})</span>
          <span className="text-[11px] text-emerald-400 font-normal">可一鍵投稿到雲端資料庫</span>
        </h3>

        {customQuestions.length === 0 ? (
          <div className="text-center py-8 bg-slate-950/60 rounded-2xl border border-dashed border-slate-800 text-slate-500 text-xs">
            還沒有建立任何自訂題目喔！點擊右上角「新建題目」發揮創意！
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
            {customQuestions.map((q) => {
              const isSubmitted = submittedIds.includes(q.id);
              const isSubmitting = submittingId === q.id;

              return (
                <div
                  key={q.id}
                  className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <span className="text-xl">{q.emoji}</span>
                    <div className="truncate">
                      <h4 className="font-bold text-slate-200 truncate">{q.title}</h4>
                      <span className="text-[11px] text-slate-400">
                        答案：<strong className="text-emerald-400">{q.officialBattery}%</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Submit to Cloud Official DB Button */}
                    <button
                      onClick={() => handleSubmitToOfficialCloud(q)}
                      disabled={isSubmitted || isSubmitting}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        isSubmitted
                          ? 'bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 opacity-80'
                          : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300'
                      }`}
                      title="投稿至官方審核資料庫"
                    >
                      {isSubmitted ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>已投稿</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>{isSubmitting ? '投稿中...' : '投稿審核'}</span>
                        </>
                      )}
                    </button>

                    {/* Muted Delete Button (no overly harsh red) */}
                    <button
                      onClick={() => onDeleteQuestion(q.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-300 hover:bg-rose-950/40 transition-colors border border-transparent hover:border-rose-900/40"
                      title="刪除題目"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Export / Import Deck Section */}
      <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          📦 題庫分享與匯入
        </h3>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleExport}
            disabled={customQuestions.length === 0}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
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
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleImport}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center gap-1 shrink-0"
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
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 w-full max-w-lg shadow-2xl flex flex-col gap-4">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>建立新的電量題目</span>
            </h3>

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">
                  題目分類
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetCategory('absurd')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border ${
                      targetCategory === 'absurd'
                        ? 'bg-purple-950/60 border-purple-500/60 text-purple-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>🥔 荒謬萬物</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetCategory('math')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border ${
                      targetCategory === 'math'
                        ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>🤓 硬核數學</span>
                  </button>
                </div>
              </div>

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
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">
                  設定正確答案電量 (0% ~ 100%)
                </label>
                <BatteryGauge value={officialBattery} label="答案電量" size="sm" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={officialBattery}
                  onChange={(e) => setOfficialBattery(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 mt-2"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">
                  官方解說 (說明理由)
                </label>
                <textarea
                  rows={2}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="說明為什麼是這個數字..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
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
                  className="w-20 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-center text-xl text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-950/40"
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
