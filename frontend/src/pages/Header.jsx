export default function Header() {
  return (
    <header className="bg-white border-b border-gray-300">
      <nav className="flex items-center justify-center p-6 space-x-6">
        {/* Logo */}
        <img
          alt="Logo"
          src="/img/BrDev3.svg"
          className="h-20 w-auto"
        />

        {/* Blog text */}
        <h1 className="text-5xl font-bold text-gray-900 transition-transform duration-700 ease-out transform hover:scale-105">
          My Blog
        </h1>
      </nav>
    </header>
  );
}

