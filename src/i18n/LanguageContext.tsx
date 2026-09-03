import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Language, TranslationKey, translate } from './translations';

const STORAGE_KEY = 'guess_battery_language';

// Auto-detection: only ever runs once, on first load with no saved
// preference. Checks every language the browser reports (not just the
// primary one) so a system set to e.g. "en-US, zh-TW" still lands on
// Chinese — matches how most sites' auto-detection behaves. Defaults to
// English for anyone whose browser doesn't report a Chinese locale at all,
// per the point of this feature (a non-Chinese-native visitor should see
// English without having to find a toggle first).
function detectLanguage(): Language {
  if (typeof navigator === 'undefined') return 'zh';
  const candidates = navigator.languages && navigator.languages.length > 0 ? navigator.languages : [navigator.language];
  const looksChinese = candidates.some((l) => l?.toLowerCase().startsWith('zh'));
  return looksChinese ? 'zh' : 'en';
}

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'zh' || saved === 'en') return saved;
  } catch {
    // localStorage unavailable (private browsing, etc.) — fall through to detection
  }
  return detectLanguage();
}

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  /** Translate a key, optionally filling in `{token}` placeholders. */
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore — nothing else to do if storage is unavailable
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: Language = prev === 'zh' ? 'en' : 'zh';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => translate(lang, key, vars),
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, toggleLang, t }), [lang, setLang, toggleLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// Standard context+hook co-location; splitting into a second file for this
// alone would be pure indirection.
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
