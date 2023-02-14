import {createContext} from 'react';

const AuthContext = createContext({
    currentUser: null,
    signup: () => {}
});

export default AuthContext;