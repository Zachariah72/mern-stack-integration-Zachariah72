// path: client/src/App.jsx
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { user, isLoaded } = useUser();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!isLoaded) return <p>Loading user info…</p>; // wait for Clerk

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card border-b">
        <div className="mx-auto max-w-5xl p-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Week 4 • Notes App</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full hover:bg-muted"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="py-6">
        <div className="mx-auto max-w-5xl">
          <SignedOut>
            <div className="border rounded-xl bg-card p-6 text-center">
              <h2 className="text-lg font-semibold mb-2">Welcome to our Notes App</h2>
              <p className="text-muted-foreground">Please sign in to manage your notes</p>
            </div>
          </SignedOut>

          <SignedIn>
            {user && <Dashboard frontendUserId={user.id} />}
          </SignedIn>
        </div>
      </main>
    </div>
  );
}
