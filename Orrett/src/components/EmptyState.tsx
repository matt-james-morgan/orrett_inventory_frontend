import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  icon?: React.ReactNode;
}

const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  icon = "",
}: EmptyStateProps) => {
  return (
    <div className="flex h-[300px] w-full flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-fade-in">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {icon}
        <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <Button onClick={onAction} className="mt-4" size="sm">
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
