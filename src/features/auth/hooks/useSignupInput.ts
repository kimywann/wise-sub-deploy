import { useState, useRef, useCallback } from "react";

export default function useEmailInput() {
  const [id, setId] = useState("");
  const idRef = useRef<HTMLInputElement>(null);

  const [domain, setDomain] = useState("");
  const domainRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState("");
  const nicknameRef = useRef<HTMLInputElement>(null);

  const [birthYear, setBirthYear] = useState("");
  const birthYearRef = useRef<HTMLSelectElement>(null);

  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  const onChangeDomain = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDomain(e.target.value);
    },
    []
  );

  const onChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
    },
    []
  );

  const onChangeBirthYear = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setBirthYear(e.target.value);
    },
    []
  );
  return {
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
  };
}
