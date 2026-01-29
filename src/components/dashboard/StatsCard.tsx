import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  variant?: "default" | "primary" | "accent";
  href?: string; // ✅ new
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  variant = "default",
  href,
}: StatsCardProps) {
  const navigate = useNavigate();

  const variants = {
    default:
      "bg-gradient-phoenix border-transparent text-primary-foreground hover:bg-red-900 hover:text-white",
    primary:
      "bg-gradient-phoenix border-transparent text-primary-foreground hover:bg-red-900 hover:text-white",
    accent:
      "bg-gradient-phoenix border-transparent text-primary-foreground hover:bg-red-900 hover:text-white",
  };

  const iconVariants = {
    default: "bg-primary-foreground/20 text-primary-foreground",
    primary: "bg-primary-foreground/20 text-primary-foreground",
    accent: "bg-primary-foreground/20 text-primary-foreground",
  };

  const handleClick = () => {
    if (href) navigate(href);
  };

  return (
    <div
      onClick={handleClick}
      role={href ? "button" : undefined}
      tabIndex={href ? 0 : undefined}
      onKeyDown={(e) => {
        if (href && (e.key === "Enter" || e.key === " ")) {
          navigate(href);
        }
      }}
      className={cn(
        "p-6 rounded-2xl border shadow-card transition-all duration-300 hover:shadow-elevated hover:scale-[1.02]",
        href && "cursor-pointer",
        variants[variant]
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            iconVariants[variant]
          )}
        >
          <Icon size={24} />
        </div>

        {change && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              changeType === "positive" && "bg-green-500/10 text-green-200",
              changeType === "negative" && "bg-red-500/10 text-red-200",
              changeType === "neutral" && "bg-white/10 text-white"
            )}
          >
            {change}
          </span>
        )}
      </div>

      <p className="text-sm mb-1 opacity-80">{title}</p>
      <p className="text-3xl font-display font-bold">{value}</p>
    </div>
  );
}
