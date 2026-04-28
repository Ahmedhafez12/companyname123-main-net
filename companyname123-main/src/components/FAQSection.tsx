import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretDown } from 'phosphor-react';
import { useTranslation } from '../i18n';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export default function FAQSection({
  title,
  subtitle,
  items,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  return (
    <section className="relative py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 xl:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2
            className="font-bold text-white font-sans"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            {title ?? t.faqSection.title}
          </h2>
          {subtitle && (
            <p className="text-white/60 mt-3 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-white/5"
                  aria-expanded={isOpen}
                  style={{ textAlign: 'inherit' }}
                >
                  <span className="font-medium text-white pe-4">{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 text-white/50"
                  >
                    <CaretDown weight="bold" size={18} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-white/70 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
