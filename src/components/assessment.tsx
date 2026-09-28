"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "./icon";
import { pillars } from "@/data/manual";

type Answer = "nao" | "parcial" | "sim";
type Answers = Record<string, Answer>;
const key = "zero-trust-ot-diagnostico-v1";
const options: { value: Answer; label: string }[] = [
  { value: "nao", label: "Ainda não" }, { value: "parcial", label: "Parcialmente" }, { value: "sim", label: "Sim, de forma documentada" },
];
export function Assessment() {
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);
  useEffect(() => { try { const saved = localStorage.getItem(key); if (saved) { const data = JSON.parse(saved); if (data && typeof data === "object" && !Array.isArray(data)) setAnswers(data); } } catch { /* Armazenamento indisponível. */ } }, []);
  function choose(slug: string, answer: Answer) { const next = { ...answers, [slug]: answer }; setAnswers(next); setShowResult(false); try { localStorage.setItem(key, JSON.stringify(next)); } catch {} }
  function reset() { setAnswers({}); setShowResult(false); try { localStorage.removeItem(key); } catch {} }
  const count = pillars.filter(p => options.some(o => o.value === answers[p.slug])).length;
  const gaps = pillars.filter(p => answers[p.slug] !== "sim");
  return <div className="assessment"><div className="assessment-notice"><Icon name="shield" size={21}/><span><strong>Versão piloto · 5 perguntas.</strong> O resultado é uma orientação de leitura baseada nas respostas declaradas. Não mede maturidade, não substitui análise técnica e não certifica conformidade.</span></div><div className="assessment-progress"><div><span>Progresso</span><strong>{count} de {pillars.length} respondidas</strong></div><div className="progress-track"><div style={{ width: `${count / pillars.length * 100}%` }}/></div></div>{pillars.map((p, i) => <fieldset key={p.slug} className={`question-card ${p.color}`}><legend><span className="question-number">0{i + 1}</span><span><small>{p.title.toUpperCase()}</small><strong>{p.question}</strong></span></legend><div className="answer-options">{options.map(o => <label key={o.value} className={answers[p.slug] === o.value ? "selected" : ""}><input type="radio" name={p.slug} value={o.value} checked={answers[p.slug] === o.value} onChange={() => choose(p.slug, o.value)}/><span className="radio-visual"/>{o.label}</label>)}</div></fieldset>)}<div className="assessment-actions"><button type="button" className="button button-dark" disabled={count !== pillars.length} onClick={() => { setShowResult(true); setTimeout(() => document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0); }}>Ver recomendações <Icon name="arrow" size={17}/></button><button type="button" className="button button-text" onClick={reset}>Limpar respostas</button></div>{showResult && count === pillars.length && <section id="resultado" className="assessment-results"><div className="result-header"><span className="section-kicker">RESULTADO ORIENTATIVO</span><h2>Próximos pontos de atenção</h2><p>{gaps.length ? `${gaps.length} ${gaps.length === 1 ? "pilar merece" : "pilares merecem"} atenção adicional, conforme as respostas.` : "As cinco práticas iniciais foram declaradas como documentadas. Consulte os pilares para aprofundar a análise."}</p></div>{gaps.map(p => <article className="result-card" key={p.slug}><span className={`result-marker ${p.color}`}>{p.symbol}</span><div><small>{p.title.toUpperCase()} · {answers[p.slug] === "nao" ? "AINDA NÃO" : "PARCIAL"}</small><h3>{p.recommendation}</h3><p><strong>Consideração OT:</strong> {p.ot}</p><Link href={`/pilares/${p.slug}`}>Ver justificativa e fontes <Icon name="arrow" size={15}/></Link></div></article>)}<div className="result-footer">As respostas ficam apenas neste navegador. Consulte as fontes vinculadas a cada pilar para fundamentar sua análise.</div></section>}</div>;
}
