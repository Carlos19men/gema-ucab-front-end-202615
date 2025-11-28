import { cn } from "@/lib/utils";

interface UcabBarProps {
  className?: string;
}

export default function UcabBar({ className }: UcabBarProps) {
  return (
    <div className={cn("flex w-full h-3 rounded-t-xl overflow-hidden", className)} aria-hidden="true">
      <div className="bg-gema-yellow flex-1" />
      <div className="bg-gema-blue flex-1" />
      <div className="bg-gema-green flex-1" />
    </div>
  );
}
