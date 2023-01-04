import { Link } from "react-router-dom";
import { CoinLogo } from "../../../common/components/coin-logo/CoinLogo";
import { CoinValue } from "../../../common/models/coin-value.model";
import "./ListItem.css";

export const ListItem = (props: { coin: CoinValue }) => {
  const { price, ticker } = props.coin;
  const link = `/${ticker}`;
  return (
    <div className="content">
      <Link className="item" to={link.toLowerCase()}>
        <CoinLogo ticker={ticker}></CoinLogo>
        <span className="ticker">{ticker}</span>
        {""}
      </Link>
      <span className="price">{price}</span>
    </div>
  );
};
