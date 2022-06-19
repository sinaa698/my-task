import { ReactFC } from "../../../utils/types";
import { translateToFarsi } from "./../../../utils/commonFunctions";
import "./transaction.css";

const Transaction: ReactFC<{
  price: number;
  date: Date;
  transactionType: string;
}> = ({ price, date, transactionType }) => {
  const priceElementClass = price < 0 ? "--red" : "--green";
  const TypeElementClass = price < 0 ? "--red" : "--green";

  return (
    <div className="transaction">
      <div className="transaction__price">
        <span className={`transaction__price${priceElementClass}`}>
          {price !== 0
            ? price > 0
              ? `+${price.toLocaleString("fa-IR")}`
              : price.toLocaleString("fa-IR")
            : "رایگان"}
        </span>
      </div>

      <div className="description">
        <span className="description__transaction-date">
          {`${date.toLocaleDateString("fa-IR")} ،${date
            .getHours()
            .toLocaleString("fa-IR")}:${date
            .getMinutes()
            .toLocaleString("fa-IR")}`}
        </span>
        <span className={`description__transaction-type${TypeElementClass}`}>
          {translateToFarsi(transactionType)}
        </span>
      </div>
    </div>
  );
};

export default Transaction;
