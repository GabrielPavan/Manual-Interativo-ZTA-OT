export function Icon({ name, size = 20 }: { name: "arrow" | "shield" | "book" | "grid" | "check" | "layers" | "external" | "menu" | "close"; size?: number }) {
  const paths = {
    arrow: <path d="M4 12h16m-7-7 7 7-7 7"/>, shield: <><path d="M12 2 4 5v6c0 5.5 3.4 9.1 8 11 4.6-1.9 8-5.5 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></>,
    book: <><path d="M12 7c-2.5-2-5.5-2-9-1v14c3.5-1 6.5-1 9 1 2.5-2 5.5-2 9-1V6c-3.5-1-6.5-1-9 1Z"/><path d="M12 7v14"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    check: <path d="m4 12 5 5L20 6"/>, layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
    external: <><path d="M13 4h7v7M20 4l-9 9"/><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/></>,
    menu: <path d="M4 6h16M4 12h16M4 18h16"/>, close: <path d="M5 5 19 19M19 5 5 19"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
