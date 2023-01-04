import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CoinList } from "./modules/coin-list/components/coin-list/CoinList";
import { FiatSelector } from "./modules/coin-list/components/fiat-selector/FiatSelector";
import { SideBar } from "./modules/side-bar/components/side-bar/SideBar";
import { SupportedTickers } from "./modules/common/models/supported-tickers.model";
import { RootState } from "./store";

// creating empty routes array to populate
const routes: {
  path: string;
  sidebar: () => JSX.Element;
}[] = [];

/**
 * Setting up routes for each ticker we support
 */
Object.values(SupportedTickers).forEach((ticker) => {
  routes.push({
    path: `/${ticker}`,

    sidebar: () => <SideBar ticker={ticker} />,
  });
});

/**
 * Main app component
 */
export const App = () => {
  // retrieves the currently selected fiat value from our state
  const fiat = useSelector((state: RootState) => state.data.fiat);

  // list of coins supported by default
  const [defaultCoins] = useState<SupportedTickers[]>([
    SupportedTickers.BTC,
    SupportedTickers.ETH,
    SupportedTickers.FTM,
    SupportedTickers.IOTA,
    SupportedTickers.ADA,
    SupportedTickers.HBAR,
    SupportedTickers.ATOM,
    SupportedTickers.MATIC,
    SupportedTickers.LUNA,
    SupportedTickers.CRV,
    SupportedTickers.VET,
  ]);

  // setter getter for coin list, really only
  const [coinList, setCoinList] = useState<SupportedTickers[]>(defaultCoins);

  /**
   * Refreshes coin list, by resetting the default list of coins
   * a little bit hacky, but fine for now
   */
  const refreshCoins = () => {
    setCoinList([...defaultCoins]);
  };

  return (
    <>
      <div className="App">
        <header className="appHeader">
          <h1 className="title">Crypto Currency Price Tracker</h1>
        </header>
        <FiatSelector />
        <button onClick={refreshCoins}>Refresh</button>
        <CoinList defaultCoins={coinList} fiat={fiat} />

        <Routes>
          {routes.map(({ path, sidebar }) => (
            <Route key={path} path={path} element={sidebar()} />
          ))}
        </Routes>
      </div>
    </>
  );
};
