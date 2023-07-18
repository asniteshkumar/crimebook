import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./App.css";

import RootLayout from "./pages/Root";
import SignupPage, { action as signupAction } from "./pages/Signup";
import LoginPage, { action as loginAction } from "./pages/Login";
import ResetPwdPage, { action as resetLoader } from "./pages/ResetPwd";
import { action as logoutAction } from "./pages/Logout";

import PostsPage, { loader as postsLoader } from "./pages/Posts";
import NewPostPage, { action as newPostAction } from "./pages/NewPost";
import PostDetailPage, {
  loader as postDetailLoader,
  action as deletePostAction,
} from "./pages/PostDetail";
import EditPostPage, { action as editPostAction } from "./pages/EditPost";

import { loginInfoLoader, checkAuthLoader } from "./util/auth";

import HomePage from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: loginInfoLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signup", element: <SignupPage />, action: signupAction },
      { path: "login", element: <LoginPage />, action: loginAction },
      {
        path: "reset_password",
        element: <ResetPwdPage />,
        action: resetLoader,
      },
      { path: "logout", action: logoutAction },
      {
        path: "explore-posts",
        children: [
          { index: true, element: <PostsPage />, loader: postsLoader },
          {
            path: "new",
            element: <NewPostPage />,
            loader: checkAuthLoader,
            action: newPostAction,
          },
          {
            path: ":postId",
            id: "post-detail",
            loader: postDetailLoader,
            children: [
              {
                index: true,
                element: <PostDetailPage />,
                action: deletePostAction,
              },
              {
                path: "edit",
                element: <EditPostPage />,
                loader: checkAuthLoader,
                action: editPostAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
