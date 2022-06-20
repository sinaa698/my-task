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

export type TransactionWithMore = TransactionWithType & {
  date: Date;
  price: number;
  driver?: string;
  start_date?: string;
  end_date?: string;
  hub?: {
    title: string;
    id: number;
  };
};

export const addTransactionPrice = (
  x: TransactionWithType & { date: Date }
): TransactionWithMore => {
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

export const translateToFarsi = (word: string) => {
  switch (word) {
    case "trip_financials":
      return "هزینه سفر";

    case "concurrency_costs":
      return "خرید ظرفیت همزمان";

    case "misc_expenses":
      return "هزینه متفرقه";

    case "payments":
      return "شارژ حساب";
  }
};

export const transactionOptions = [
  { label: "همه تراکنش ها", value: "all" },
  { label: "هزینه سفر", value: "trip_financials" },
  { label: "خرید ظرفیت همزمان", value: "concurrency_costs" },
  { label: "هزینه متفرقه", value: "misc_expenses" },
  { label: "شارژ حساب", value: "payments" },
];
