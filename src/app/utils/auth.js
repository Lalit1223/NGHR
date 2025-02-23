// utils/auth.js
export const checkToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token || token === "undefined" || token === "null") {
    localStorage.removeItem("authToken");
    return false;
  }
  return true;
};
