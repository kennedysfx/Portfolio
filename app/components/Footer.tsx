export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-zinc-800 px-4 md:px-12 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4 text-center">
        {/* Left group: Name + divider + copyright */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-2 font-bold text-white">
            Kennedy Ezebilo
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          </span>

          <span className="text-zinc-700">|</span>

          <span className="text-zinc-400 font-light text-sm">
            © {year} <span className="text-blue-500 font-medium">Kennedy Ezebilo</span>
          </span>
        </div>

        {/* Right group: Built with credit */}
        <div className="text-zinc-400 font-light text-sm">
          Built with{" "}
          <span className="text-blue-500 font-semibold">Next.js</span> &{" "}
          <span className="text-blue-500 font-semibold">Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}