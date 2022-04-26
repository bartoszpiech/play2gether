import React, { Component } from 'react';

import { PageNavbar } from './styled/PageNavbar';
import { Heading } from './styled/Heading';
import { MenuIcon } from './styled/MenuIcon';
import { NavMenu, NavMenuProps} from './styled/NavMenu';
import { NavLink } from './styled/NavLink';
import { MenuItems } from './MenuItems';

export interface NavbarProps {
    title?: string;
    children?: React.ReactNode; // dunno why?
}

export default class Navbar extends Component<NavbarProps> {
    state = { clicked: false };
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }
    render() {
        return(
            <PageNavbar>
                <Heading><i className="fa-solid fa-volleyball" />{ this.props.title }</Heading>
                <MenuIcon onClick={ this.handleClick }>
                    <i className={ this.state.clicked ? "fas fa-times" : "fas fa-bars" } />
                </MenuIcon>
                <NavMenu isActive={ this.state.clicked }>
                    { MenuItems.map((item, index) => {
                        return(
                            <li key={ index }>
                                <NavLink href={item.url} isSignupButton={ item.isSignupButton }>
                                    {item.title}
                                </NavLink>
                            </li>
                            )
                    })}
                </NavMenu>
            </PageNavbar>
        );
    }
}

