import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wrench, ArrowRight } from "phosphor-react";

function ArabicMaintenancePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(180deg, #001a28 0%, #002C3D 50%, #005E9618 100%)" }}
      dir="rtl"
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
            background: "rgba(166, 206, 57, 0.1)",
            border: "1px solid rgba(166, 206, 57, 0.2)",
          }}
        >
          <Wrench weight="duotone" size={36} className="text-[#A6CE39]" />
        </div>

        <h1
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: '"IBM Plex Sans Arabic", system-ui, sans-serif' }}
        >
          الموقع تحت الصيانة
        </h1>

        <p
          className="text-white/60 text-lg mb-3 leading-relaxed"
          style={{ fontFamily: '"IBM Plex Sans Arabic", system-ui, sans-serif' }}
        >
          نعمل حالياً على تجهيز النسخة العربية من الموقع.
        </p>
        <p
          className="text-white/40 text-base mb-10 leading-relaxed"
          style={{ fontFamily: '"IBM Plex Sans Arabic", system-ui, sans-serif' }}
        >
          سيتم الإطلاق قريباً، شكراً لصبركم.
        </p>

        <Link
          to="/"
          className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-[0_8px_32px_rgba(166,206,57,0.25)]"
          style={{
            background: "linear-gradient(135deg, #A6CE39, #7CCCBF)",
            fontFamily: '"IBM Plex Sans Arabic", system-ui, sans-serif',
            fontSize: "0.9375rem",
          }}
        >
          <span>العودة إلى الموقع الإنجليزي</span>
          <ArrowRight
            weight="bold"
            size={16}
            className="rtl-flip transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        </Link>
      </motion.div>
    </div>
  );
}

export default ArabicMaintenancePage;
