import {
  ConcurrencyCostType,
  MiscExpenseType,
  PaymentType,
  TransactionType,
  TripFinancialType,
} from "./types";

export type TransactionUnion =
  | TripFinancialType
  | PaymentType
  | MiscExpenseType
  | ConcurrencyCostType;

type TransactionWithType = TransactionUnion & { type: keyof TransactionType };

export const addTransactionDate = (x: TransactionWithType) => {
  switch (x.type) {
    case "trip_financials":
      return { ...x, date: (x as TripFinancialType).request_datetime };
    case "concurrency_costs":
      return { ...x, date: (x as ConcurrencyCostType).created_at };
    case "misc_expenses":
      return { ...x, date: (x as MiscExpenseType).created_at };
    case "payments":
      return { ...x, date: (x as PaymentType).datetime };
  }
};

export type TransactionWithDateAndPrice = TransactionWithType & {
  date: Date;
  price: number;
};

export const addTransactionPrice = (
  x: TransactionWithType & { date: Date }
): TransactionWithDateAndPrice => {
  switch (x.type) {
    case "trip_financials":
      return { ...x, price: (x as TripFinancialType).final_price };
    case "concurrency_costs":
      return { ...x, price: (x as ConcurrencyCostType).amount };
    case "misc_expenses":
      return { ...x, price: (x as MiscExpenseType).amount };
    case "payments":
      return { ...x, price: (x as PaymentType).amount };
  }
};

// export const addFarsiType = (data: any) => {
//   for (let i = 0; i < data.length; i++) {
//     let keys = Object.keys(data[i]);

//     for (let j = 0; j < keys.length; j++) {
//       switch (keys[j]) {
//         case "trip_financials":
//           data[i].farsiType = "هزینه سفر";
//           break;

//         case "concurrency_costs":
//           data[i].farsiType = "خرید ظرفیت همزمان";
//           break;

//         case "misc_expenses":
//           data[i].farsiType = "هزینه متفرقه";
//           break;

//         case "payments":
//           data[i].farsiType = "پرداختی ها";
//           break;
//       }
//     }
//   }
// };

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

export const transactionOptions = [
  { label: "همه تراکنش ها", value: "all" },
  { label: "هزینه سفر", value: "trip_financials" },
  { label: "خرید ظرفیت همزمان", value: "concurrency_costs" },
  { label: "هزینه متفرقه", value: "misc_expenses" },
  { label: "پرداختی ها", value: "payments" },
];
