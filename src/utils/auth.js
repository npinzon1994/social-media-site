import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
  const currentTime = new Date().getTime();
  const storedTimeOfExpiration = localStorage.getItem('expiration');
  const timeOfExpiration = new Date(storedTimeOfExpiration).getTime();
  const timeLeft = timeOfExpiration - currentTime;
  return timeLeft;
}

export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  const tokenDuration = getTokenDuration();
  if(!token){
    return null;
  }
  
  if(tokenDuration < 0){
    return "TOKEN EXPIRED";
  }

  return token;
};

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

export const tokenLoader = () => {
  return getAuthToken();
};

export const checkAuthLoader = () => {
  const token = getAuthToken();
  if (!token) {
    return redirect("/");
  }
  return token;
};

export const setTokenExpiration = () => {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());
}
