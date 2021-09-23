import { useCallback, useEffect, useState } from "react";

export default function useAsync(callback: Function, dependencies = []) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [value, setValue] = useState<any>();

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, value };
}
