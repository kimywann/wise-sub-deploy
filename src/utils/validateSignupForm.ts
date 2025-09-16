export const validateSignupForm = (
  email: string,
  password: string,
  confirmPassword: string,
  nickname: string,
): {
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
  nicknameError?: string;
} => {
  const newErrors: {
    emailError?: string;
    passwordError?: string;
    confirmPasswordError?: string;
    nicknameError?: string;
  } = {};

  if (!email?.trim()) {
    newErrors.emailError = "이메일을 입력해주세요.";
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

  if (!nickname?.trim()) {
    newErrors.nicknameError = "닉네임을 입력해주세요.";
  }

  return newErrors;
};
