import { useEffect, useState } from "react";

/**
 * Use fetch all props model
 */
export interface UseFetchAllProps {
  dataUrls: string[];
}

/**
 * Hook for making a series of async calls
 * @param props use fetch all
 * @returns
 */
export const useFetchAll = <T>(
  props: UseFetchAllProps
): { result: T[] | null; loading: boolean; isError: boolean } => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [result, setResult] = useState<T[] | null>(null);

  /**
   * Attempts to fetch for each data url given,
   * set the loading, error and response property on our state
   */
  const loadData = async () => {
    try {
      setLoading(true);

      let responses: T[] = [];

      for (const dataUrl of props.dataUrls) {
        const data = await fetch(dataUrl);

        const response = (await data?.json()) as T;

        responses.push(response);
      }

      setResult(responses);
    } catch (ex) {
      console.log(ex);

      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [props.dataUrls]);

  return { result, loading, isError };
};
