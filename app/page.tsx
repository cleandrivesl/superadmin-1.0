export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold gradient-text">CleanDrive</h1>
        <p className="text-sm opacity-80">Top navigation admin & magic-link tracking starter.</p>
        <div className="text-sm">
          <a className="underline" href="/admin">Go to Admin</a>
          <span className="px-2">•</span>
          <a className="underline" href="/j/demo-token">View Tracking (demo)</a>
        </div>
      </div>
    </main>
  );
}
