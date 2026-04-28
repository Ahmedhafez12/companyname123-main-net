import { Link } from 'react-router-dom';
import { CaretRight, House } from 'phosphor-react';
import { useLocale } from '../i18n';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { isRTL } = useLocale();

  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="relative z-10">
      <ol className="flex items-center gap-1.5 text-sm text-white/50">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHome = index === 0;

          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && (
                <CaretRight
                  weight="bold"
                  size={10}
                  className={`text-white/30 ${isRTL ? 'rtl-flip' : ''}`}
                />
              )}
              {isLast ? (
                <span className="text-white/80 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-white transition-colors duration-200 flex items-center gap-1"
                >
                  {isHome && <House weight="regular" size={14} />}
                  <span>{isHome ? '' : item.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
