import React from "react";
import { Nav, NavLink} from 'react-router-dom'
 
const Navbar = () => {
    return (
        <>
        <div>
        <NavLink to="/">Home</NavLink>

                <NavLink to="/adresses" >
                        Adresses
                    </NavLink>
            </div>
        </>
    );
};
 
export default Navbar;