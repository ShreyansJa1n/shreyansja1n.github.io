import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="text-center max-w-md">
        <span className="eyebrow">404</span>
        <h1 className="text-display mt-3 text-4xl md:text-5xl font-semibold text-ink dark:text-ink">
          Page not found.
        </h1>
        <p className="mt-4 text-[var(--ink-muted)]">
          The URL you followed doesn&rsquo;t exist on this site.
        </p>
        <a href="/" className="mt-8 btn-pill btn-pill-primary inline-flex">
          Return home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
