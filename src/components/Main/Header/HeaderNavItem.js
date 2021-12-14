import React from "react";

const HeaderNavItem = (
    {
        nav = 'home',
        isActive = true,
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
        <li className="nav-item">
            <a className={classString} href={linkPathString}>{nav.navName}</a>
        </li>
    );
}
export default HeaderNavItem;