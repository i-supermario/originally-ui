import { useTheme } from "@/utils/Theme";
import Logo from "./logo";

export default function Footer() {
  const { darkMode } = useTheme();
  
  return (
    <footer className="overflow-hidden bg-background shadow-md backdrop-blur-md py-4 absolute bottom-0 left-0 right-0 w-full">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/30 to-accent/30 animate-gradient"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,transparent_20%,var(--tw-gradient-from)_70%)] animate-pulse-slow"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Logo />
        </div>
        <p className="text-xs mt-4 md:mt-0 text-foreground/80">
          © {new Date().getFullYear()} originally. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
