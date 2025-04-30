import { Logoutauth } from "@store/Auth/Authslice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";

function Dropdownusers() {
  const username = useAppSelector  (stata=>stata.Authslice.user?.email)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handlelogout=() => {
        dispatch(Logoutauth());
        navigate("/")
    }
  return (
    <NavDropdown
      id="nav-dropdown-dark-example"
      title={<span className="text-light">Welcome-{username}</span>}
      menuVariant="white"
      className="text-light"
      style={{width:"250px"}}
    >
      <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
      <NavDropdown.Item href="/profile/orders">Orders </NavDropdown.Item>
      <NavDropdown.Item onClick={()=>handlelogout()}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
}

export default Dropdownusers;
