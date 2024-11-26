export type Income = {
  amount: number;
  description: string;
  id: string;
  date: string;
  category?: string;
};

export type Expense = Income;

export type Category = {
  id: string;
  name: string;
  limit?: number;
};

export type AddIncome = (income: Income) => void;
export type AddExpense = (expense: Expense) => void;
export type AddCategory = (category: Category) => void;
export type RemoveIncome = (id: string) => void;
export type RemoveExpense = (id: string) => void;
export type RemoveCategory = (id: string) => void;
export type UpdateIncome = (id: string, income: Income) => void;
export type UpdateExpense = (id: string, expense: Expense) => void;
export type UpdateCategory = (id: string, category: Category) => void;

export type RootContextType = {
  incomes: Income[];
  expenses: Expense[];
  incomeCategories: Category[];
  expenseCategories: Category[];
  addIncome: AddIncome;
  addExpense: AddExpense;
  addIncomeCategory: AddCategory;
  addExpenseCategory: AddCategory;
  removeIncome: RemoveIncome;
  removeExpense: RemoveExpense;
  removeIncomeCategory: RemoveCategory;
  removeExpenseCategory: RemoveCategory;
  updateIncome: UpdateIncome;
  updateExpense: UpdateExpense;
  updateIncomeCategory: UpdateCategory;
  updateExpenseCategory: UpdateCategory;
};
