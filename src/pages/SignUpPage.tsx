import { toast } from "sonner";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useSignupForm from "@/hooks/useSignupForm";

import { signup } from "@/api/auth";
import { validateSignupForm } from "@/utils/validate-signup";

function SignUpPage() {
  const {
    email,
    emailRef,
    onChangeEmail,
    password,
    passwordRef,
    onChangePassword,
    confirmPassword,
    confirmPasswordRef,
    onChangeConfirmPassword,
  } = useSignupForm();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    emailError?: string;
    passwordError?: string;
    confirmPasswordError?: string;
    nicknameError?: string;
    generalError?: string;
  }>({});
  const navigate = useNavigate();

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateSignupForm(email, password, confirmPassword);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        email,
        password,
      });
      navigate("/subscription");

      toast.success("회원가입이 완료되었습니다!");
    } catch (error) {
      console.error("회원가입 오류:", error);

      setErrors({
        generalError:
          error instanceof Error
            ? error.message
            : "회원가입 중 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-lg px-4">
      <div className="mt-20 flex justify-center">
        <div className="w-full max-w-lg bg-white p-8">
          <h2 className="mb-6 text-center text-2xl font-bold">회원가입</h2>

          {errors.generalError && (
            <div className="mb-4 rounded-md bg-red-50 text-sm text-red-600">
              {errors.generalError}
            </div>
          )}

          <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span>이메일</span>
              <span className="text-sm text-red-500">*</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                ref={emailRef}
                type="text"
                value={email}
                onChange={onChangeEmail}
                placeholder="example@domain.com"
                disabled={isLoading}
                className="w-full rounded-md border border-gray-300 px-4 py-2 disabled:bg-gray-100"
              />
            </div>
            {errors.emailError && (
              <span className="text-sm text-red-500">{errors.emailError}</span>
            )}

            <div className="flex items-center gap-2">
              <span>비밀번호</span>
              <span className="text-sm text-red-500">*</span>
            </div>
            <input
              ref={passwordRef}
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={onChangePassword}
              disabled={isLoading}
              className="w-full rounded-md border border-gray-300 px-4 py-2 disabled:bg-gray-100"
            />

            <div className="flex items-center gap-2">
              <span>비밀번호 확인</span>
              <span className="text-sm text-red-500">*</span>
            </div>
            <input
              ref={confirmPasswordRef}
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={onChangeConfirmPassword}
              disabled={isLoading}
              className="w-full rounded-md border border-gray-300 px-4 py-2 disabled:bg-gray-100"
            />
            {errors.confirmPasswordError && (
              <span className="text-sm text-red-500">
                {errors.confirmPasswordError}
              </span>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full rounded-md bg-indigo-500 py-3 font-medium text-white transition-colors hover:cursor-pointer hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isLoading ? "처리 중..." : "계정 생성"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
