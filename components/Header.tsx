
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white px-6 py-5">
      <nav className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My Portfolio
        </Link>

        <div className="flex gap-6">
          <Link href="/" className="hover:text-blue-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-300">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
