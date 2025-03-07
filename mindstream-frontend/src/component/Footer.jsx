import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black mt-20">
      <div className="container mx-auto flex flex-wrap justify-between px-10 py-10 gap-10 md:flex-nowrap">
        {/* Brand Info */}
        <div className="w-full md:w-1/4 flex flex-col gap-5">
          <p>
            <span className="text-blue-600 font-extrabold text-3xl">MIND</span>
            <span className="text-red-600 font-bold text-2xl">STREAM</span>
          </p>
          <p className="text-gray-400 font-semibold">
            Our mission is to equip modern explorers with cutting-edge, functional, and stylish bags that elevate every adventure.
          </p>
          <p className="text-gray-300 font-semibold">
            &copy;2025 MINDSTREAM. All Rights Reserved
          </p>
        </div>

        {/* About Section */}
        <div className="w-full md:w-1/4 flex flex-col gap-5">
          <p className="text-white font-semibold text-xl">About</p>
          <p className="text-gray-400 font-semibold text-lg cursor-pointer hover:text-white">About Us</p>
          <p className="text-gray-400 font-semibold text-lg cursor-pointer hover:text-white">Blog</p>
          <p className="text-gray-400 font-semibold text-lg cursor-pointer hover:text-white">Career</p>
        </div>

        {/* Support Section */}
        <div className="w-full md:w-1/4 flex flex-col gap-5">
          <p className="text-white font-semibold text-xl">Support</p>
          <p className="text-gray-400 font-semibold text-lg cursor-pointer hover:text-white">Contact Us</p>
          <p className="text-gray-400 font-semibold text-lg cursor-pointer hover:text-white">Return</p>
          <p className="text-gray-400 font-semibold text-lg cursor-pointer hover:text-white">FAQ</p>
        </div>

        {/* Get Updates Section */}
        <div className="w-full md:w-1/4 flex flex-col gap-5">
          <p className="text-white font-semibold text-xl">Get Updates</p>
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
            <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
            <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
          </div>
          <p className="flex flex-wrap justify-center md:justify-end gap-3">
            <span className="text-gray-300 font-semibold text-lg cursor-pointer hover:text-white">Privacy Policy</span>
            <span className="text-gray-300 font-semibold text-lg cursor-pointer hover:text-white">Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
