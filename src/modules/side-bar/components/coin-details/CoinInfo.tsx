import { useEffect, useState } from "react";
import { CoinDetails } from "../../../common/models/coin-details.model";
import "./CoinInfo.css";

/**
 * Coin Info component properties
 */
export interface CoinInfoProps {
  info: CoinDetails | undefined;
}

/**
 * Coin info component
 * displays detailed info for a coin
 * @param param0
 * @returns
 */
export const CoinInfo: React.FC<CoinInfoProps> = ({ info }) => {
  const [details, setDetails] = useState<JSX.Element[]>([
    <span key="coin-not-found">Coin Info Not Found</span>,
  ]);

  /**
   * If there is coin info to display
   * this method will create list items for each
   * key value pair of info on our coin object
   */
  const renderCoinInfo = () => {
    const updatedDetails: JSX.Element[] = [];
    if (info) {
      Object.keys(info).map((key) => {
        const splitKey = key.split(/(?=[A-Z])/);

        const coinDetail = (
          <li className="detail" key={key}>
            {[...splitKey].map((value) => value)}:{" "}
            {info?.[key as keyof CoinDetails]}
          </li>
        );

        updatedDetails.push(coinDetail);
      });

      if (Array.isArray(updatedDetails) && updatedDetails.length)
        setDetails(updatedDetails);
    }
  };

  useEffect(() => {
    renderCoinInfo();
  }, [info]);

  return <ul className="details">{details}</ul>;
};
