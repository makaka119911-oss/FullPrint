"use client";

import * as React from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Purchase = {
  id: string;
  amount: number;
  transaction_id: string | null;
  created_at: string;
  marketplace_models: { title: string }[] | null;
};

export function MyPurchases() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<Purchase[]>([]);

  React.useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) {
          setItems([]);
          return;
        }

        const { data, error: queryError } = await supabase
          .from("purchases")
          .select(
            "id, amount, transaction_id, created_at, marketplace_models(title)",
          )
          .eq("buyer_id", user.id)
          .order("created_at", { ascending: false });

        if (queryError) throw queryError;
        setItems((data ?? []) as Purchase[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Не удалось загрузить покупки");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-zinc-600 dark:text-zinc-300">
          Загружаем покупки...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-red-600 dark:text-red-400">
          {error}
        </CardContent>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Пока нет покупок</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Когда вы купите модель в маркетплейсе, она появится здесь.
          </p>
          <Button asChild className="w-fit rounded-full">
            <Link href="/generate">Создать первую генерацию</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              {item.marketplace_models?.[0]?.title ?? "Модель"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            <p>Сумма: {item.amount} $</p>
            <p>Транзакция: {item.transaction_id ?? "не указана"}</p>
            <p>Дата: {new Date(item.created_at).toLocaleString("ru-RU")}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

