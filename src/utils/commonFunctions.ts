export const addTransactionDate = (data: any) => {
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

export const addTransactionPrice = (data: any) => {
  for (let i = 0; i < data.length; i++) {
    let keys = Object.keys(data[i]);

    for (let j = 0; j < keys.length; j++) {
      switch (keys[j]) {
        case "final_price":
          data[i].transactionPrice = data[i].final_price;
          break;

        case "amount":
          data[i].transactionPrice = data[i].amount;
          break;
      }
    }
  }
};

export const translateToFarsi = (word: string) => {
  switch (word) {
    case "trip_financials":
      return "هزینه سفر";

    case "concurrency_costs":
      return "خرید ظرفیت همزمان";

    case "misc_expenses":
      return "هزینه متفرقه";

    case "payments":
      return "پرداختی ها";
  }
};
