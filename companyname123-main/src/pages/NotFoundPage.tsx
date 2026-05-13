import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, ArrowRight, House } from "phosphor-react";
import { useLocale, useTranslation } from "../i18n";

function NotFoundPage() {
  const { localePath, isRTL } = useLocale();
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(180deg, #001a28 0%, #002C3D 50%, #005E9618 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-lg"
      >
        <div
          className="w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center"
          style={{
            background: "rgba(68, 200, 245, 0.1)",
            border: "1px solid rgba(68, 200, 245, 0.2)",
          }}
        >
          <Compass weight="duotone" size={36} className="text-[#44C8F5]" />
        </div>

        <p
          className="text-[#44C8F5] text-xs font-semibold uppercase tracking-[0.25em] mb-4"
          style={{ fontFamily: t.fontFamilyHeading }}
        >
          404
        </p>

        <h1
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: t.fontFamilyHeading }}
        >
          {t.common.notFoundTitle}
        </h1>

        <p
          className="text-white/60 text-base sm:text-lg mb-2 leading-relaxed"
          style={{ fontFamily: t.fontFamilyBody }}
        >
          {t.common.notFoundMessage}
        </p>
        <p
          className="text-white/35 text-sm mb-10 font-mono break-all"
        >
          {location.pathname}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            to={localePath("/")}
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-[0_8px_32px_rgba(166,206,57,0.25)]"
            style={{
              background: "linear-gradient(135deg, #A6CE39, #7CCCBF)",
              fontFamily: t.fontFamilyHeading,
              fontSize: "0.9375rem",
            }}
          >
            <House weight="bold" size={16} />
            <span>{t.common.backToHome}</span>
          </Link>
          <Link
            to={localePath("/contact")}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white/80 hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/[0.03] transition-all duration-300"
            style={{ fontFamily: t.fontFamilyHeading, fontSize: "0.9375rem" }}
          >
            <span>{t.common.contactUs404}</span>
            <ArrowRight
              weight="bold"
              size={14}
              className={`opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 ${isRTL ? "rtl-flip" : ""}`}
            />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
