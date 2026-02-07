import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  variant?: "default" | "success" | "warning" | "critical" | "info";
  className?: string;
}

const variantStyles = {
  default: "bg-card border border-border",
  success: "bg-gradient-to-br from-success/10 to-success/5 border border-success/20",
  warning: "bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20",
  critical: "bg-gradient-to-br from-critical/10 to-critical/5 border border-critical/20",
  info: "bg-gradient-to-br from-info/10 to-info/5 border border-info/20",
};

const iconStyles = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/20 text-success",
  warning: "bg-warning/20 text-warning",
  critical: "bg-critical/20 text-critical",
  info: "bg-info/20 text-info",
};

export function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  variant = "default",
  className 
}: StatCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.value > 0) return <TrendingUp className="h-4 w-4" />;
    if (trend.value < 0) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (!trend) return "";
    if (trend.value > 0) return "text-success";
    if (trend.value < 0) return "text-critical";
    return "text-muted-foreground";
  };

  return (
    <div 
      className={cn(
        "stat-card",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold font-display text-foreground">{value}</p>
          {trend && (
            <div className={cn("flex items-center gap-1 text-sm", getTrendColor())}>
              {getTrendIcon()}
              <span className="font-medium">{Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", iconStyles[variant])}>
          {icon}
        </div>
      </div>
    </div>
  );
}
