import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useSignupInput from "@/hooks/auth/useSignupInput";
import usePasswordInput from "@/hooks/auth/useSignupPassword";

import { signup } from "@/api/auth";

function SignUpPage() {
  const { id, domain, idRef, domainRef, onChangeId, onChangeDomain } =
    useSignupInput();
  const {
    password,
    confirmPassword,
    passwordRef,
    confirmPasswordRef,
    onChangePassword,
    onChangeConfirmPassword,
  } = usePasswordInput();

  const [errors, setErrors] = useState<{
    nicknameError?: string;
    idError?: string;
    domainError?: string;
    passwordError?: string;
    confirmPasswordError?: string;
    generalError?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateSignupForm = (): boolean => {
    const newErrors: typeof errors = {};
    if (!id?.trim()) {
      newErrors.idError = "아이디를 입력해주세요.";
    }
    if (!domain?.trim()) {
      newErrors.domainError = "도메인을 입력해주세요.";
    }
    if (!password?.trim()) {
      newErrors.passwordError = "비밀번호를 입력해주세요.";
    } else if (password.length < 8) {
      newErrors.passwordError = "비밀번호는 8자 이상이어야 합니다.";
    }

    if (!confirmPassword?.trim()) {
      newErrors.confirmPasswordError = "비밀번호 확인을 입력해주세요.";
    } else if (confirmPassword !== password) {
      newErrors.confirmPasswordError = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ 브라우저 기본 동작(페이지 새로고침) 막기

    if (!validateSignupForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const email = `${id}@${domain}`;

      await signup({
        email,
        password,
      });

      alert("회원가입이 완료되었습니다!");
      navigate("/signin");
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
                ref={idRef}
                type="text"
                value={id}
                onChange={onChangeId}
                placeholder="example"
                disabled={isLoading}
                className="w-1/2 rounded-md border border-gray-300 px-4 py-2 disabled:bg-gray-100"
              />
              <span className="px-2 text-gray-500">@</span>
              <input
                ref={domainRef}
                type="text"
                value={domain}
                onChange={onChangeDomain}
                placeholder="domain.com"
                disabled={isLoading}
                className="w-1/2 rounded-md border border-gray-300 px-4 py-2 disabled:bg-gray-100"
              />
            </div>
            {errors.idError && (
              <span className="text-sm text-red-500">{errors.idError}</span>
            )}
            {errors.domainError && (
              <span className="text-sm text-red-500">{errors.domainError}</span>
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
