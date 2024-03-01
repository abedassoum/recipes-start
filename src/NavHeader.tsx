import { Link } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";

export default function NavHeader() {
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
        <li>
          <Link to="/add">Add</Link>
        </li>
        <AuthStatus />
      </ul>
    </nav>
  );
}
