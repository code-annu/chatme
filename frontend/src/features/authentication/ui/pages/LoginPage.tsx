import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../../../common/components/button/PrimaryButton";
import { PasswordInputField } from "../../../../common/components/input/PasswordInputField";
import { TextInputField } from "../../../../common/components/input/TextInputField";
import { AppRoutes } from "../../../../router";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hook";
import { loginUser } from "../../state/auth-thunk";
import { ErrorText } from "../../../../common/components/text/ErrorText";
export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate(AppRoutes.HOME);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold text-gray-900 tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your details to sign in
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <TextInputField
              label="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              required
            />

            <div className="space-y-1">
              <PasswordInputField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ErrorText error={login.error?.error.message} />
          </div>

          <div>
            <PrimaryButton
              type="submit"
              isLoading={login.loading}
              className="w-full"
            >
              Login
            </PrimaryButton>
          </div>

          <div className="text-sm text-center">
            <span className="text-gray-500">Don't have an account? </span>
            <Link
              to={AppRoutes.SIGNUP}
              className="font-medium text-green-600 hover:text-green-500 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
