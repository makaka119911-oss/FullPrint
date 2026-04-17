# Auth Checklist

Практическая проверка перед тем как считать auth «готовым». Поток шагов — в [[auth-flow]], экран входа — [[login-page]].

## Функции

- [ ] **Signup** — email + пароль (+ username); при включённом confirm в Supabase — письмо и переход по ссылке на `/auth/callback`
- [ ] **Confirm email** — ссылка из письма открывается на **прод-домене**, сессия создаётся (PKCE `code`)
- [ ] **Login** — **пароль** (`signInWithPassword`) и/или **magic link** (вкладка «Ссылка на почту»)
- [ ] **Logout** — кнопка в шапке: `signOut`, редирект на главную, приватные маршруты недоступны
- [ ] **Reset password** — `/forgot-password` → письмо → `/auth/callback?next=/auth/update-password` → новый пароль
- [ ] **Update password** — страница `/auth/update-password` после ссылки из письма

## Приложение

- [ ] **Приватные страницы** (`/generate`, `/studio`, `/dashboard`, `/print` и т.д.) редиректят неавторизованного на `/login?next=…`
- [ ] После входа редирект на **`/dashboard`** (или `next` из query)
- [ ] **Сессия** переживает перезагрузку вкладки (cookies Supabase)
- [ ] Нет жёсткого **localhost** в redirect URL для prod

## Supabase Dashboard

- [ ] **Site URL** = прод-оригин приложения
- [ ] **Redirect URLs** содержат `https://<домен>/auth/callback`
- [ ] Email templates / rate limits по необходимости
- [ ] RLS на таблицах с user_id

## Безопасность

- [ ] Секреты только на сервере; **`NEXT_PUBLIC_*`** — только anon URL и ключ
- [ ] Нет утечки service role в клиент
- [ ] Параметр `next` после логина **не ведёт** на внешний сайт (только относительные пути)
- [ ] Callback обрабатывает **ошибки** OAuth/email (`error`, `error_description`)

## Итог: auth готов

Все отмеченные пункты по текущему scope (пароль + magic link + сброс). Пройден happy path на **prod** с реальным письмом.

См. [[Supabase Structure]], [[00 Home]].
