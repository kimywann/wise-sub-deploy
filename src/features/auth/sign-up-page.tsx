import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useSignupInput from "./hooks/useSignupInput";
import usePasswordInput from "./hooks/usePasswordInput";

import { signup } from "./api/sign-up";

function SignUpPage() {
  const {
    id,
    domain,
    nickname,
    birthYear,
    idRef,
    domainRef,
    nicknameRef,
    birthYearRef,
    onChangeId,
    onChangeDomain,
    onChangeNickname,
    onChangeBirthYear,
  } = useSignupInput();

  const [password, passwordRef, onChangePassword] = usePasswordInput();
  const [errors, setErrors] = useState<{
    nicknameError?: string;
    idError?: string;
    domainError?: string;
    passwordError?: string;
    birthYearError?: string;
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
    } else if (password.length < 6) {
      newErrors.passwordError = "비밀번호는 6자 이상이어야 합니다.";
    }
    if (!nickname?.trim()) {
      newErrors.nicknameError = "닉네임을 입력해주세요.";
    }
    if (!birthYear?.trim()) {
      newErrors.birthYearError = "출생년도를 입력해주세요.";
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
      const birthYearNumber = parseInt(birthYear, 10);

      await signup({
        email,
        password,
        nickname,
        birthYear: birthYearNumber,
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

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
            <span>이메일</span>
            <div className="flex items-center gap-2">
              <input
                ref={idRef}
                type="text"
                value={id}
                onChange={onChangeId}
                placeholder="example"
                disabled={isLoading}
                className="w-4/5 rounded-md border border-gray-300 px-4 py-2 disabled:bg-gray-100"
              />
              <span>@</span>
              <input
                ref={domainRef}
                type="text"
                value={domain}
                onChange={onChangeDomain}
                placeholder="domain.com"
                disabled={isLoading}
                className="rounded-md border border-gray-300 px-4 py-2 disabled:bg-gray-100"
              />
            </div>
            {errors.idError && (
              <span className="text-sm text-red-500">{errors.idError}</span>
            )}
            {errors.domainError && (
              <span className="text-sm text-red-500">{errors.domainError}</span>
            )}

            <span>비밀번호</span>
            <input
              ref={passwordRef}
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={onChangePassword}
              disabled={isLoading}
              className="rounded-md border border-gray-300 px-4 py-2 disabled:bg-gray-100"
            />
            {errors.passwordError && (
              <span className="text-sm text-red-500">
                {errors.passwordError}
              </span>
            )}

            <span>닉네임</span>
            <input
              ref={nicknameRef}
              type="text"
              value={nickname}
              onChange={onChangeNickname}
              disabled={isLoading}
              className="w-50 rounded-md border border-gray-300 px-4 py-2 disabled:bg-gray-100"
            />
            {errors.nicknameError && (
              <span className="text-sm text-red-500">
                {errors.nicknameError}
              </span>
            )}

            <span>출생년도</span>
            <select
              ref={birthYearRef}
              value={birthYear}
              onChange={onChangeBirthYear}
              disabled={isLoading}
              className="w-1/4 rounded-md border border-gray-300 px-4 py-2 disabled:bg-gray-100"
            >
              <option value=""></option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.birthYearError && (
              <span className="text-sm text-red-500">
                {errors.birthYearError}
              </span>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 rounded-md bg-indigo-500 py-2 text-white hover:cursor-pointer hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-400"
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
