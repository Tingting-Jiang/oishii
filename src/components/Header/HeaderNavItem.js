import React from "react";
import {Link} from "react-router-dom";

const HeaderNavItem = (
    {
        nav = 'home',
        isActive = true
    }) => {

    // if active, change class string
    let classString;
    if (isActive) {
        classString = 'nav-link active';
    } else {
        classString = 'nav-link';
    }

    // if home is active, link to /home
    let linkPathString;
    linkPathString = "/" + nav.navTitle;

    return (
        <Link to={linkPathString} className={classString}>
            <div className="d-none d-xl-inline">{nav.navName}</div>
        </Link>
    );
}
export default HeaderNavItem;