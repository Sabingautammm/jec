
export const getTokenFromLocalStorage = () => {
    return localStorage.getItem('authToken');
};

export const setTokenToLocalStorage = (token) => {
    localStorage.setItem('authToken', token);
};

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('authToken');
};
