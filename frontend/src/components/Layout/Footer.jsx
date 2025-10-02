import React from "react";

export default function Footer() {
  return (
    <footer className="text-black py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Task Management. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
