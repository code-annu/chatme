import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInputField } from "../../../../common/components/input/TextInputField";
import { PrimaryButton } from "../../../../common/components/button/PrimaryButton";
import { PasswordInputField } from "../../../../common/components/input/PasswordInputField";
import { AppRoutes } from "../../../../router";
import { useAppSelector, useAppDispatch } from "../../../../app/app-hook";
import { signupUser } from "../../state/auth-thunk";
import { ErrorText } from "../../../../common/components/text/ErrorText";

export const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: undefined,
    email: "",
    password: "",
    avatarUrl: undefined,
    bio: undefined,
  });

  const navigate = useNavigate();
  const { signup } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(signupUser(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate(AppRoutes.HOME);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold text-gray-900 tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join Chatme effectively today
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextInputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
              <TextInputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
              />
            </div>

            <TextInputField
              label="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              required
            />

            <PasswordInputField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <TextInputField
              label="Avatar URL (Optional)"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
            />

            <TextInputField
              label="Bio (Optional)"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
          </div>

          <div className="flex items-center justify-center">
            <ErrorText error={signup.error?.error.message} />
          </div>

          <div>
            <PrimaryButton
              type="submit"
              isLoading={signup.loading}
              className="w-full"
            >
              Sign up
            </PrimaryButton>
          </div>

          <div className="text-sm text-center">
            <span className="text-gray-500">Already have an account? </span>
            <Link
              to={AppRoutes.LOGIN}
              className="font-medium text-green-600 hover:text-green-500 transition-colors"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
