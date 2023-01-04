import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { useCoinPrices } from "../../hooks/useCoinPrices.hook";
import { CoinValue } from "../../../common/models/coin-value.model";
import { Fiat } from "../../../common/models/fiat.model";
import { SortDirection } from "../../../common/models/sort-direction.model";
import { SupportedTickers } from "../../../common/models/supported-tickers.model";
import { PREFERRED_TICKER_ORDER } from "../../../common/utils/localStorage.keys";
import { LocalStorage } from "../../../common/utils/localStorage.utils";
import { SortUtils } from "../../../common/utils/sort.utilities";
import { ListHeader } from "../list-header/ListHeader";
import { ListItem } from "../list-item/ListItem";
import { Loader } from "../../../common/components/loader/Loader";
import "./CoinList.css";
import { ColumnModels } from "./CoinList.model";
import { GrDrag } from "react-icons/gr";
/**
 * Coin List component props
 */
export interface CoinListProps {
  defaultCoins: SupportedTickers[];
  fiat: Fiat;
}

/**
 * Renders a list of coin values
 * @param param0 CoinListProps
 * @returns
 */
export const CoinList: React.FC<CoinListProps> = ({ defaultCoins, fiat }) => {
  const {
    setSortedCoins,
    sortedCoins,
    isDraggingDisabled,
    loading,
    headingClicked,
  } = useCoinList(defaultCoins, fiat);

  if (loading) {
    return (
      <div className="coinList">
        <Loader />
        Loading...
      </div>
    );
  }

  return (
    <div className="coinList">
      <ListHeader headerClicked={headingClicked} />

      <ReactSortable
        tag="ul"
        list={sortedCoins}
        setList={setSortedCoins}
        disabled={isDraggingDisabled}
        className="list"
        handle=".myHandle"
        dragClass="drag"
        selectedClass="drag"
        onSort={() => onMove(sortedCoins)}
        easing="cubic-bezier(1, 0, 0, 1)"
      >
        {sortedCoins.map((coinData) => (
          <li key={coinData.ticker} className="listItem">
            {!isDraggingDisabled && <GrDrag className="myHandle"></GrDrag>}
            <ListItem coin={coinData}></ListItem>
          </li>
        ))}
      </ReactSortable>
    </div>
  );
};

/**
 * Returns state variables, and functions for modifying state
 * @param tickers list of tickers to fetch the price of
 * @param fiat fiat currency for prices
 * @returns
 */
const useCoinList = (tickers: SupportedTickers[], fiat: Fiat) => {
  const { coins, loading } = useCoinPrices(tickers, fiat);

  const [sortedCoins, setSortedCoins] = useState<CoinValue[]>([...coins]);
  const [isDraggingDisabled, setIsDraggingDisabled] = useState<boolean>(false);

  useEffect(() => {
    const clonedCoins = [...coins];

    applyCustomCoinOrder(clonedCoins);

    setSortedCoins(clonedCoins);
  }, [coins, tickers]);

  /**
   * Handles a heading click
   * @param sortDirection sort direction to sort by
   * @param column the column that was clicked
   */
  const headingClicked = (
    sortDirection: SortDirection,
    column: ColumnModels | null
  ) => {
    let unsortedCoins = [...sortedCoins];

    let disableDragging: boolean = false;

    if (column) {
      disableDragging = Object.values(ColumnModels).includes(column);
    }

    setIsDraggingDisabled(disableDragging);

    switch (column) {
      case ColumnModels.Ticker:
        unsortedCoins.sort((a, b) =>
          SortUtils.sortAlphabetically(a.ticker, b.ticker, sortDirection)
        );
        break;

      case ColumnModels.Value:
        unsortedCoins.sort((a, b) =>
          SortUtils.sortNumerically(a.price, b.price, sortDirection)
        );
        break;

      default:
        unsortedCoins = applyCustomCoinOrder([...coins]);
        break;
    }

    setSortedCoins(unsortedCoins);
  };

  return {
    coins,
    loading,
    sortedCoins,
    setSortedCoins,
    isDraggingDisabled,
    setIsDraggingDisabled,
    headingClicked,
  };
};

/**
 * Updates the saved sort order for custom view
 * @param sortedCoins sorted coins to be saved
 */
const onMove = (sortedCoins: CoinValue[]) => {
  const preferredTickerOrder = sortedCoins.map((coin) => coin.id);

  LocalStorage.setItem(PREFERRED_TICKER_ORDER, preferredTickerOrder);
};

/**
 * Sorts our list of coins based on order found in users local storage
 * @param coinsToSort list of items to sort
 * @returns
 */
const applyCustomCoinOrder = (coinsToSort: CoinValue[]): CoinValue[] => {
  const savedSortOrder = LocalStorage.getItem<string[]>(PREFERRED_TICKER_ORDER);

  if (savedSortOrder) {
    coinsToSort.sort(
      (coinA, coinB) =>
        savedSortOrder.indexOf(coinA.id) - savedSortOrder.indexOf(coinB.id)
    );
  }

  return coinsToSort;
};
