import React, { useEffect, useState } from "react";
import {
  convertTransactionDateAndPrice,
  transactionOptions,
  TransactionUnion,
  TransactionWithExtra,
} from "../../utils/common";
import Transaction from "../common/transaction/transaction";
import { TransactionType, TripFinancialType } from "./../../utils/types";
import Dropdown from "./../common/dropdown/dropdown";
import SearchBar from "./../common/searchBar/searchBar";
import TransactionDate from "./../common/transactionDate/transactionDate";
import "./transactions.css";

type Props = {
  transactions: TransactionType;
};

const addType = ([key, values]: [string, TransactionUnion[]]) =>
  values.map((v) => ({
    ...v,
    type: key as keyof TransactionType,
  }));

const byDate = (a: TransactionWithExtra, b: TransactionWithExtra) =>
  b.date.getTime() - a.date.getTime();

const toDateObject = (
  x: TransactionWithExtra<string>
): TransactionWithExtra<Date> => ({ ...x, date: new Date(x.date) });

const ShowTransactions = ({ transactions }: Props) => {
  const [dropDownValue, setDropDownValue] = useState<
    keyof TransactionType | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedData = React.useMemo(
    () =>
      Object.entries(transactions)
        .map(addType)
        .reduce((acc, curr) => [...acc, ...curr], [])
        .map(convertTransactionDateAndPrice)
        .map(toDateObject)
        .sort(byDate),
    [transactions]
  );

  const haveSearch = React.useMemo(
    () => dropDownValue === "trip_financials",
    [dropDownValue]
  );

  const filtered = React.useMemo(() => {
    if (searchQuery && dropDownValue === "trip_financials") {
      return normalizedData
        .filter((x) => x.type === "trip_financials")
        .filter((x) =>
          (x as TripFinancialType).driver
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
    }

    if (dropDownValue !== "all") {
      return normalizedData.filter((x) => x.type === dropDownValue);
    } else {
      return normalizedData;
    }
  }, [dropDownValue, normalizedData, searchQuery]);

  const handleTransactionTypesChange = React.useCallback(
    (event: {
      target: { value: React.SetStateAction<keyof TransactionType | "all"> };
    }) => {
      setDropDownValue(event.target.value);
      if (event.target.value !== "trip_financials") {
        setSearchQuery("");
      }
    },
    [setDropDownValue, setSearchQuery]
  );

  const handleSearchBarChange = React.useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setSearchQuery(event.target.value);
    },
    [setSearchQuery]
  );

  const sortedByDate = React.useMemo(() => {
    const byDate: Record<string, Array<TransactionWithExtra>> = {};

    filtered.forEach((x) => {
      const d = x.date.toLocaleString(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      byDate[d] = [...(byDate[d] || []), x];
    });

    return byDate;
  }, [filtered]);

  return (
    <div className="transactions">
      <div className="filter-bar">
        <h1>???????? ???????????? ????</h1>
        <div className="filter">
          <Dropdown
            options={transactionOptions}
            label="?????? ????????????"
            value={dropDownValue}
            onChange={handleTransactionTypesChange}
          />
          {haveSearch && <SearchBar onChange={handleSearchBarChange} />}
        </div>
      </div>
      {Object.entries(sortedByDate).map(([key, values]) => (
        <div key={key}>
          <TransactionDate date={key} />
          {values.map((nd) => (
            <Transaction
              price={nd.price}
              transactionType={nd.type}
              date={nd.date}
              key={nd.id}
              driver={nd.driver}
              hub={nd.hub?.title}
              concurrencyStartDate={nd.start_date}
              concurrencyEndDate={nd.end_date}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const Transactions = () => {
  const [data, setData] = useState<TransactionType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = () => {
      setLoading(true);
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
          setLoading(false);
        });
    };

    getData();
  }, []);

  return data && !loading ? (
    <ShowTransactions transactions={data} />
  ) : (
    <span>Loading...</span>
  );
};

export default Transactions;
