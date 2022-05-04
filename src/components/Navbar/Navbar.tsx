import React, { Component, useState, useContext } from "react";

import { PageNavbar } from "./styled/PageNavbar";
import { Heading } from "./styled/Heading";
import { MenuIcon } from "./styled/MenuIcon";
import { NavMenu } from "./styled/NavMenu";
import { StyledNavLink } from "./styled/NavLink";

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
                                    <div onClick={() => props.logoutHandler()} className="btn p-1 myBtn text-white">
                                       {item.title}
                                    </div>
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
