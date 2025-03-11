import { Button } from "@/components/ui/button";
import { useTheme } from "@/utils/Theme";
import { Menu, Sun, Moon } from "lucide-react";
import { Link } from "react-router";
import LogoWhite from "../assets/logo_light.svg";
import LogoDark from "../assets/logo_dark.svg";

export default function Header() {

  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={darkMode ? LogoDark : LogoWhite} alt="Logo" className="h-20 w-20" />
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            originally
          </span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 dark:text-gray-300 ">
            home
          </Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-300 ">
            about
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button onClick={() => toggleTheme()} className="p-2">
            {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
          <Button asChild>
            <Link to="/login">login</Link>
          </Button>
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
