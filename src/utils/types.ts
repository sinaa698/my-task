import React from "react";

type mainComponentProps<P> = P & {
  className?: string | "";
  onClick?: () => void;
  onChange?: (e: any) => void;
};

export interface ReactFC<P = {}> extends React.FC<mainComponentProps<P>> {}

export type TransactionType = {
  trip_financials?: TripFinancialType[];
  payments?: PaymentType[];
  misc_expenses?: MiscExpenseType[];
  concurrency_costs?: ConcurrencyCostType[];
};

export type ConcurrencyCostType = {
  id: number;
  created_at: string;
  amount: number;
  start_date: string;
  end_date: string;
};

export type MiscExpenseType = {
  id: number;
  title: string;
  created_at: string;
  amount: number;
};

export type PaymentType = {
  id: number;
  datetime: string;
  amount: number;
  description: string;
};

export type TripFinancialType = {
  id: number;
  request_datetime: string;
  driver: string;
  final_price: number;
  source_title: string;
  hub: HubType;
};

export type HubType = {
  id: number;
  title: string;
};
