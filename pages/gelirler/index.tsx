import { IncomeForm } from "@/components/forms/IncomeForm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

import useRootContext from "@/contexts/RootContext/hooks";
import { useState } from "react";

const Page = () => {
  const root = useRootContext();
  const [selector, setSelector] = useState<string | null>(null);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gelirler</h1>
        <IncomeForm />
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Tutar</TableHead>
            <TableHead>Açıklama</TableHead>
            <TableHead>Tarih</TableHead>
            <TableHead className="w-96">ID</TableHead>
            <TableHead>
              <Select onValueChange={(value) => setSelector(value)}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {root.incomeCategories.map((category, index) => (
                    <SelectGroup key={index}>
                      <SelectItem value={category.name}>
                        {category.name}
                      </SelectItem>
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selector
            ? root.incomes
                .filter((item) => item.category === selector)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.amount}₺</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.category || "Kategori yok"}</TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => root.removeExpense(item.id)}
                    >
                      Sil
                    </Button>
                  </TableRow>
                ))
            : root.incomes.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.amount}₺</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.category || "Kategori yok"}</TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => root.removeExpense(item.id)}
                  >
                    Sil
                  </Button>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
