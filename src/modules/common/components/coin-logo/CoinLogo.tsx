import { SupportedTickers } from "../../models/supported-tickers.model";

export const CoinLogo: React.FC<{
  ticker: SupportedTickers;
  size?: number;
}> = ({ ticker, size = 32 }) => {
  const logoSrc = `//logo.chainbit.xyz/${ticker.toLocaleLowerCase()}`;
  return (
    <img src={logoSrc} style={{ width: `${size}px`, height: `${size}px` }} />
  );
};
