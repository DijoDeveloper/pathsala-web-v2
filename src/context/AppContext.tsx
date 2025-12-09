import React, { createContext, useReducer, useContext, ReactNode } from 'react';


type AppState = {
    // User related state
    user: {
        isAuthenticated: boolean;
        role: string;
        permissions: string[];
        profile: any; // Replace with your user profile type
    };


    // Add other global state here
    theme: 'light' | 'dark';
    isLoading: boolean;
};

type AppAction =
    | { type: 'SET_USER'; payload: Partial<AppState['user']> }
    | { type: 'SET_SELECTED_ROLE'; payload: string }
    | { type: 'UPDATE_PERMISSIONS'; payload: { role: string; permissions: any } }
    | { type: 'TOGGLE_THEME' }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'ADD_NOTIFICATION'; payload: any };

// Initial state
const initialState: AppState = {
    user: {
        isAuthenticated: false,
        role: '',
        permissions: [],
        profile: null,
    },

    theme: 'light',
    isLoading: false,
};

// Create context
const AppContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };

        case 'UPDATE_PERMISSIONS':
            // Add your permission update logic here
            return state;

        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light',
            };

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };

        default:
            return state;
    }
};

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

// Custom hooks for specific state
export const useUser = () => {
    const { state, dispatch } = useAppContext();
    return {
        user: state.user,
        setUser: (userData: Partial<AppState['user']>) =>
            dispatch({ type: 'SET_USER', payload: userData }),
    };
};

export const useTheme = () => {
    const { state, dispatch } = useAppContext();
    return {
        theme: state.theme,
        toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    };
};
