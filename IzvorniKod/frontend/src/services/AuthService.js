export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (email, password) => {
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("password", password);
};

export const isUserLoggedIn = () => {
  return sessionStorage.getItem("email") !== null;
};

export const setConferenceId = (id) => sessionStorage.setItem("conference", id);

export const isLoggedInConference = () => {
  return sessionStorage.getItem("conference") !== null;
};
export const logOutFromConference = () =>
  sessionStorage.removeItem("conference");

export const getConferenceId = () => {
  return sessionStorage.getItem("conference");
};

export const userLogOut = () => {
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("password");
};

export const getLoggedInUser = (email, password) => {
  let userEmail = sessionStorage.getItem("email", email);
  let userPass = sessionStorage.getItem("password", password);
  return { userEmail, userPass };
};

export const saveAuthToken = (authToken) => {
  localStorage.setItem("authToken", authToken.token);
};

export const getAuthToken = () => {
  let token = localStorage.getItem("authToken");
  return { token };
};
