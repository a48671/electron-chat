import React, { useEffect, useState } from 'react';
import { RegisterForm } from "../components/register-form";
import { LoginForm } from "../components/login-form";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { LoadingView } from "../components/shared/loading.view";

export const WelcomeView = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const isChecking = useSelector(({ auth }) => auth.isChecking);
  const user = useSelector(({ auth }) => auth.user);

  const navigate = useNavigate();

  const text = isLoginView ? ['Not registered yet?', 'Register'] : ['Want to login?', 'Login'];

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  if (isChecking) {
    return <LoadingView />
  }

  return (
    <div className="centered-view">
      <div className="centered-container">
        {isLoginView ? <LoginForm /> : <RegisterForm />}
        <small className="form-text text-muted mt-2">{text[0]}
          <span
            onClick={() => setIsLoginView(!isLoginView)}
            className="btn-link ml-2">{text[1]}</span>
        </small>
      </div>
    </div>
  );
};
