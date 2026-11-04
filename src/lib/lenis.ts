import type Lenis from 'lenis';
// Module-level handle so any component can scrollTo / stop / start.
let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { instance = l; };
export const getLenis = () => instance;
