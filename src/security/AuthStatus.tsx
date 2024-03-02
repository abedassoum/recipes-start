import { useAuth } from "./AuthProvider";
import { Link, NavLink } from "react-router-dom";

export default function AuthStatus() {
  const auth = useAuth();
 
  if (!auth.isLoggedIn()) {
     return (
       <li>
         <NavLink to="/login">Login</NavLink>
       </li>
     );
   } else {
     return (
       <li>
         <Link to="/logout">Logout (Logged in as {auth.username}) </Link>
       </li>
     );
   }
 }
 