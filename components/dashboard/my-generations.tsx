"use client";

import * as React from "react";
import Link from "next/link";

import { createClient, SUPABASE_CLIENT_CONFIG_ERROR } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Generation = {
  id: string;
  prompt: string;
  image_url: string | null;
  model_url: string | null;
  status: string;
  created_at: string;
};

export function MyGenerations() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<Generation[]>([]);

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
          .from("generations")
          .select("id, prompt, image_url, model_url, status, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (queryError) throw queryError;
        setItems((data ?? []) as Generation[]);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Не удалось загрузить генерации",
        );
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
          Загружаем генерации...
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
          <CardTitle>Пока нет генераций</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Создайте первую модель через AI-генератор и она появится в вашем
            дашборде.
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
              {item.prompt.length > 90
                ? `${item.prompt.slice(0, 90)}...`
                : item.prompt}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            <p>Статус: {item.status}</p>
            <p>Создано: {new Date(item.created_at).toLocaleString("ru-RU")}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {item.image_url ? (
                <Button variant="outline" size="sm" asChild className="rounded-full">
                  <a href={item.image_url} target="_blank" rel="noreferrer">
                    Открыть изображение
                  </a>
                </Button>
              ) : null}
              {item.model_url ? (
                <Button variant="outline" size="sm" asChild className="rounded-full">
                  <a href={item.model_url} target="_blank" rel="noreferrer">
                    Открыть 3D-модель
                  </a>
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

