import { Link } from "react-router-dom";

export const Navbar =()=>{
    return (
    <div className="navbar"> 
        <Link to="/"> Home</Link>
        <Link to="/login"> Login</Link>
        <Link to="/register"> Register</Link>
        <Link to="/webmine"> Webmine</Link>
        <Link to="/profile"> Profile</Link>
    </div>
    )
}

