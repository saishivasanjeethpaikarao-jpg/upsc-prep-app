import { Skeleton } from "@/components/ui/skeleton";
import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { Subject } from "../../backend.d";
import type { SubjectProgress } from "../../backend.d";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import {
  useDailyTargets,
  useStudyProgress,
  useToggleTarget,
  useUserProfile,
} from "../../hooks/useQueries";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { DailyTargetCard } from "./DailyTargetCard";
import { DeadlineList } from "./DeadlineList";
import { IIStatusCard } from "./IIStatusCard";
import { ProgressCard } from "./ProgressCard";
import { QuickNav } from "./QuickNav";
import { SubjectCard } from "./SubjectCard";

const PREP_DAY = 142;

const FALLBACK_PROGRESS: SubjectProgress[] = [
  { subject: Subject.history, completionPercentage: BigInt(68) },
  { subject: Subject.geography, completionPercentage: BigInt(54) },
  { subject: Subject.polity, completionPercentage: BigInt(74) },
  { subject: Subject.economy, completionPercentage: BigInt(42) },
  { subject: Subject.scienceTech, completionPercentage: BigInt(38) },
  { subject: Subject.currentAffairs, completionPercentage: BigInt(81) },
];

const FALLBACK_TARGETS = [
  { id: BigInt(1), isCompleted: true, description: "Read NCERT History Ch. 4" },
  { id: BigInt(2), isCompleted: true, description: "Solve 20 Polity MCQs" },
  {
    id: BigInt(3),
    isCompleted: false,
    description: "Watch Geography video lecture",
  },
  { id: BigInt(4), isCompleted: false, description: "Make Economy notes" },
  { id: BigInt(5), isCompleted: false, description: "Revise Current Affairs" },
  {
    id: BigInt(6),
    isCompleted: false,
    description: "Attempt 1 full mock test",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function Dashboard() {
  const { identity } = useInternetIdentity();
  const { data: profile } = useUserProfile();
  const { data: progressData, isLoading: progressLoading } = useStudyProgress();
  const { data: targetsData, isLoading: targetsLoading } = useDailyTargets();
  const toggleTarget = useToggleTarget();

  const displayName = profile?.displayName ?? "Rahul Sharma";
  const principal = identity?.getPrincipal().toString() ?? "";
  const shortPrincipal = principal ? `${principal.slice(0, 10)}…` : "";

  const subjects =
    progressData && progressData.length > 0 ? progressData : FALLBACK_PROGRESS;
  const targets =
    targetsData && targetsData.length > 0 ? targetsData : FALLBACK_TARGETS;

  const overallProgress = Math.round(
    subjects.reduce((sum, s) => sum + Number(s.completionPercentage), 0) /
      subjects.length,
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-6 py-8">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-7"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Welcome back, {displayName}!
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Day {PREP_DAY}/365 of your preparation
            {shortPrincipal ? (
              <span className="ml-2 font-mono text-xs opacity-60">
                {shortPrincipal}
              </span>
            ) : null}
          </p>
        </motion.div>

        {/* Two-column grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5"
        >
          {/* Left column */}
          <div className="flex flex-col gap-5">
            <motion.div variants={itemVariants}>
              {progressLoading ? (
                <Skeleton
                  data-ocid="progress.loading_state"
                  className="h-28 rounded-xl"
                />
              ) : (
                <ProgressCard overallProgress={overallProgress} />
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-xl border border-border shadow-card p-5">
                <h2 className="text-sm font-semibold text-foreground mb-4">
                  Subject Overview
                </h2>
                {progressLoading ? (
                  <div
                    data-ocid="subjects.loading_state"
                    className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <Skeleton key={n} className="h-28 rounded-xl" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {subjects.map((s, i) => (
                      <SubjectCard
                        key={String(s.subject)}
                        progress={s}
                        index={i + 1}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <QuickNav />
            </motion.div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            <motion.div variants={itemVariants}>
              {targetsLoading ? (
                <Skeleton
                  data-ocid="daily_target.loading_state"
                  className="h-64 rounded-xl"
                />
              ) : (
                <DailyTargetCard
                  targets={targets}
                  onToggle={(id) => toggleTarget.mutate(id)}
                />
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <IIStatusCard />
            </motion.div>

            <motion.div variants={itemVariants}>
              <DeadlineList />
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
