import Dashboard from "./pages/Dashboard";

export default function App() {
  const fakeUserId = import.meta.env.VITE_FAKE_USER_ID || ""; // simulate a user (frontend-only)

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="mx-auto max-w-5xl p-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Week 4 • Notes App</h1>
            <p className="text-slate-600 text-sm">Express + MongoDB backend • React + Tailwind + Radix front-end • axios</p>
          </div>
          <div className="text-sm text-slate-600">
            user: <span className="font-mono">{fakeUserId || "anonymous"}</span>
          </div>
        </div>
      </header>

      <main className="py-6">
        <div className="mx-auto max-w-5xl">
          <Dashboard frontendUserId={fakeUserId}/>
        </div>
      </main>
    </div>
  );
}
