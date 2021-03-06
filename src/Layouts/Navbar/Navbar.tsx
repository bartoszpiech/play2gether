import { Heading } from "Assets/Styles/Navbar/Heading";
import { MenuIcon } from "Assets/Styles/Navbar/MenuIcon";
import { NavMenu } from "Assets/Styles/Navbar/NavMenu";
import { PageNavbar } from "Assets/Styles/Navbar/PageNavbar";
import { StyledNavLink } from "Assets/Styles/Navbar/StyledNavLink";
import { useAppDispatch, useAppSelector } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userActions } from "Store/user-slice";
import { MenuItems, MenuItemsAdmin, MenuItemsInterface, MenuItemsLoggedIn } from "./MenuItems";

interface NavbarProps {
    title: string;
    icon: string;
}

const Navbar = (props: NavbarProps) => {
    const [clicked, setClicked] = useState(false);
    const token = useAppSelector((state) => state.user.token);
    const account = useAppSelector((state) => state.user.account);

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

    let Items: MenuItemsInterface[] = MenuItems;
    if (account) {
        if (token && account.type === "admin") {
            Items = MenuItemsAdmin;
        } else if (token && (account.type === "user" || account.type === "premium")) {
            Items = MenuItemsLoggedIn;
        }
    }
    const printMenuItems = () => {
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
        if (account) {
            if (token && (account.type === "user" || account.type === "premium")) {
                navigate("/user/home", { replace: true });
            } else if (token && account.type === "admin") {
                navigate("/admin/home", { replace: true });
            }
        } else {
            navigate("/home", { replace: true });
        }
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
            <NavMenu isActive={clicked} menuHeight={Items.length * 100 + 50}>
                {printMenuItems()}
            </NavMenu>
        </PageNavbar>
    );
};

export default Navbar;
