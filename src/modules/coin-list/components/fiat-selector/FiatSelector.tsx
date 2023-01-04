import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Fiat } from "../../../common/models/fiat.model";
import { changeFiat } from "../../../common/state/data.store";
import "./FiatSelector.css";

/**
 * Component for choosing currently selected FIAT
 * @returns
 */
export const FiatSelector = () => {
  const fiat = useSelector((state: RootState) => state.data.fiat);
  const dispatch = useDispatch();

  /**
   * Updates fiat value in state
   * @param event
   */
  const updateFiat = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFiat(event.target.value as Fiat));
  };

  return (
    <div className="fiatSelector">
      <h4>Selected Fiat:</h4>
      <div className="fiatOptions">
        <input
          type="radio"
          value={Fiat.USD}
          name="fiat"
          checked={fiat === Fiat.USD}
          onChange={updateFiat}
        />
        {Fiat.USD}

        <input
          type="radio"
          value={Fiat.EUR}
          name="fiat"
          checked={fiat === Fiat.EUR}
          onChange={updateFiat}
        />
        {Fiat.EUR}
      </div>
    </div>
  );
};
