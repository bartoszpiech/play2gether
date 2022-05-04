/*
interface MenuItems {
    title: string;
    url: string;
    isSignupButton?: boolean;
};
*/

export const MenuItems = [
    {
        title: 'Premium',
        url: '#',
        login: true,
    },
    {
        title: 'Home',
        url: 'user/home',
        login: true,
    },
    {
        title: 'Home',
        url: '/home',
        login: false,
    },
    {
        title: 'Nowe miejsce',
        url: '/user/newPlace',
        login: true,
    },
    {
        title: 'Rejestracja',
        url: '/register',
        isSignupButton: true,
        login: false,
    },
    {
        title: 'Logowanie',
        url: '/login',
        isSignupButton: true,
        login: false,
    },
    {
        title: 'Wyloguj',
        url: '/login',
        isSignupButton: true,
        login: false,
        logout: true,
    },
]
