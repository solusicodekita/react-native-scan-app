import {useEffect, useState} from 'react';
import {InteractionManager} from 'react-native';

/**
 *
 * @param run Harap wrap dengan useCallback
 */
export const useAfterTransition = (run: Function | undefined = undefined) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) {
      const task = InteractionManager.runAfterInteractions(() => {
        setReady(true);
        if (run) {
          run();
        }
      });
      return task.cancel;
    }
  }, [ready, run]);

  return ready;
};
