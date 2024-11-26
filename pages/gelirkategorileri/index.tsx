import CategoryForm from "@/components/forms/IncomeCategoryForm";
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
        <h1 className="text-2xl font-bold">Gelir Kategorileri</h1>
        <CategoryForm />
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Gelir Kaynağı</TableHead>
            <TableHead>Aylık Ortalama Gelir</TableHead>
            <TableHead>ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {root.incomeCategories
            ? root.incomeCategories.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.limit}₺</TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <CategoryForm
                      data={{
                        name: item.name,
                        limit: (item.limit ?? "").toString(),
                        id: item.id,
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => root.removeIncomeCategory(item.id)}
                    >
                      Sil
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
