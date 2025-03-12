import Logo from "./logo";

export default function Footer() {
  return (
    <footer className=" bg-white dark:bg-primary-foreground shadow-md py-2">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Logo />
        </div>
        <p className="text-xs mt-4 md:mt-0">
          © {new Date().getFullYear()} originally. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
