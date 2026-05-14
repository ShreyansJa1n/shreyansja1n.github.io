import { useScrollProgress } from "@/hooks/useScrollProgress";

export const ScrollProgressBar = () => {
  const progress = useScrollProgress();
  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none"
    >
      <div
        className="h-full origin-left bg-[#0071e3] transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};
