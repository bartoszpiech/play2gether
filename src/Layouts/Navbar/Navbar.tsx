import React, { Component, useState, useContext } from "react";

import { PageNavbar } from "../../Assets/Styles/Navbar/PageNavbar";
import { Heading } from "../../Assets/Styles/Navbar/Heading";
import { MenuIcon } from "../../Assets/Styles/Navbar/MenuIcon";
import { NavMenu } from "../../Assets/Styles/Navbar/NavMenu";
import { StyledNavLink } from "../../Assets/Styles/Navbar/NavLink";

import { UserContext } from "../../context/UserContext";

import { MenuItems } from "./MenuItems";

interface NavbarProps {
    title?: string;
    icon?: string;
    logout?: boolean;
    children?: React.ReactNode; // dunno why?
    logoutHandler: any;
}
// const NewPlace = () => {
const Navbar = (props: NavbarProps) => {
    // state = { clicked: false };
    const [clicked, setClicked] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);

    const { token: isUser }: any = userContext;

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <PageNavbar>
            <Heading>
                <i className={props.icon} />
                {props.title}
            </Heading>
            <MenuIcon onClick={handleClick}>
                <i className={clicked ? "fa-solid fa-arrow-left" : "fa-solid fa-arrow-right"} />
            </MenuIcon>
            <NavMenu isActive={clicked} menuHeight={MenuItems.length * 100 + 20}>
                {MenuItems.map((item, index) => {
                    if (isUser) {
                        if (item.login) {
                            return (
                                <li key={index}>
                                    <StyledNavLink
                                        to={item.url}
                                        isSignupButton={item.isSignupButton}
                                        onClick={handleClick}
                                    >
                                        {item.title}
                                    </StyledNavLink>
                                </li>
                            );
                        } else if (item.logout) {
                            return (
                                <li key={index}>
                                    <StyledNavLink onClick={() => props.logoutHandler()} to={item.url} >
                                       {item.title}
                                    </StyledNavLink>
                                </li>
                            );
                        }
                    } else {
                        if (!item.login && !item.logout) {
                            return (
                                <li key={index}>
                                    <StyledNavLink
                                        to={item.url}
                                        isSignupButton={item.isSignupButton}
                                        onClick={handleClick}
                                    >
                                        {item.title}
                                    </StyledNavLink>
                                </li>
                            );
                        }
                    }
                })}
            </NavMenu>
        </PageNavbar>
    );
};

export default Navbar;