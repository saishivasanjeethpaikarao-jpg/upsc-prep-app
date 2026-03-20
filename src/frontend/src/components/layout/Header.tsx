import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

const NAV_LINKS = [
  { label: "Dashboard", active: true },
  { label: "Syllabus", active: false },
  { label: "Live Classes", active: false },
  { label: "Mock Tests", active: false },
  { label: "Study Materials", active: false },
  { label: "Profile", active: false },
];

export function Header() {
  const { clear } = useInternetIdentity();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "oklch(var(--navy))" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-label="PrepSage logo"
              role="img"
            >
              <rect
                x="1"
                y="1"
                width="6"
                height="6"
                rx="1"
                fill="white"
                opacity="0.95"
              />
              <rect
                x="9"
                y="1"
                width="6"
                height="6"
                rx="1"
                fill="white"
                opacity="0.6"
              />
              <rect
                x="1"
                y="9"
                width="6"
                height="6"
                rx="1"
                fill="white"
                opacity="0.6"
              />
              <rect
                x="9"
                y="9"
                width="6"
                height="6"
                rx="1"
                fill="white"
                opacity="0.3"
              />
            </svg>
          </div>
          <span
            className="font-bold text-sm tracking-tight"
            style={{ color: "oklch(var(--navy))" }}
          >
            PrepSage
          </span>
        </div>

        {/* Nav links (desktop) */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              type="button"
              data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "_")}.link`}
              className={[
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                link.active
                  ? "text-foreground border-b-2 rounded-b-none pb-[5px]"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
              style={
                link.active ? { borderBottomColor: "oklch(var(--navy))" } : {}
              }
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <Button
          data-ocid="header.logout.button"
          variant="outline"
          size="sm"
          onClick={clear}
          className="flex-shrink-0 h-8 px-3 text-xs font-medium rounded-lg"
          style={{
            borderColor: "oklch(var(--navy))",
            color: "oklch(var(--navy))",
          }}
        >
          <LogOut size={13} className="mr-1.5" />
          Logout
        </Button>
      </div>
    </header>
  );
}
