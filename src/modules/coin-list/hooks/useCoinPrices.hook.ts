import { useEffect, useState } from "react";
import {
  useFetchAll,
  UseFetchAllProps,
} from "../../common/hooks/useFetchAll.hook";
import { usePreviousValue } from "../../common/hooks/usePreviousValue.hook";
import { CoinValue } from "../../common/models/coin-value.model";
import { Fiat } from "../../common/models/fiat.model";
import { SupportedTickers } from "../../common/models/supported-tickers.model";
import { APIUtils } from "../../common/utils/api.utils";

/**
 * Retrieves coin prices for the given tickers, in the given fiat
 * @param tickers list of tickers to retrieve
 * @param fiat fiat to display price in
 * @returns
 */
export const useCoinPrices = (
  tickers: SupportedTickers[],
  fiat: Fiat
): {
  coins: CoinValue[];
  loading: boolean;
} => {
  const [coins, setCoins] = useState<CoinValue[]>([]);
  const [fetchProps, setFetchProps] = useState<UseFetchAllProps>({
    dataUrls: [],
  });

  const { result, loading } = useFetchAll<{ [fiat: string]: number }>(
    fetchProps
  );

  const previousFiat = usePreviousValue(fiat);
  const previousTickers = usePreviousValue(tickers);

  /**
   * Constructs request urls with given ticker and fiat
   */
  const updateUrls = () => {
    const dataUrls = [];

    for (const ticker of tickers) {
      const coinUrl = APIUtils.createCoinPriceRequestUrl(ticker, fiat);
      dataUrls.push(coinUrl);
    }

    setFetchProps({ dataUrls });
  };

  /**
   * Populates coins state prop, with result from server
   */
  const populateCoinData = () => {
    if (result) {
      let values: CoinValue[] = [];

      result.forEach((fiatValue, index) => {
        const coin: CoinValue = {
          id: tickers[index],
          price: Number(fiatValue[fiat]),
          ticker: tickers[index],
        };
        values.push(coin);
      });
      setCoins(values);
    }
  };

  useEffect(() => {
    populateCoinData();

    const shouldRefreshUrls =
      previousFiat !== fiat || previousTickers !== tickers;

    if (shouldRefreshUrls) {
      updateUrls();
    }
  }, [tickers, fiat, result]);

  return { coins, loading };
};
