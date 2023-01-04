import { useState } from "react";
import { SortDirection } from "../../../common/models/sort-direction.model";
import { ColumnModels } from "../coin-list/CoinList.model";

/**
 * Heading component for our coin list
 * handles sort direction
 * @param props headerClicked callback
 * @returns
 */
export const ListHeader = (props: {
  headerClicked: (
    direction: SortDirection,
    column: ColumnModels | null
  ) => void;
}) => {
  const { headerClicked } = props;

  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.None
  );
  const [currentColumn, setCurrentColumn] = useState<ColumnModels | null>();

  /**
   * Cycles through sort directions, ascending, descending and none
   * @param direction current sort direction
   * @param column column to apply sort direction to
   */
  const cycleSortDirection = (
    direction: SortDirection,
    column: ColumnModels
  ) => {
    let nextDirection: SortDirection;

    switch (direction) {
      case SortDirection.None:
        nextDirection = SortDirection.Ascending;
        break;

      case SortDirection.Ascending:
        nextDirection = SortDirection.Descending;
        break;

      case SortDirection.Descending:
        nextDirection = SortDirection.None;
        break;

      default:
        nextDirection = SortDirection.None;
        break;
    }

    if (column !== currentColumn) {
      nextDirection = SortDirection.Ascending;
    }

    setSortDirection(nextDirection);
    changeActiveColumn(nextDirection, column);
  };

  /**
   * Changes which column is currently sorted
   * @param sortDirection current direction
   * @param column column to change to
   * @returns
   */
  const changeActiveColumn = (
    sortDirection: SortDirection,
    column: ColumnModels
  ) => {
    if (sortDirection === SortDirection.None) {
      headerClicked(sortDirection, null);
      setCurrentColumn(null);
      return;
    }
    headerClicked(sortDirection, column);

    setCurrentColumn(column);
  };

  /**
   * Handles a column header click
   * @param column column clicked
   */
  const headingClicked = (column: ColumnModels) => {
    cycleSortDirection(sortDirection, column);
  };

  return (
    <div className="listHeader">
      <h5>
        <button onClick={() => headingClicked(ColumnModels.Ticker)}>
          Ticker{" "}
          {currentColumn === ColumnModels.Ticker && sortDirection?.toString()}
        </button>
      </h5>
      <h5 className="valueHeading">
        <button onClick={() => headingClicked(ColumnModels.Value)}>
          Value{" "}
          {currentColumn === ColumnModels.Value && sortDirection?.toString()}
        </button>
      </h5>
    </div>
  );
};
