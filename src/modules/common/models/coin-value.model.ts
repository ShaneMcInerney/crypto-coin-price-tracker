import { SupportedTickers } from "./supported-tickers.model";

/**
 * Model for coin data displayed in ui
 */
export interface CoinValue {
  id: SupportedTickers;
  ticker: SupportedTickers;
  price: number;
}
