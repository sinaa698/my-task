import { translateToFarsi } from "../../../utils/common";
import "./transaction.css";

const Transaction = ({
  price,
  date,
  transactionType,
  driver,
  hub,
  concurrencyStartDate,
  concurrencyEndDate,
}: {
  price: number;
  date: Date;
  transactionType: string;
  driver?: string;
  hub?: string;
  concurrencyStartDate?: string;
  concurrencyEndDate?: string;
}) => {
  const priceElementClass = price > 0 ? "--red" : "--green";
  const TypeElementClass = price > 0 ? "--red" : "--green";

  return (
    <div className="transaction">
      <div className="transaction__price">
        <span className={`transaction__price${priceElementClass}`}>
          {price !== 0
            ? price > 0
              ? `- ${price.toLocaleString("fa-IR")}`
              : `+ ${(-price).toLocaleString("fa-IR")}`
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
        <div className="extra-info">
          {driver && <span>{`کوریر: ${driver}`}</span>}
          {hub && <span>{`شعبه: ${hub}`}</span>}
        </div>
        {concurrencyStartDate && concurrencyEndDate && (
          <p className="description__concurrency-date">
            {`خرید ظرفیت از تاریخ ${new Date(
              concurrencyStartDate
            ).toLocaleDateString("fa-IR")} تا تاریخ ${new Date(
              concurrencyEndDate
            ).toLocaleDateString("fa-IR")}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Transaction;
