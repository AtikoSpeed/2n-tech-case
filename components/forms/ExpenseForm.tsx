import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  amount: z.string().min(1, "Tutar giriniz"),
  description: z.string().min(1, "Açıklama giriniz"),
  date: z.string().min(1, "Tarih gereklidir"),
  category: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof formSchema>;

export function ExpenseForm() {
  const root = useRootContext();

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
    },
  });

  function onSubmit(values: ExpenseFormValues) {
    root.addExpense({
      amount: parseInt(values.amount),
      description: values.description,
      date: values.date,
      id: generateID(),
      category: values.category?.toString(),
    });
    console.log(values);
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="mt-4" variant="outline">
          <PlusIcon />
          Gider ekle
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni Gider Ekle</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tutar</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Tutar..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Açıklama</FormLabel>
                  <FormControl>
                    <Input placeholder="Açıklama..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {root.expenseCategories
                          ? root.expenseCategories.map((category) => (
                              <SelectItem
                                key={category.id}
                                {...field}
                                value={category.name}
                              >
                                {category.name}
                              </SelectItem>
                            ))
                          : null}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <DialogClose>İptal</DialogClose>
              <Button type="submit">Gider ekle</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
