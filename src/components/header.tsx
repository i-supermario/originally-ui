import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Logo from "./logo";
import { useSession } from "@/providers/SessionProvider";
import { API } from "@/api";

export default function Header() {

  const { email, clearSession } = useSession();
  const isSessionActive = email ? true : false;
  console.log(isSessionActive);
  const navigate = useNavigate();

  const logoutUser = async () => {
    await API.METHODS.POST(API.ENDPOINTS.user.logout, { email: email }, { withCredentials: true }, {
      onSuccess: () => { 
        clearSession();
        navigate('/'); 
      },
      onError: () => {},
    })
  }

  return (
    <header className="bg-background shadow-md backdrop-blur-md absolute top-0 left-0 right-0 w-full z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Logo />

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-foreground hover:text-primary">
            home
          </Link>
          <Link to="/dashboard" className="text-foreground hover:text-primary">
            create group
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
