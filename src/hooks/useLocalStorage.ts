import { useEffect, useState } from 'react';

function useLocalStorage(key: string, initialState = ''): [string, React.Dispatch<React.SetStateAction<string>>] {

  const [value, setValue] = useState(() => localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;
