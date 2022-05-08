import { useState, useCallback, useEffect } from "react";

import { useDispatch,useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { RootState } from "Store";
import { userActions } from "Store/user-slice";

import { PageNavbar } from "Assets/Styles/Navbar/PageNavbar";
import { Heading } from "Assets/Styles/Navbar/Heading";
import { MenuIcon } from "Assets/Styles/Navbar/MenuIcon";
import { NavMenu } from "Assets/Styles/Navbar/NavMenu";

import { SignUpNavLink, StyledNavLink } from "Assets/Styles/Navbar/StyledNavLink";
import { MenuItemsLoginIn, MenuItems } from "./MenuItems";

interface NavbarProps {
    title: string;
    icon: string;
}
const Navbar = (props: NavbarProps) => {
    const [clicked, setClicked] = useState(false);
    const token = useSelector((state: RootState) => state.user.token);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    


    const handleClick = () => {
        setClicked(!clicked);
    };

    const logoutHandler = () => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "logout", {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(async (response) => {
            dispatch(
                userActions.register({
                    token: null,
                })
            );
            window.localStorage.setItem("logout", Date.now().toString());
        });
    };

    const syncLogout = useCallback((event: any) => {
        if (event.key === "logout") {
            // If using react-router-dom, you may call history.push("/")
            navigate("/home");
            window.location.reload();
        }
    },[]);

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
        return  MenuItemsLoginIn.map((item, index) => {
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
    };
    const handleHomeClick = () => {
        console.log("siema")
        navigate("/home", { replace: true });

    }

    return (
        <PageNavbar>
            <Heading onClick={handleHomeClick}>
                <i className={props.icon}/>
                {props.title}
            </Heading>
            <MenuIcon onClick={handleClick}>
                <i className={clicked ? "fa-solid fa-arrow-left" : "fa-solid fa-arrow-right"} />
            </MenuIcon>
            <NavMenu isActive={clicked} menuHeight={MenuItemsLoginIn.length * 100 + 20}>
                {token ? printMenuItemsLogIn() : printMenuItems()}
            </NavMenu>
        </PageNavbar>
    );
};

export default Navbar;
