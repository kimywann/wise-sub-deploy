import { useState } from "react";

import useSigninInput from "./hooks/useSigninInput";
import usePasswordInput from "./hooks/usePasswordInput";

import { useNavigate } from "react-router-dom";
import { signin } from "./api/sign-in";

function SignInPage() {
  const { email, emailRef, onChangeEmail } = useSigninInput();
  const [password, passwordRef, onChangePassword] = usePasswordInput();
  const [errors, setErrors] = useState<{
    emailError?: string;
    domainError?: string;
    passwordError?: string;
    loginFailError?: string;
  }>({});

  const navigate = useNavigate();

  const validateSigninForm = (): boolean => {
    if (!email?.trim()) {
      setErrors({ emailError: "이메일을 입력해주세요." });
      emailRef.current?.focus();
      return false;
    }
    if (!password?.trim()) {
      setErrors({ passwordError: "비밀번호를 입력해주세요." });
      passwordRef.current?.focus();
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSigninSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSigninForm()) {
      return;
    }

    try {
      await signin(email, password);
      navigate("/subscription");
    } catch (error) {
      console.error("로그인 오류:", error);

      if (
        error instanceof Error &&
        error.message === "Invalid login credentials"
      ) {
        setErrors({
          loginFailError: "이메일 또는 비밀번호가 일치하지 않습니다.",
        });
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-lg px-4">
      <div className="mt-20 flex justify-center">
        <div className="w-full max-w-lg bg-white p-8">
          <h2 className="mb-6 text-center text-2xl font-bold">로그인</h2>
          <form onSubmit={handleSigninSubmit} className="flex flex-col gap-4">
            <span>이메일</span>

            <input
              ref={emailRef}
              type="text"
              value={email}
              onChange={onChangeEmail}
              className="rounded-md border border-gray-300 px-4 py-2"
            />
            {errors.emailError && (
              <span className="text-sm text-red-500">{errors.emailError}</span>
            )}
            <span>비밀번호</span>
            <input
              ref={passwordRef}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={onChangePassword}
              className="rounded-md border border-gray-300 px-4 py-2"
            />
            {errors.passwordError && (
              <span className="text-sm text-red-500">
                {errors.passwordError}
              </span>
            )}
            {errors.loginFailError && (
              <span className="text-sm text-red-500">
                {errors.loginFailError}
              </span>
            )}

            <button
              type="submit"
              className="mt-2 rounded-md bg-indigo-500 py-2 text-white hover:cursor-pointer hover:bg-indigo-600"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
