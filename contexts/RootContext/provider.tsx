import { useEffect, useState } from "react";
import RootContext from "./context";
import type {
  Category,
  Expense,
  Income,
  AddCategory,
  AddExpense,
  AddIncome,
  RemoveCategory,
  RemoveExpense,
  RemoveIncome,
  UpdateCategory,
  UpdateIncome,
  UpdateExpense,
  RootContextType,
} from "./types";
import { LoaderCircle } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const RootContextProvider: React.FC<Props> = ({ children }) => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const addIncome: AddIncome = (income) => {
    setIncomes((prev) => [...(prev || []), income]);
  };

  const addExpense: AddExpense = (expense) =>
    setExpenses((prev) => [...(prev || []), expense]);

  const addIncomeCategory: AddCategory = (category) =>
    setIncomeCategories((prev) => [...(prev || []), category]);

  const addExpenseCategory: AddCategory = (category) =>
    setExpenseCategories((prev) => [...(prev || []), category]);

  const removeIncome: RemoveIncome = (id) =>
    setIncomes((prev) => prev.filter((income) => income.id !== id));

  const removeExpense: RemoveExpense = (id) =>
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));

  const removeIncomeCategory: RemoveCategory = (id) =>
    setIncomeCategories((prev) =>
      prev.filter((category) => category.id !== id)
    );
  const removeExpenseCategory: RemoveCategory = (id) =>
    setExpenseCategories((prev) =>
      prev.filter((category) => category.id !== id)
    );

  const updateIncome: UpdateIncome = (id, income) =>
    setIncomes((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...income } : i))
    );

  const updateExpense: UpdateExpense = (id, expense) =>
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...expense } : e))
    );

  const updateIncomeCategory: UpdateCategory = (id, category) =>
    setIncomeCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...category } : c))
    );
  const updateExpenseCategory: UpdateCategory = (id, category) =>
    setExpenseCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...category } : c))
    );

  const value: RootContextType = {
    incomes,
    expenses,
    incomeCategories,
    expenseCategories,
    addIncome,
    addExpense,
    addIncomeCategory,
    addExpenseCategory,
    removeIncome,
    removeExpense,
    removeIncomeCategory,
    removeExpenseCategory,
    updateIncome,
    updateExpense,
    updateIncomeCategory,
    updateExpenseCategory,
  };

  useEffect(() => {
    if (loading) {
      const data = localStorage.getItem("data");
      if (data) {
        const parsedData = JSON.parse(data);
        setIncomes(parsedData.incomes);
        setExpenses(parsedData.expenses);
        setIncomeCategories(parsedData.incomeCategories);
        setExpenseCategories(parsedData.expenseCategories);
      }
      setLoading(false);
      return;
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        "data",
        JSON.stringify({
          incomes,
          expenses,
          incomeCategories,
          expenseCategories,
        })
      );
    }
  }, [incomeCategories, expenseCategories, expenses, incomes, loading]);

  return (
    <RootContext.Provider value={value}>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center  bg-gray-200">
          <LoaderCircle className="animate-spin" /> Loading...
        </div>
      ) : (
        children
      )}
    </RootContext.Provider>
  );
};

export default RootContextProvider;
