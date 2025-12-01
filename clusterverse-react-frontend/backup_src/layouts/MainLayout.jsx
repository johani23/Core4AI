import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Core4.AI – MVP 10 Main Layout (with Footer)
 */

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="bg-black min-h-screen text-white flex flex-col justify-between">
      {/* Navbar ثابت */}
      <Navbar />

      {/* محتوى الصفحات */}
      <main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer ثابت */}
      <Footer />
    </div>
  );
}
