import { useEffect, useRef } from "react";

/**
 * Hook for storing ref to previous value (taken from https://blog.logrocket.com/accessing-previous-props-state-react-hooks/)
 * @param value value to store
 * @returns
 */
export const usePreviousValue = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    //assign the value of ref to the argument
    ref.current = value;
    //this code will run when the value of 'value' changes
  }, [value]);
  //in the end, return the current ref value.
  return ref.current;
};
