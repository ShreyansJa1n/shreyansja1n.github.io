import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface CustomCardProps {
  title: string;
  description: string;
  tags?: string[];
  buttonText?: string;
  buttonLink?: string;
  darkMode?: boolean;
  icon?: ReactNode;
}

/**
 * Compact card primitive retained for backwards compatibility. Newer sections
 * use the `card-surface` utility class and inline markup directly.
 */
export const CustomCard = ({
  title,
  description,
  tags = [],
  buttonText,
  buttonLink,
  icon,
}: CustomCardProps) => (
  <article className="card-surface p-6 h-full flex flex-col">
    <h3 className="text-tightish text-lg md:text-xl font-semibold text-ink dark:text-ink mb-3">
      {title}
    </h3>
    <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-5 flex-1">
      {description}
    </p>
    {tags.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-5">
        {tags.slice(0, 6).map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
        {tags.length > 6 && <span className="pill">+{tags.length - 6} more</span>}
      </div>
    )}
    {buttonText && buttonLink && (
      <Link to={buttonLink} className="btn-pill btn-pill-outline self-start">
        {icon}
        {buttonText}
      </Link>
    )}
  </article>
);
