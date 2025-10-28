export function getCookie(name: string): string | null {
  const value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return value ? value.pop()! : null;
}

