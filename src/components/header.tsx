import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Logo from "./logo";
import { useSession } from "@/providers/SessionProvider";
import { API } from "@/api";
import { Spinner } from "./ui/spinner";
import { motion } from "framer-motion";

export default function Header() {
  const { email, clearSession, isLoading } = useSession();
  const isSessionActive = !!email;
  const navigate = useNavigate();

  const logoutUser = async () => {
    await API.METHODS.POST(
      API.ENDPOINTS.user.logout,
      { email },
      { withCredentials: true },
      {
        onSuccess: () => {
          clearSession();
          navigate("/");
        },
        onError: () => {},
      }
    );
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-background shadow-md backdrop-blur-md absolute top-0 left-0 right-0 w-full z-50"
    >
      <div className="container mx-auto px-4` flex justify-between items-center">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Logo />
        </motion.div>

        <motion.nav
          className="hidden md:flex space-x-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {["/groups", "/assignments"].map((path, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link to={path} className="text-foreground hover:text-primary">
                {path.includes("groups") ? "create group" : "create task"}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner size="sm" className="bg-black dark:bg-white" />
          </div>
        ) : isSessionActive ? (
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              className="text-black"
              variant="outline"
              onClick={logoutUser}
            >
              Logout
            </Button>
          </motion.div>
        ) : (
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline">
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline">
                <Link to="/login">Login</Link>
              </Button>
            </motion.div>
            <motion.button
              whileTap={{ scale: 1.2 }}
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="md:hidden text-foreground"
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
