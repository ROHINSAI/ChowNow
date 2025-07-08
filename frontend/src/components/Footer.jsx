const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white text-center p-4 h-6 mb-4">
      <p>&copy; {currentYear} ChowNow</p>
    </footer>
  );
};

export default Footer;
