"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./icon";

const items = [
  { href: "/", label: "Visão geral", icon: "grid" },
  { href: "/fundamentos", label: "Fundamentos", icon: "book" },
  { href: "/pilares", label: "Pilares Zero Trust", icon: "layers" },
  { href: "/diagnostico", label: "Diagnóstico", icon: "check" },
  { href: "/referencias", label: "Referências", icon: "external" },
] as const;
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <>
    <button className="mobile-menu" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}><Icon name={open ? "close" : "menu"}/></button>
    {open && <button className="mobile-backdrop" type="button" onClick={() => setOpen(false)} aria-label="Fechar menu"/>}
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}><Link href="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark"><Icon name="shield" size={23}/></span><span><strong>ZERO TRUST <em>OT</em></strong><small>MANUAL INTERATIVO</small></span></Link><span className="sidebar-label">EXPLORAR MANUAL</span><nav aria-label="Navegação principal" className="nav-list">{items.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`nav-link ${pathname === item.href || (item.href === "/pilares" && pathname.startsWith("/pilares/")) ? "active" : ""}`}><Icon name={item.icon} size={19}/>{item.label}</Link>)}</nav><div className="sidebar-bottom"><span className="side-line"/><p>Da fundamentação à<br/>aplicação responsável em OT.</p><small>PROJETO ACADÊMICO · VERSÃO 0.1</small></div></aside>
  </>;
}
