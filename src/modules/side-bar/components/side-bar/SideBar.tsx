import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useFetchAll,
  UseFetchAllProps,
} from "../../../common/hooks/useFetchAll.hook";
import { CoinDetails } from "../../../common/models/coin-details.model";
import { SupportedTickers } from "../../../common/models/supported-tickers.model";
import { RootState } from "../../../../store";
import { CoinInfo } from "../coin-details/CoinInfo";
import { Loader } from "../../../common/components/loader/Loader";
import "./SideBar.css";
import { SideBarHeader } from "../side-bar-header/SidebarHeader";
import { APIUtils } from "../../../common/utils/api.utils";
import { useCoinDetails } from "../../hooks/useCoinDetails.hook";

interface SideBarProps {
  ticker: SupportedTickers;
}
/**
 *
 * @param props
 * @returns
 */
export const SideBar: React.FC<SideBarProps> = ({ ticker }) => {
  const { coinInfo, loading } = useCoinDetails({ ticker });

  return (
    <div className="sidebar">
      <SideBarHeader ticker={ticker}></SideBarHeader>

      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <CoinInfo info={coinInfo}></CoinInfo>
        </>
      )}
    </div>
  );
};
