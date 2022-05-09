/* TODO:
 * można dać atrybut userLoggedIn: boolean, żeby sprawdzać czy wyświetlać itemy
 * tylko dla zalogowanych użytkoników
 */
export interface MenuItemsInterface {
    title: string;
    url: string;
    isSignUpButton?: boolean;
    logout?: boolean;
}

export const MenuItems = [
    {
        title: "Home",
        url: "/home",
    },
    {
        title: "Rejestracja",
        url: "/register",
        isSignUpButton: true,
    },
    {
        title: "Logowanie",
        url: "/login",
        isSignUpButton: true,
    },
];

export const MenuItemsLoggedIn = [
    {
        title: "Home",
        url: "user/home",
    },
    {
        title: "Premium",
        url: "user/premium",
    },
    {
        title: "Nowe miejsce",
        url: "/user/place/newPlace",
    },
    {
        title: "Konto",
        url: "user/account",
    },
    {
        title: "Wyloguj",
        url: "/login",
        logout: true,
        isSignUpButton: true,
    },
];
