import React, { useEffect, useState } from "react";
import {
  addTransactionDate,
  addTransactionPrice,
  transactionOptions,
} from "../../utils/common";
import Transaction from "../common/transaction/transaction";
import { ReactFC, TransactionType } from "./../../utils/types";
import Dropdown from "./../common/dropdown/dropdown";
import "./transactions.css";

const Transactions: ReactFC<{}> = () => {
  const [data, setData] = useState<TransactionType>();
  const [dropDownValue, setDropDownValue] = useState("all");
  const [haveSearch, setHaveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  let filtered = normalizedData;
  if (haveSearch && searchQuery)
    filtered = filtered?.filter((d) =>
      d.type.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  else if (dropDownValue && dropDownValue !== "all") {
    filtered = filtered?.filter((d) => d.type === dropDownValue);
  }

  const handleTransactionTypesChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDropDownValue(event.target.value);
    if (event.target.value !== "all") setHaveSearch(true);
    else setHaveSearch(false);
  };

  return (
    <div className="transactions">
      <h1>تمام تراکنش ها</h1>
      <Dropdown
        options={transactionOptions}
        label="نوع تراکنش"
        value={dropDownValue}
        onChange={handleTransactionTypesChange}
      />
      {data &&
        filtered?.map((nd) => (
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
