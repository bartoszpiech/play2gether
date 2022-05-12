import { useState, useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "Store";
import { userActions } from "Store/user-slice";

import { PageNavbar } from "Assets/Styles/Navbar/PageNavbar";
import { Heading } from "Assets/Styles/Navbar/Heading";
import { MenuIcon } from "Assets/Styles/Navbar/MenuIcon";
import { NavMenu } from "Assets/Styles/Navbar/NavMenu";

import { StyledNavLink } from "Assets/Styles/Navbar/StyledNavLink";
import { MenuItemsLoggedIn, MenuItems, MenuItemsInterface } from "./MenuItems";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    title: string;
    icon: string;
}

const Navbar = (props: NavbarProps) => {
    const [clicked, setClicked] = useState(false);
    const token = useAppSelector((state) => state.user.token);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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
            dispatch(userActions.logout());
            window.localStorage.setItem("logout", Date.now().toString());
        });
    };

    const syncLogout = useCallback(
        (event: any) => {
            if (event.key === "logout") {
                // If using react-router-dom, you may call history.push("/")
                navigate("/home");
                window.location.reload();
            }
        },
        [navigate]
    );

    useEffect(() => {
        window.addEventListener("storage", syncLogout);
        return () => {
            window.removeEventListener("storage", syncLogout);
        };
    }, [syncLogout]);

    const printMenuItems = (Items: MenuItemsInterface[]) => {
        return Items.map((item, index) => {
            return (
                <StyledNavLink
                    key={index}
                    to={item.url}
                    onClick={item.logout ? logoutHandler : handleClick}
                    issignupbutton={item.isSignUpButton ? "yes" : "no"}
                >
                    {item.title}
                </StyledNavLink>
            );
        });
    };

    const handleHomeClick = () => {
        navigate("/home", { replace: true });
    };

    return (
        <PageNavbar>
            <Heading onClick={handleHomeClick}>
                <i className={props.icon} />
                {props.title}
            </Heading>
            <MenuIcon onClick={handleClick}>
                <i className={clicked ? "fa-solid fa-arrow-left" : "fa-solid fa-arrow-right"} />
            </MenuIcon>
            <NavMenu
                isActive={clicked}
                menuHeight={(token ? MenuItemsLoggedIn.length : MenuItems.length) * 100 + 50}
            >
                {token ? printMenuItems(MenuItemsLoggedIn) : printMenuItems(MenuItems)}
            </NavMenu>
        </PageNavbar>
    );
};

export default Navbar;
