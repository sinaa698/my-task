import React, { useEffect, useState } from "react";
import { Transaction } from "./../../utils/models";
import { ReactFC } from "./../../utils/types";

const Transactions: ReactFC<{}> = () => {
  const [data, setData] = useState<Transaction>();

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

  const addGeneralDate = (data: any) => {
    for (let i = 0; i < data.length; i++) {
      let keys = Object.keys(data[i]);

      for (let j = 0; j < keys.length; j++) {
        switch (keys[j]) {
          case "request_datetime":
            data[i].transactionDate = new Date(data[i].request_datetime);
            break;

          case "datetime":
            data[i].transactionDate = new Date(data[i].datetime);
            break;

          case "created_at":
            data[i].transactionDate = new Date(data[i].created_at);
            break;
        }
      }
    }
  };

  const normalizedData = React.useMemo(() => {
    if (data) {
      const myData = Object.entries(data)
        .map(([key, values]) =>
          values.map((v) => ({ ...v, type: key, transactionDate: new Date() }))
        )
        .reduce((acc, curr) => [...acc, ...curr], []);
      addGeneralDate(myData);

      myData.sort(
        (a, b) => b.transactionDate.getTime() - a.transactionDate.getTime()
      );

      return myData;
    } else {
      return undefined;
    }
  }, [data]);

  console.log(normalizedData);

  return <div></div>;
};

export default Transactions;
