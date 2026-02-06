import React from "react";
import { Link } from "react-router-dom";
import ProfileCard from "../cards/ProfileCard";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/50 bg-white/80 backdrop-blur">
      
      <div className="container mx-auto h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between">
          
          {/* Logo / Title */}
          <Link to="/">
            <h2 className="text-xl md:text-xl font-bold text-black leading-5">
              prepAI
            </h2>
          </Link>

          {/* Profile */}
          <ProfileCard />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
