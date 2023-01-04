import React from "react";
import { Link } from "react-router-dom";
import { CoinLogo } from "../../../common/components/coin-logo/CoinLogo";
import { SupportedTickers } from "../../../common/models/supported-tickers.model";
import "./SideBarHeader.css";

export const SideBarHeader: React.FC<{ ticker: SupportedTickers }> = ({
  ticker,
}) => {
  return (
    <>
      <Link className="closeBtn" to="/">
        <button>Close</button>
      </Link>
      <div className="sideBarHeader">
        <h3 className="heading">{ticker}</h3>

        <CoinLogo ticker={ticker} size={64}></CoinLogo>
      </div>
    </>
  );
};
