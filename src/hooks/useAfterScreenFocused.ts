import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';

/**
 *
 * @param run Harap wrap dengan useCallback
 */
export const useAfterScreenFocused = (
  run: Function | undefined = undefined,
) => {
  const [ready, setReady] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setReady(true);
      if (run) {
        run();
      }
    }, [run]),
  );

  return ready;
};
