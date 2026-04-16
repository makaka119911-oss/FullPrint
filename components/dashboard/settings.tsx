"use client";

import * as React from "react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OCTOPRINT_STORAGE_KEY = "fullprint.octoprint.settings";

type OctoPrintSettings = {
  url: string;
  apiKey: string;
};

export function Settings() {
  const [loading, setLoading] = React.useState(true);
  const [pending, setPending] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const [username, setUsername] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [octoUrl, setOctoUrl] = React.useState("");
  const [octoApiKey, setOctoApiKey] = React.useState("");

  React.useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) return;

        setEmail(user.email ?? "");

        const { data: profile } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", user.id)
          .single();

        if (profile) {
          setUsername(profile.username ?? "");
          setAvatarUrl(profile.avatar_url ?? "");
        }

        const stored = localStorage.getItem(OCTOPRINT_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as OctoPrintSettings;
          setOctoUrl(parsed.url ?? "");
          setOctoApiKey(parsed.apiKey ?? "");
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Ошибка загрузки настроек");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function onSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("Пользователь не найден");

      const { error: upsertError } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          email: user.email,
          username: username || null,
          avatar_url: avatarUrl || null,
        },
        { onConflict: "id" },
      );
      if (upsertError) throw upsertError;

      setMessage("Профиль обновлён.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось сохранить профиль");
    } finally {
      setPending(false);
    }
  }

  function onSaveOctoPrint(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(
      OCTOPRINT_STORAGE_KEY,
      JSON.stringify({ url: octoUrl, apiKey: octoApiKey }),
    );
    setMessage("Настройки OctoPrint сохранены локально.");
    setError(null);
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-zinc-600 dark:text-zinc-300">
          Загружаем настройки...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSaveProfile}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="maxel_user"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                id="avatar"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <Button type="submit" disabled={pending} className="rounded-full">
              {pending ? "Сохраняем..." : "Сохранить профиль"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>OctoPrint</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSaveOctoPrint}>
            <div className="space-y-2">
              <Label htmlFor="octo-url">URL сервера</Label>
              <Input
                id="octo-url"
                value={octoUrl}
                onChange={(e) => setOctoUrl(e.target.value)}
                placeholder="http://octoprint.local"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="octo-key">API key</Label>
              <Input
                id="octo-key"
                value={octoApiKey}
                onChange={(e) => setOctoApiKey(e.target.value)}
                placeholder="octo_xxx"
              />
            </div>
            <Button type="submit" className="rounded-full">
              Сохранить OctoPrint
            </Button>
          </form>
        </CardContent>
      </Card>

      {message ? (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">{message}</p>
      ) : null}
      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
    </div>
  );
}

