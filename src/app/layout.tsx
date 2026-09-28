import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Zero Trust OT | Manual interativo", template: "%s | Zero Trust OT" },
  description: "Manual interativo de boas práticas Zero Trust para ambientes de tecnologia operacional.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><div className="app-shell"><Navigation/><div className="main-column"><header className="topbar"><span>MANUAL DE BOAS PRÁTICAS <span className="topbar-separator">/</span> ZERO TRUST EM OT</span><span className="topbar-status"><i/> VERSÃO DE AVALIAÇÃO</span></header><main id="conteudo" className="main-content">{children}</main><footer className="footer"><span>Zero Trust OT · Manual interativo</span><span>Pesquisa conceitual e exploratória · 2026</span></footer></div></div></body></html>;
}
