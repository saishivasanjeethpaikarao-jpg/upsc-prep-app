import { Toaster } from "@/components/ui/sonner";
import { AuthGuard } from "./components/auth/AuthGuard";
import { LoginPage } from "./components/auth/LoginPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import { useInternetIdentity } from "./hooks/useInternetIdentity";

function AppContent() {
  const { identity } = useInternetIdentity();
  return identity ? <Dashboard /> : <LoginPage />;
}

export default function App() {
  return (
    <>
      <AuthGuard>
        <AppContent />
      </AuthGuard>
      <Toaster />
    </>
  );
}
