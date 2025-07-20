
import { cn } from "../utils/cn";
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export const Heading1 = ({ className, children, ...props }: HeadingProps) => (
  <h1 className={cn("text-4xl md:text-5xl font-bold text-text-main leading-tight", className)} {...props}>
    {children}
  </h1>
);


interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export const Paragraph = ({ className, children, ...props }: ParagraphProps) => (
  <p className={cn("text-base text-text-secondary leading-relaxed", className)} {...props}>
    {children}
  </p>
);