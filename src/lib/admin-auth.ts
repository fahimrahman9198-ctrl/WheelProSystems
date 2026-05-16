"use client";

const CREDENTIALS = { username: "demo-admin", password: "wheelpro-demo" };

export function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("wheelpro-demo-admin") === "true";
}

export function loginAdmin(username: string, password: string) {
  const valid = username === CREDENTIALS.username && password === CREDENTIALS.password;
  if (valid) {
    window.localStorage.setItem("wheelpro-demo-admin", "true");
  }
  return valid;
}

export function logoutAdmin() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("wheelpro-demo-admin");
  }
}

export const isAuthenticated = isAdminAuthenticated;
export const login = loginAdmin;
export const logout = logoutAdmin;
