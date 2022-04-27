import React from 'react';

export interface MenuItems {
    title: string;
    url: string;
    isSignupButton?: boolean;
};

export const MenuItems = [
    {
        title: 'Home',
        url: '#',
    },
    {
        title: 'Wydarzenia',
        url: '#',
    },
    {
        title: 'Premium',
        url: '#',
    },
    {
        title: 'Konto',
        url: '#',
    },
    {
        title: 'Sign up',
        url: '#',
        isSignupButton: true,
    }
]
