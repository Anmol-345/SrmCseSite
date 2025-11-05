import Link from "next/link";

const navLinks = [
  { href: "/teachers", label: "Teachers" },
  { href: "/class-coordinators", label: "Class Coordinators" },
  { href: "/syllabus", label: "Syllabus" },
  { href: "/gallery", label: "Event Gallery" },
  { href: "/notices", label: "Notice Board" },
];

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav 
        className="
          max-w-fit mx-auto mt-4 flex items-center space-x-12
          px-6 py-3 text-white
          bg-black/30 backdrop-blur-lg 
          rounded-full border border-white/20
          shadow-lg
        "
      >
        {/* Left: Brand */}
        <div className="text-lg font-semibold">
          <Link href="/">Department of CSE</Link>
        </div>

        {/* Right: Navigation Links */}
        <div>
          <ul className="flex items-center space-x-6 ml-14">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="relative group pb-1 hover:text-gray-200 transition-colors duration-300 text-sm"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-[1px] w-full bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};