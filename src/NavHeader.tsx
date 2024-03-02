import { Link, NavLink } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";
import { useAuth } from "./security/AuthProvider";

export default function NavHeader() {

  const auth = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        {auth.isLoggedIn() && (
        <li>
          <NavLink to="/add">Add</NavLink>  
        </li>
        )}
        <AuthStatus />
      </ul>
    </nav>
  );
}
