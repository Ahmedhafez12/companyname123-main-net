import React, { createContext, useContext, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Locale = 'en' | 'ar';
type Dir = 'ltr' | 'rtl';

interface LocaleContextValue {
  locale: Locale;
  dir: Dir;
  isRTL: boolean;
  basePath: string;
  localePath: (path: string) => string;
  switchLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function stripLocalePrefix(pathname: string): string {
  if (pathname === '/ar' || pathname.startsWith('/ar/')) {
    return pathname.replace(/^\/ar/, '') || '/';
  }
  return pathname;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const locale: Locale = location.pathname === '/ar' || location.pathname.startsWith('/ar/') ? 'ar' : 'en';
  const dir: Dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isRTL = locale === 'ar';
  const basePath = stripLocalePrefix(location.pathname);

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    dir,
    isRTL,
    basePath,
    localePath: (path: string) => locale === 'ar' ? `/ar${path === '/' ? '' : path}` : path,
    switchLocale: () => {
      const newPath = locale === 'ar'
        ? basePath
        : `/ar${basePath === '/' ? '' : basePath}`;
      navigate(newPath);
    },
  }), [locale, dir, isRTL, basePath, navigate]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within a LocaleProvider');
  return ctx;
}
