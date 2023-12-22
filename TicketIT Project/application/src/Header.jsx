import * as React from "react";
import Logo from "./Logo.jpg";
import "./Header.css";

const  Header = () => {
return (
    <>
        <div className="AppHeader">
            <header>
                <img src={Logo} className="AppLogo" alt="logo" />
            </header>
        </div>
    </>
)
}
export default Header;