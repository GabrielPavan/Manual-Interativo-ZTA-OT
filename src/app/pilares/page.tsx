import Link from "next/link";
import { Icon } from "@/components/icon";
import { pillars } from "@/data/manual";
export const metadata = { title: "Pilares" };
export default function Pillars() { return <div className="content-page"><div className="page-heading"><span className="section-kicker">02 / MANUAL</span><h1>Cinco pilares. Um contexto: OT.</h1><p>A organização em cinco pilares segue o modelo da CISA; as adaptações ao contexto OT são propostas conceituais deste manual.</p></div><div className="pillar-list">{pillars.map((pillar, i) => <Link key={pillar.slug} href={`/pilares/${pillar.slug}`} className={`pillar-list-item ${pillar.color}`}><span className="pillar-icon">{pillar.symbol}</span><span className="pillar-list-text"><small>PILAR 0{i + 1}</small><strong>{pillar.title}</strong><span>{pillar.summary}</span></span><span className="list-arrow"><Icon name="arrow"/></span></Link>)}</div></div>; }
