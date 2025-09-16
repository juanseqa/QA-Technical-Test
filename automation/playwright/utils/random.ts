export function randomUser(prefix: string = 'qa') {
  const ts = Math.floor(Date.now() / 1000);
  const rnd = Math.random().toString(36).slice(2, 7);
  return `${prefix}_${ts}_${rnd}`;
}
