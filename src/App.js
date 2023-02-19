import React, { useContext, useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout, {loader as userInfoLoader} from "./pages/Root";
import LoginPage, { action as loginAction } from "./pages/Login";
import NotificationsPage from "./pages/Notifications";
import MessagingPage from "./pages/Messaging";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import AccountPage from "./pages/Account";
import ThemeContext from "./store/context/theme-context";
import CreateNewAccountPage, {
  action as createNewAccountAction,
} from "./pages/CreateNewAccount";
import { action as logoutAction } from "./pages/Logout";

const App = () => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  useEffect(() => {
    // localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const router = createBrowserRouter([
    { path: "/", element: <LoginPage />, action: loginAction },
    {
      path: "/createNewAccount",
      element: <CreateNewAccountPage />,
      action: createNewAccountAction,
    },
    {
      path: "/:userId",
      element: <RootLayout />,
      id: 'root',
      loader: userInfoLoader,
      children: [
        { path: "home", element: <HomePage /> },
        { path: "notifications", element: <NotificationsPage /> },
        { path: "messaging", element: <MessagingPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "account", element: <AccountPage /> },
        { path: "logout", action: logoutAction },
      ],
    },
  ]);

  return (
    <div className={`container ${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
