import { useState, useRef, useCallback } from "react";

export default function useEmailInput() {
  const [id, setId] = useState("");
  const idRef = useRef<HTMLInputElement>(null);

  const [domain, setDomain] = useState("");
  const domainRef = useRef<HTMLInputElement>(null);

  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, []);

  const onChangeDomain = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDomain(e.target.value);
    },
    [],
  );
  return {
    id,
    domain,
    idRef,
    domainRef,
    onChangeId,
    onChangeDomain,
  };
}
