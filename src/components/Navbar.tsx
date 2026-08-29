import type { NavLink } from "../types";

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#" },
  { label: "Students", href: "#" },
  { label: "Courses", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Navbar() {
  return (
<header className="container-custom flex items-center justify-between py-4">
        <div className="bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-3xl font-extrabold text-transparent">
        Academia
      </div>

      <nav className="flex gap-9">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-base font-semibold text-grey no-underline hover:opacity-80"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex">
        <input
          placeholder="Search students…"
          className="w-56 rounded-l-md border-none bg-neutral-200 px-3.5 py-2.5 text-sm text-neutral-800 outline-none"
        />
        <button className="rounded-r-md border-none bg-accent-from px-5 py-2.5 font-bold text-white">
          Search
        </button>
      </div>
    </header>
  );
}