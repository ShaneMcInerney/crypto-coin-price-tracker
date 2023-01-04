import { SortDirection } from "../models/sort-direction.model";

/**
 * Sort Utils class
 */
export class SortUtils {
  /**
   * Sorts the given values alphabetically
   * @param valueA value a to compare
   * @param valueB value b to compare
   * @param sortDirection sort direction (ascending/descending)
   * @returns sort number, 1,0,-1
   */
  public static sortAlphabetically(
    valueA: string,
    valueB: string,
    sortDirection: SortDirection
  ): number {
    let result = 0;

    if (valueA > valueB) {
      result = 1;
    }

    if (valueA < valueB) {
      result = -1;
    }

    return sortDirection === SortDirection.Descending ? result * -1 : result;
  }

  /**
   * Sort via numerical values
   * @param valueA value a to compare
   * @param valueB value b to compare
   * @param sortDirection sort direction (ascending/descending)
   * @returns sort value, positive integer, 0 or negative integer
   */
  public static sortNumerically(
    valueA: number,
    valueB: number,
    sortDirection: SortDirection
  ): number {
    let result = valueB - valueA;

    return sortDirection === SortDirection.Descending ? result * -1 : result;
  }
}
