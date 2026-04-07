import Navbar2 from "../components/Navbar2";

/**
 * Standalone preview for Navbar2 (transparent top vs scrolled bar). Home / About Overview use
 * Navbar2 only (home uses `Navbar.tsx` overlay menu from App). Open /preview/navbar2 to preview in isolation.
 */
export default function Navbar2PreviewPage() {
  return (
    <div className="min-h-[220vh] bg-gradient-to-b from-[#002C3D] via-[#003d52] to-[#005E96]">
      <Navbar2 basePath="" />
      <main className="mx-auto max-w-2xl px-6 pb-32 pt-28 text-white md:pt-36">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Navbar2 preview
        </h1>
        <p className="mt-4 text-base leading-relaxed text-white/90">
          At the top the bar is transparent with the logo centered. Scroll past about{" "}
          <strong className="text-white">50px</strong> to see the white bar, shadow, blur, and
          #005E96 text with the logo on the left.
        </p>
        <p className="mt-8 text-sm text-white/70">
          Extra height below so you can scroll back and forth and watch the transition.
        </p>
      </main>
    </div>
  );
}
