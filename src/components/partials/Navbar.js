import React, { Component, useContext } from "react";

import { UserContext } from "../../context/UserContext";

import { NavLink } from "react-router-dom";

const Navbar = (props) => {
    const [userContext, setUserContext] = useContext(UserContext);

    const { token: isUser } = userContext;

    const activeNavLinkStyle = "nav-link active border-dark border-bottom";

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink to={isUser ? "user/home" : "home"} className="navbar-brand">
                    Play2Gether
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {isUser ? (
                            <NavLink
                                to="/user/newPlace"
                                className={({ isActive }) =>
                                    isActive ? activeNavLinkStyle : "nav-link"
                                }
                            >
                                Dodaj Miejsce
                            </NavLink>
                        ) : (
                            <NavLink
                                to="/home"
                                className={({ isActive }) =>
                                    isActive ? activeNavLinkStyle : "nav-link"
                                }
                            >
                                Coś
                            </NavLink>
                        )}
                    </div>
                    <div className="navbar-nav ms-auto">
                        {isUser ? (
                            <>
                                <NavLink
                                    to="user/account"
                                    className={({ isActive }) =>
                                        isActive ? activeNavLinkStyle : "nav-link"
                                    }
                                >
                                    Konto
                                </NavLink>
                                <NavLink
                                    to="/home"
                                    className="nav-link"
                                    onClick={props.logoutHandler}
                                >
                                    Wyloguj
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        isActive ? activeNavLinkStyle : "nav-link"
                                    }
                                >
                                    Logowanie
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        isActive ? activeNavLinkStyle : "nav-link"
                                    }
                                >
                                    Rejestracja
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
