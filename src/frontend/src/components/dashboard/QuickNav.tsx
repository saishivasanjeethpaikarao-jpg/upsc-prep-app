import { Button } from "@/components/ui/button";
import {
  BarChart2,
  BookOpen,
  Clock,
  FileText,
  MapPin,
  Trophy,
} from "lucide-react";

const QUICK_NAV_ITEMS = [
  { label: "NCERT Books", icon: BookOpen, filled: true },
  { label: "Previous Papers", icon: FileText, filled: false },
  { label: "Performance", icon: BarChart2, filled: false },
  { label: "Current Affairs", icon: Clock, filled: false },
  { label: "Mind Maps", icon: MapPin, filled: false },
  { label: "Leaderboard", icon: Trophy, filled: false },
];

export function QuickNav() {
  return (
    <div
      data-ocid="quick_nav.section"
      className="bg-white rounded-xl border border-border shadow-card p-5"
    >
      <h2 className="text-sm font-semibold text-foreground mb-4">
        Quick Navigation
      </h2>
      <div className="flex flex-wrap gap-2">
        {QUICK_NAV_ITEMS.map((item, i) => (
          <Button
            key={item.label}
            data-ocid={`quick_nav.item.${i + 1}`}
            size="sm"
            variant={item.filled ? "default" : "outline"}
            className="h-8 px-3 text-xs rounded-full gap-1.5"
            style={
              item.filled
                ? { background: "oklch(var(--navy))", color: "white" }
                : {
                    borderColor: "oklch(var(--navy))",
                    color: "oklch(var(--navy))",
                  }
            }
          >
            <item.icon size={12} />
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
