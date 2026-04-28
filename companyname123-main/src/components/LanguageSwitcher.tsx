import { useLocale } from '../i18n';
import { useTranslation } from '../i18n';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { switchLocale } = useLocale();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={switchLocale}
      className={`text-sm font-medium transition-colors duration-200 ${className}`}
      aria-label="Switch language"
    >
      {t.langSwitch.label}
    </button>
  );
}
