// File: components/auth/LoginForm.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  error?: string | null;
}

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const LoginForm = ({ onSubmit, error }: LoginFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          {...register("username")}
          className="form-input"
        />
        {errors.username && <p className="error-text">{errors.username.message}</p>}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          className="form-input"
        />
        {errors.password && <p className="error-text">{errors.password.message}</p>}
        <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"} Password
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      <button type="submit" className="submit-btn">Login</button>
    </form>
  );
};

export default LoginForm;
