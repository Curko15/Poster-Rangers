export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (user) => sessionStorage.setItem("authenticatedUser", user);

export const isUserLoggedIn = () => {
    return sessionStorage.getItem("authenticatedUser") !== null;
}

export const setConferenceId = (id) => sessionStorage.setItem("conferenceId", id);

export const getConferenceId = () => sessionStorage.getItem("conferenceId");

export const userLogOut = () => {
    sessionStorage.removeItem("authenticatedUser");
};

export const getLoggedInUser = () => { return sessionStorage.getItem("authenticatedUser") }
