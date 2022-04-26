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
        title: 'Kontakt',
        url: '#',
    },
    {
        title: 'O nas',
        url: '#',
    },
    {
        title: 'Sign up',
        url: '#',
        isSignupButton: true,
    }
]
