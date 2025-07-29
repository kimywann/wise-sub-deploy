import { useState, useRef, useCallback } from "react";

export default function usePasswordInput() {
  const [password, setPassword] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  return [password, passwordRef, onChangePassword] as const;
}
