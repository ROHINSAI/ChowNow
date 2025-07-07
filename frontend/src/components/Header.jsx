function Header() {
  const path = window.location.pathname;
  console.log(`Current path: ${path}`);

  let href, text;
  if (path === "/") {
    href = "/signIn";
    text = "Sign In";
  } else {
    href = "/";
    text = "Home";
  }

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-700/50">
      <div className="text-xl font-bold">ChowNow</div>
      <nav className="flex items-center space-x-6">
        {/* <a href="#" className="text-gray-300 hover:text-white">
            Product
            </a> */}
        <a
          href={href}
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-[10px]"
        >
          {text}
        </a>
      </nav>
    </header>
  );
}

export default Header;
