import { motion } from "framer-motion";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { FaDiscord, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-gray-800 overflow-hidden bg-background shadow-md backdrop-blur-md absolute bottom-0 left-0 right-0 w-full z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/30 to-accent/30 animate-gradient"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,transparent_20%,var(--tw-gradient-from)_70%)] animate-pulse-slow"></div>
        </div>
      </div>

      {/* Animated Content */}
      <motion.div
        className="relative z-10 mx-auto flex flex-row items-center justify-between px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left: Logo + Name */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Logo />
        </motion.div>

        {/* Middle: Socials / CTA */}
        <motion.div
          className="flex space-x-4 sm:mt-4 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="ghost" size="icon" className="text-xl">
            <a href="https://discordapp.com/users/722621291135500419" >
              <FaDiscord />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="text-xl">
            <a href="https://x.com/srngnkhr">
              <FaTwitter />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="text-xl">
            <a href="https://www.linkedin.com/in/sarang-nikhare/"><FaLinkedin /></a>
          </Button>
          <Button variant="ghost" size="icon" className="text-xl">
            <a href="https://www.instagram.com/sarangggggggggggg/"><FaInstagram /></a>
          </Button>
        </motion.div>

        {/* Right: Text */}
        <motion.p
          className="hidden sm:inline text-xs text-foreground/80 mt-4 md:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          © {new Date().getFullYear()} originally. All rights reserved.
        </motion.p>
      </motion.div>
    </footer>
  );
}
