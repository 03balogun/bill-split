export const setUserData = (payload) => Promise.resolve().then(()=>{
    window.localStorage.setItem('currentUser', JSON.stringify(payload));
});
export const removeUserData = () => Promise.resolve().then(()=>{
    window.localStorage.removeItem('currentUser');
});

export const getUserFromLocalStorage = () => Promise.resolve().then(()=>{
    const currentUser = window.localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : {}
});
