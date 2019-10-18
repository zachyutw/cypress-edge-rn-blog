import React, { createContext, useState, useCallback, useEffect, useMemo } from 'react';

const Context = createContext({});

export const Provider = (props) => {
    const [ state, setState ] = useState({ global: true });
    return <Context.Provider value={{ state, setState }}>{props.children}</Context.Provider>;
};

export const withContext = (Componet) => (props) => {
    return (
        <Provider>
            <Componet {...props} />
        </Provider>
    );
};

export default Context;
