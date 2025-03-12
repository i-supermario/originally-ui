import { Button } from "@/components/ui/button";
import { useTheme } from "@/utils/Theme";
import { Menu, Sun, Moon } from "lucide-react";
import { Link } from "react-router";
import Logo from "./logo";

export default function Header() {

  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-secondary shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Logo />

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
