export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (email, password) => {
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("password", password);
};

export const isUserLoggedIn = () => {
  return sessionStorage.getItem("email") !== null;
};

export const setConferenceId = (id) =>
  sessionStorage.setItem("conferenceId", id);

export const getConferenceId = () => sessionStorage.getItem("conferenceId");

export const userLogOut = () => {
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("password");
};

export const getLoggedInUser = (email, password) => {
  let userEmail = sessionStorage.getItem("email", email);
  let userPass = sessionStorage.getItem("password", password);
  return { userEmail, userPass };
};
