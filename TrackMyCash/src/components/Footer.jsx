const Footer = () => {
  return (
    <>
<footer className="bg-gray-800 text-white py-8">
  <div className="container mx-auto text-center">
    <h1 className="text-3xl font-bold mb-4">
      TrackMyCash</h1>

    <p className="text-lg italic text-gray-400">Empower your financial journey. Track, manage, and grow your money with confidence.</p>

    <div className="mt-4">
      <a href="#" className="text-gray-400 hover:text-white mx-3">Privacy Policy</a>
      <a href="#" className="text-gray-400 hover:text-white mx-3">Terms of Service</a>
      <a href="mailto:support@trackmycash.com" className="text-gray-400 hover:text-white mx-3">Contact Us</a>
    </div>

    <div className="mt-4">
      <p className="text-sm">Follow us on:</p>
      <a href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-white mx-2"><i className="fab fa-facebook"></i></a>
      <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-white mx-2"><i className="fab fa-twitter"></i></a>
      <a href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-white mx-2"><i className="fab fa-instagram"></i></a>
    </div>

    <div className="mt-6">
      <p>&copy; 2025 TrackMyCash. All rights reserved.</p>
    </div>
  </div>
</footer>

    </>
  );
};

export default Footer;
