import { ReactNode } from "react";

interface HeadingProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export const Heading = ({
  title,
  description,
  icon
}: HeadingProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold tracking-tight flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}; 