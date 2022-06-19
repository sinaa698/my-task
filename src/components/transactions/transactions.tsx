import React, { useEffect, useState } from "react";
import {
  addTransactionDate,
  addTransactionPrice,
} from "../../utils/commonFunctions";
import Transaction from "../common/transaction/transaction";
import { ReactFC, TransactionType } from "./../../utils/types";
import "./transactions.css";

const Transactions: ReactFC<{}> = () => {
  const [data, setData] = useState<TransactionType>();

  useEffect(() => {
    const getData = () => {
      fetch("data.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setData(myJson);
        });
    };

    getData();
  }, []);

  const normalizedData = React.useMemo(() => {
    if (data) {
      const myData = Object.entries(data)
        .map(([key, values]) =>
          values.map((v) => ({
            ...v,
            type: key,
            transactionDate: new Date(),
            transactionPrice: 0,
          }))
        )
        .reduce((acc, curr) => [...acc, ...curr], []);

      addTransactionDate(myData);
      addTransactionPrice(myData);
      myData.sort(
        (a, b) => b.transactionDate.getTime() - a.transactionDate.getTime()
      );

      return myData;
    } else {
      return undefined;
    }
  }, [data]);

  return (
    <div className="transactions">
      <h1>تمام تراکنش ها</h1>
      {data &&
        normalizedData?.map((nd) => (
          <Transaction
            price={nd.transactionPrice}
            transactionType={nd.type}
            date={nd.transactionDate}
          />
        ))}
    </div>
  );
};

export default Transactions;
