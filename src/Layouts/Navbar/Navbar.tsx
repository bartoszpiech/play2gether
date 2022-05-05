import React, { useState, useContext, useCallback, useEffect } from "react";

import { PageNavbar } from "../../Assets/Styles/Navbar/PageNavbar";
import { Heading } from "../../Assets/Styles/Navbar/Heading";
import { MenuIcon } from "../../Assets/Styles/Navbar/MenuIcon";
import { NavMenu } from "../../Assets/Styles/Navbar/NavMenu";
// import { StyledNavLink } from "../../Assets/Styles/Navbar/StyledNavLink";

import { SignUpNavLink, StyledNavLink } from "../../Assets/Styles/Navbar/StyledNavLink";

import { UserContext } from "../../Context/UserContext";

import { MenuItemsLoginIn, MenuItems } from "./MenuItems";
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

    const printMenuItems = () => {
        return MenuItems.map((item, index) => {
            if (item.isSignUpButton) {
                return (
                    <SignUpNavLink key={index} to={item.url} onClick={handleClick}>
                        {item.title}
                    </SignUpNavLink>
                );
            } else {
                return (
                    <StyledNavLink key={index} to={item.url} onClick={handleClick}>
                        {item.title}
                    </StyledNavLink>
                );
            }
        });
    };

    const printMenuItemsLogIn = () => {
        let newMenu = MenuItemsLoginIn.map((item, index) => {
            if (!item.logout) {
                return (
                    <StyledNavLink key={index} to={item.url} onClick={handleClick}>
                        {item.title}
                    </StyledNavLink>
                );
            } else {
                return (
                    <SignUpNavLink key={index} to={item.url} onClick={logoutHandler}>
                        {item.title}
                    </SignUpNavLink>
                );
            }
        });

        return newMenu;
    };

    // return (
    //     <SignUpNavLink key={index} onClick={() => logoutHandler()} to={item.url}>
    //         {item.title}
    //     </SignUpNavLink>
    // );

    // const printMenuItems = () => {
    //     if (isUser) {
    //         let newItems = MenuItems.filter((item) => item.login || item.logout);

    //         return newItems.map((item, index) => {
    //             if (item.login) {
    //                 return (
    //                     <StyledNavLink key={index} to={item.url} onClick={handleClick}>
    //                         {item.title}
    //                     </StyledNavLink>
    //                 );
    //             } else if (item.logout) {
    //                 return (
    //                     <SignUpNavLink key={index} onClick={() => logoutHandler()} to={item.url}>
    //                         {item.title}
    //                     </SignUpNavLink>
    //                 );
    //             }
    //         });
    //     } else {
    //         let newItems = MenuItems.filter((item) => !item.login && !item.logout);
    //         return newItems.map((item, index) => {
    //             if (!item.login) {
    //                 if (item.isSignUpButton) {
    //                     return (
    //                         <SignUpNavLink key={index} to={item.url} onClick={handleClick}>
    //                             {item.title}
    //                         </SignUpNavLink>
    //                     );
    //                 } else {
    //                     return (
    //                         <StyledNavLink key={index} to={item.url} onClick={handleClick}>
    //                             {item.title}
    //                         </StyledNavLink>
    //                     );
    //                 }
    //             }
    //         });
    //     }
    // };

    return (
        <PageNavbar>
            <Heading>
                <i className={props.icon} />
                {props.title}
            </Heading>
            <MenuIcon onClick={handleClick}>
                <i className={clicked ? "fa-solid fa-arrow-left" : "fa-solid fa-arrow-right"} />
            </MenuIcon>
            <NavMenu isActive={clicked} menuHeight={MenuItemsLoginIn.length * 100 + 20}>
                {isUser ? printMenuItemsLogIn() : printMenuItems()}
            </NavMenu>
        </PageNavbar>
    );
};

export default Navbar;
