import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const initialState = {
    user: null,
    isAuthenticated: false
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload, isAuthenticated: true }
        case 'logout':
            return { ...initialState }
        default:
            throw new Error('Invalid action type....')
    }
}

const AuthProvider = ({ children }) => {
    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState)

    const login = (email, password) => {
        if (email === FAKE_USER.email, password === FAKE_USER.password) dispatch({ type: 'login', payload: FAKE_USER })
        else throw new Error('Cridentails are incorrect...')
    }

    const logout = () => {
        dispatch({ type: 'logout' })
    }

    return <AuthContext.Provider value={{
        login,
        logout,
        user,
        isAuthenticated
    }}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('Context is used outside of the provider....')
    return context
}

export { AuthProvider, useAuth }