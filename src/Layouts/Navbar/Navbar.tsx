import React, { Component, useState, useContext, useCallback, useEffect } from "react";

import { PageNavbar } from "../../Assets/Styles/Navbar/PageNavbar";
import { Heading } from "../../Assets/Styles/Navbar/Heading";
import { MenuIcon } from "../../Assets/Styles/Navbar/MenuIcon";
import { NavMenu } from "../../Assets/Styles/Navbar/NavMenu";
import { StyledNavLink } from "../../Assets/Styles/Navbar/NavLink";

import { UserContext } from "../../Context/UserContext";

import { MenuItems } from "./MenuItems";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    title?: string;
    icon?: string;
    logout?: boolean;
    children?: React.ReactNode;
}

const Navbar = (props: NavbarProps) => {
    const [clicked, setClicked] = useState(false);
    const [userContext, setUserContext]: any = useContext(UserContext);
    const { token: isUser }: any = userContext;
    const navigate = useNavigate();

    const handleClick = () => {
        setClicked(!clicked);
    };

    const logoutHandler = () => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "logout", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userContext.token}`,
            },
        }).then(async (response) => {
            setUserContext((oldValues: any) => {
                return { ...oldValues, details: undefined, token: null };
            });
            window.localStorage.setItem("logout", Date.now().toString());
        });
    };

    const syncLogout = useCallback((event: any) => {
        if (event.key === "logout") {
            // If using react-router-dom, you may call history.push("/")
            navigate("/home");
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        window.addEventListener("storage", syncLogout);
        return () => {
            window.removeEventListener("storage", syncLogout);
        };
    }, [syncLogout]);

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
                                    <StyledNavLink onClick={() => logoutHandler()} to={item.url}>
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
