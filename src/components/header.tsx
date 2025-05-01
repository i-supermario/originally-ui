import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import Logo from "./logo";
import { useSession } from "@/providers/SessionProvider";
import { API } from "@/api";

export default function Header() {

  const { email, clearSession } = useSession();
  const isSessionActive = email ? true : false;

  const logoutUser = async () => {
    await API.METHODS.POST(API.ENDPOINTS.user.logout, { email: email }, { withCredentials: true }, {
      onSuccess: () => { clearSession(); },
      onError: () => {},
    })
  }

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Logo />

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-foreground hover:text-primary">
            home
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary">
            about
          </Link>
        </nav>
        {
          isSessionActive ? 
          <div>
            <Button className="text-black" variant="outline" onClick={() => { logoutUser() }}>
              Logout
            </Button>
          </div>
          :
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link to="/sign-up">Sign Up</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/login">Login</Link>
            </Button>
            <button className="md:hidden text-foreground">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        }
        
        
      </div>
    </header>
  );
}
