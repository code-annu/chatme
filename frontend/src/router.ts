import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./features/authentication/ui/pages/LoginPage";
import { SignupPage } from "./features/authentication/ui/pages/SignupPage";
import { HomePage } from "./features/dashboard/HomePage";

export enum AppRoutes {
  LOGIN = "/login",
  SIGNUP = "/signup",
  HOME = "/",
  PROFILE = "/profile",
  NOTIFICATION = "/notification",
  HELP = "/help",
  SETTING = "/setting",
  DOCUMENTS = "/documents",
}

export const appRouter = createBrowserRouter([
  { path: AppRoutes.LOGIN, Component: LoginPage },
  { path: AppRoutes.SIGNUP, Component: SignupPage },
  { path: AppRoutes.HOME, Component: HomePage },
]);
