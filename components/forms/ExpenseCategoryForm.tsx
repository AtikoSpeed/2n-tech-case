import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import useRootContext from "@/contexts/RootContext/hooks";
import { generateID } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "Gelir kaynağı girin"),
  limit: z.string().min(1, "Miktarı girin"),
});

type CategoryFormValues = z.infer<typeof formSchema>;

type Props = {
  data?: CategoryFormValues & { id: string };
};

const _defaultValues: CategoryFormValues = {
  name: "",
  limit: "",
};
export default function CategoryForm(props: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const root = useRootContext();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: props.data || _defaultValues,
  });

  function onSubmit(values: CategoryFormValues) {
    if (props.data) {
      root.updateIncomeCategory(props.data.id, {
        name: values.name,
        limit: parseInt(values.limit),
        id: props.data.id,
      });
      setIsOpen(false);
      return;
    }

    root.addExpenseCategory({
      name: values.name,
      limit: parseInt(values.limit),
      id: generateID(),
    });

    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="mt-4" variant="outline">
          {props.data ? "Kategoriyi düzenle" : "Kategori ekle"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {props.data ? "Kategoriyi düzenle" : "Kategori ekle"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bütçe</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Miktar..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Kategori..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <DialogClose>Cancel</DialogClose>
              <Button type="submit">
                {props.data ? "Kategoriyi Düzenle" : "Kategori Ekle"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
