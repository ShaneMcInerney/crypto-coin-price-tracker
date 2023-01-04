import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  useFetchAll,
  UseFetchAllProps,
} from "../../common/hooks/useFetchAll.hook";
import { CoinDetails } from "../../common/models/coin-details.model";
import { SupportedTickers } from "../../common/models/supported-tickers.model";
import { APIUtils } from "../../common/utils/api.utils";

interface DetailsModel {
  Data: {
    [ticker: string]: {
      CoinInfo: CoinDetails;
    };
  };
}

/**
 * Hook for retrieving details of the given coin
 * @param props support ticker value
 * @returns
 */
export const useCoinDetails = (props: { ticker: SupportedTickers }) => {
  const { ticker } = props;
  const fiat = useSelector((state: RootState) => state.data.fiat);

  const [fetchProps, setFetchProps] = useState<UseFetchAllProps>({
    dataUrls: [],
  });
  const { result, loading } = useFetchAll<DetailsModel>(fetchProps);

  const coinInfo = result?.[0]?.Data[ticker]?.CoinInfo;

  const createDataUrl = () => {
    const coinUrl = APIUtils.createCoinDetailsRequestUrl(ticker, fiat);

    setFetchProps({ dataUrls: [coinUrl] });
  };

  useEffect(() => {
    createDataUrl();
  }, [ticker, fiat]);

  return { coinInfo, loading };
};
