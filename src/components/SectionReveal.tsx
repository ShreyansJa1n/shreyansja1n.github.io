import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type Props = {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "header" | "footer";
  className?: string;
  style?: CSSProperties;
} & Omit<HTMLAttributes<HTMLElement>, "style">;

export const SectionReveal = ({
  children,
  delay = 0,
  as = "div",
  className = "",
  style,
  ...rest
}: Props) => {
  const { ref, inView } = useInView<HTMLElement>();
  const Tag = as as keyof JSX.IntrinsicElements;
  const mergedStyle: CSSProperties = {
    ...(style || {}),
    ['--reveal-delay' as never]: `${delay}ms`,
  } as CSSProperties;

  return (
    // @ts-expect-error dynamic tag
    <Tag
      ref={ref}
      className={`reveal ${inView ? "in-view" : ""} ${className}`.trim()}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
};
