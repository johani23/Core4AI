import React from "react";
import { motion } from "framer-motion";

/**
 * Core4.AI ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ MVP 10 Footer
 * Minimal footer for all pages (appears in MainLayout)
 */

export default function Footer() {
  return (
    <motion.footer
      className="w-full border-t border-gray-800 text-gray-400 text-sm py-4 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <span className="text-gray-500">Made with ÃƒÂ°Ã…Â¸Ã¢â‚¬â„¢Ã…â€œ by </span>
          <span className="text-purple-400 font-semibold">Core4</span>
          <span className="text-yellow-400 font-semibold">.AI</span>
        </div>

        {/* Right Section */}
        <div className="flex gap-4 text-xs md:text-sm">
          <a
            href="#privacy"
            className="hover:text-purple-400 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            className="hover:text-purple-400 transition-colors duration-200"
          >
            Terms of Use
          </a>
          <a
            href="#contact"
            className="hover:text-purple-400 transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

