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
import useRootContext from "@/contexts/RootContext/hooks";

const Page = () => {
  const root = useRootContext();
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
            <TableHead>Kategori</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {root.incomes.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.amount}₺</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.category || "Kategori yok"}</TableCell>
              <Button
                size="sm"
                variant="outline"
                onClick={() => root.removeIncome(item.id)}
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
