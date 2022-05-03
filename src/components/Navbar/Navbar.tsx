import React, { Component } from 'react';


import { PageNavbar } from './styled/PageNavbar';
import { Heading } from './styled/Heading';
import { MenuIcon } from './styled/MenuIcon';
import { NavMenu } from './styled/NavMenu';
import { StyledNavLink } from './styled/NavLink';

import { MenuItems } from './MenuItems';

interface NavbarProps {
    title?: string;
    icon?: string;
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
                <Heading><i className={ this.props.icon }/>{ this.props.title }</Heading>
                <MenuIcon onClick={ this.handleClick }>
                    <i className={ this.state.clicked ? "fa-solid fa-arrow-left" : "fa-solid fa-arrow-right" } />
                </MenuIcon>
                <NavMenu isActive={ this.state.clicked } menuHeight={ MenuItems.length * 100 + 20} >
                    { MenuItems.map((item, index) => {
                        return(
                            <li key={ index }>
                                <StyledNavLink to={ item.url } isSignupButton={ item.isSignupButton } onClick={ this.handleClick }>
                                    { item.title }
                                </StyledNavLink>
                            </li>
                            )
                    })}
                </NavMenu>
            </PageNavbar>
        );
    }
}

