import { Fiat } from "../models/fiat.model";
import { SupportedTickers } from "../models/supported-tickers.model";

export class APIUtils {
  public static readonly baseUrl = "https://min-api.cryptocompare.com/data";

  public static createCoinPriceRequestUrl = (
    ticker: SupportedTickers,
    fiat: Fiat
  ): string => {
    const paramsObj = { fsym: ticker, tsyms: fiat };
    const searchParams = new URLSearchParams(paramsObj).toString();
    return `${APIUtils.baseUrl}/price?${searchParams}`;
  };

  public static createCoinDetailsRequestUrl = (
    ticker: SupportedTickers,
    fiat: Fiat
  ): string => {
    const paramsObj = { fsyms: ticker, tsyms: fiat };
    const searchParams = new URLSearchParams(paramsObj).toString();

    return `${APIUtils.baseUrl}/blockchain/mining/calculator?${searchParams}`;
  };
}
