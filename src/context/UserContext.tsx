// import React, { useState, FC, Component } from 'react';



// const defaultState = {
//     token: null,
// };

// // const UserContext = React.createContext<UserInterface>(defaultState);
// const UserContext = React.createContext<UserInterface>([{}, () => {}]);

// let initialState = {};

// const UserProvider: FC = ({children}) => {
//     const [state, setState] = useState(defaultState);

//     return <UserContext.Provider value={[state, setState]}>{children}</UserContext.Provider>;
// };

// export { UserContext, UserProvider };


import React, { useState } from "react";

interface UserInterface {
    token: string;
}



const UserContext = React.createContext([{}, () => {}]);

let initialState = {};

const UserProvider = (props:any) => {
    const [state, setState] = useState(initialState);

    return <UserContext.Provider value={[state, setState]}>{props.children}</UserContext.Provider>;
};

export { UserContext, UserProvider };