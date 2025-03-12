import LogoLight from "../assets/logo_light.svg"
import LogoDark from "../assets/logo_dark.svg"
import { Link } from "react-router"
import { useTheme } from "@/utils/Theme"


export default function Logo(){

  const { darkMode } = useTheme();
  return(
    <>
      <Link to="/" className="flex items-center space-x-2">
        <img src={darkMode ? LogoDark : LogoLight} alt="Logo" className="h-20 w-20" />
        <span className="text-xl font-semibold text-gray-900 dark:text-white">
          originally
        </span>
      </Link>
    </>
  )
}