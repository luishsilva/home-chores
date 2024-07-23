const Footer = () => {
  const currentDate = new Date();
  return (
    <footer className="bg-light text-black text-center p-3">
      copyright&copy; 2024-{currentDate.getFullYear()}
    </footer>
  );
};

export default Footer;
