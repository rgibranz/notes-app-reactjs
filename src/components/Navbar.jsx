function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a href="#" className="text-white text-2xl font-semibold">
          Logo
        </a>
        <ul className="flex space-x-4">
          <li>
            <a href="/notes" className="text-white hover:underline">
              Notes
            </a>
          </li>
          <li>
            <a href="/logout" className="text-white hover:underline">
              logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;