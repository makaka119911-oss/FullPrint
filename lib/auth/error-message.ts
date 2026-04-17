/** Человекочитаемые сообщения для типичных ошибок Supabase Auth. */
export function mapSupabaseAuthError(message: string): string {
  const raw = message.trim();
  const m = raw.toLowerCase();

  if (m.includes("invalid login credentials")) {
    return "Неверный email или пароль.";
  }
  if (m.includes("email not confirmed")) {
    return "Подтвердите email по ссылке из письма, затем войдите.";
  }
  if (
    m.includes("user already registered") ||
    m.includes("already been registered") ||
    m.includes("user_already_exists")
  ) {
    return "Этот email уже зарегистрирован. Войдите или сбросьте пароль.";
  }
  if (m.includes("password should be at least") || m.includes("password is too short")) {
    return "Пароль слишком короткий (минимум обычно 6 символов).";
  }
  if (m.includes("signup requires a valid password")) {
    return "Укажите пароль.";
  }

  return raw;
}
