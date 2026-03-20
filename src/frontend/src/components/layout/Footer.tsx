const QUICK_LINKS = ["About", "Contact", "Privacy", "Terms", "Resources"];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-white border-t border-border mt-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: "oklch(var(--navy))" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-label="PrepSage logo"
                  role="img"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="4.5"
                    height="4.5"
                    rx="0.75"
                    fill="white"
                    opacity="0.95"
                  />
                  <rect
                    x="7"
                    y="0.5"
                    width="4.5"
                    height="4.5"
                    rx="0.75"
                    fill="white"
                    opacity="0.6"
                  />
                  <rect
                    x="0.5"
                    y="7"
                    width="4.5"
                    height="4.5"
                    rx="0.75"
                    fill="white"
                    opacity="0.6"
                  />
                  <rect
                    x="7"
                    y="7"
                    width="4.5"
                    height="4.5"
                    rx="0.75"
                    fill="white"
                    opacity="0.3"
                  />
                </svg>
              </div>
              <span
                className="font-bold text-sm"
                style={{ color: "oklch(var(--navy))" }}
              >
                PrepSage
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your intelligent UPSC preparation companion.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground mb-2">
              Quick Links
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {QUICK_LINKS.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
