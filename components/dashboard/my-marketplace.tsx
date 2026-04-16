"use client";

import * as React from "react";
import Link from "next/link";

import { createClient, SUPABASE_CLIENT_CONFIG_ERROR } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MarketplaceModel = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  is_published: boolean;
  created_at: string;
};

export function MyMarketplace() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<MarketplaceModel[]>([]);

  React.useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        if (!supabase) {
          setError(SUPABASE_CLIENT_CONFIG_ERROR);
          return;
        }
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
          .from("marketplace_models")
          .select("id, title, description, price, is_published, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (queryError) throw queryError;
        setItems((data ?? []) as MarketplaceModel[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Не удалось загрузить модели");
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
          Загружаем модели маркетплейса...
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
          <CardTitle>Вы ещё ничего не выставили</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Создайте первую генерацию, чтобы опубликовать модель в маркетплейсе.
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
            <CardTitle className="text-base">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            <p>
              Статус: {item.is_published ? "Опубликовано" : "Черновик"} · Цена:{" "}
              {item.price} $
            </p>
            {item.description ? <p>{item.description}</p> : null}
            <p>Добавлено: {new Date(item.created_at).toLocaleString("ru-RU")}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

