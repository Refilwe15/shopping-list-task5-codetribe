function NavBar() {
  return (
    <nav >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">

                <div className="flex items-center space-x-4 ml-250 mb-100 font-semibold">
                    <a href="/login" className="text-gray-800 hover:text-blue-600">Login</a>
                    <a href="/register" className="text-gray-800 hover:text-blue-600">Register</a>
                    <a href="/about" className="text-gray-800 hover:text-blue-600">About</a>
                </div>
            </div>
        </div>
    </nav>
  );
}
export default NavBar;