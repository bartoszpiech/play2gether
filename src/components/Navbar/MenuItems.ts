/*
interface MenuItems {
    title: string;
    url: string;
    isSignupButton?: boolean;
};
*/

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
        title: 'Nowe miejsce',
        url: '/user/newPlace',
    },
    {
        title: 'Rejestracja',
        url: '/register',
        isSignupButton: true,
    },
    {
        title: 'Logowanie',
        url: '/login',
        isSignupButton: true,
    }
]
