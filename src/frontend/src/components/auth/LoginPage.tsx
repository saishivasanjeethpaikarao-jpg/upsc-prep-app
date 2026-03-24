import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface LoginPageProps {
  onSwitchToSignup: () => void;
}

const features = [
  "120-question full-length mock tests",
  "Smart hierarchical syllabus tracker",
  "Daily practice & weak area review",
];

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.07,
      duration: 0.35,
      ease: [0, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

export function LoginPage({ onSwitchToSignup }: LoginPageProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) setError(result.error ?? "Login failed.");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#F0F4F8" }}>
      {/* Left branding panel — desktop only */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className="hidden md:flex w-[45%] lg:w-[42%] flex-col items-center justify-center px-12 py-16 relative overflow-hidden"
        style={{ background: "#0F3554" }}
      >
        {/* Subtle background circles */}
        <div
          className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full opacity-10"
          style={{ background: "white" }}
        />
        <div
          className="absolute bottom-[-60px] left-[-60px] w-56 h-56 rounded-full opacity-[0.07]"
          style={{ background: "white" }}
        />

        <div className="relative z-10 max-w-xs text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(4px)",
              }}
            >
              ⚖️
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
            TS LAWCET Prep
          </h1>
          <p
            className="text-sm mb-10"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Telangana Law Entrance Preparation
          </p>

          {/* Feature bullets */}
          <ul className="space-y-4 text-left">
            {features.map((feat) => (
              <li key={feat} className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.82)" }}
                >
                  {feat}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Right form panel */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className="flex-1 flex items-center justify-center px-6 py-12"
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex md:hidden items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: "#0F3554" }}
            >
              ⚖️
            </div>
            <div>
              <h1
                className="text-lg font-bold tracking-tight"
                style={{ color: "#0F3554" }}
              >
                TS LAWCET Prep
              </h1>
              <p className="text-xs text-gray-500">
                Telangana Law Entrance Preparation
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {/* Heading */}
            <motion.div
              custom={0}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="mb-7"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Welcome back
              </h2>
              <p className="text-sm text-gray-500">
                Sign in to continue your preparation
              </p>
            </motion.div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-ocid="login.modal"
            >
              <motion.div
                custom={1}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="space-y-1.5"
              >
                <Label
                  htmlFor="login-email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <Input
                  id="login-email"
                  data-ocid="login.input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="h-11 rounded-xl border-gray-200 focus:border-[#0F3554] focus:ring-2 focus:ring-[#0F3554]/20"
                />
              </motion.div>

              <motion.div
                custom={2}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
                className="space-y-1.5"
              >
                <Label
                  htmlFor="login-password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <Input
                  id="login-password"
                  data-ocid="login.input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="h-11 rounded-xl border-gray-200 focus:border-[#0F3554] focus:ring-2 focus:ring-[#0F3554]/20"
                />
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    key="login-error"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    data-ocid="login.error_state"
                    className="p-3 rounded-xl bg-red-50 border border-red-100"
                  >
                    <p className="text-sm text-red-600">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                custom={3}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.15 }}
                >
                  <Button
                    type="submit"
                    data-ocid="login.submit_button"
                    disabled={loading}
                    className="w-full h-11 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-110"
                    style={{ background: "#0F3554" }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Signing in…
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </form>

            <motion.p
              custom={4}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 text-center text-sm text-gray-500"
            >
              Don't have an account?{" "}
              <button
                type="button"
                data-ocid="login.link"
                onClick={onSwitchToSignup}
                className="font-semibold hover:underline transition-colors"
                style={{ color: "#0F3554" }}
              >
                Sign up
              </button>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
