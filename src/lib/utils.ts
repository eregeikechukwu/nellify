export const cn = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ');
export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
