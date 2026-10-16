import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { pillars, references } from "@/data/manual";

export function generateStaticParams() {
  return pillars.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: pillars.find((p) => p.slug === slug)?.title ?? "Pilar" };
}

function SourceLinks({ ids }: { ids: string[] }) {
  return (
    <div className="source-links">
      <strong>Fontes relacionadas</strong>
      {ids.map((id) => {
        const ref = references.find((r) => r.id === id);
        return ref ? (
          <a href={ref.url} target="_blank" rel="noopener noreferrer" key={id}>
            {ref.id} <Icon name="external" size={13} />
          </a>
        ) : null;
      })}
    </div>
  );
}

export default async function PillarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = pillars.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();

  const p = pillars[index];
  const next = pillars[(index + 1) % pillars.length];
  const guide = p.guide ?? p.identityGuide;
  const guideAreas = guide?.areas ?? guide?.identityTypes ?? [];

  return (
    <div className="content-page">
      <Link href="/pilares" className="breadcrumb">← Todos os pilares</Link>

      <div className={`pillar-hero ${p.color}`}>
        <span className="pillar-hero-icon">{p.symbol}</span>
        <span className="section-kicker">PILAR 0{index + 1} / 05</span>
        <h1>{p.title}</h1>
        <p>{p.summary}</p>
      </div>

      {guide && (
        <>
          <section className="detail-panel identity-intro">
            <span className="section-kicker">VISÃO GERAL</span>
            <h2>O que significa {p.title.toLowerCase()} em Zero Trust para OT?</h2>
            <p>{guide.introduction}</p>
            <div className="identity-definition">
              <strong>Princípio orientador</strong>
              <p>{guide.guidingPrinciple ?? "Estar conectado à rede industrial não deve ser suficiente para receber acesso. A decisão deve considerar quem ou o que solicita o recurso, qual função precisa executar e quais condições tornam esse acesso aceitável."}</p>
            </div>
          </section>

          <div className="section-heading compact identity-section-heading">
            <div>
              <span className="section-kicker">ESCOPO DO PILAR</span>
              <h2>{guide.scopeTitle ?? "Quais identidades precisam ser consideradas?"}</h2>
              <p>{guide.scopeDescription ?? "O pilar não se limita ao usuário humano. Em OT, serviços, dispositivos e terceiros também participam das relações de confiança."}</p>
            </div>
          </div>

          <div className="identity-type-grid">
            {guideAreas.map((item, i) => (
              <article className="identity-type-card" key={item.title}>
                <span className="identity-card-index">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>{item.examples}</small>
              </article>
            ))}
          </div>

          <div className="section-heading compact identity-section-heading">
            <div>
              <span className="section-kicker">BASE CONCEITUAL</span>
              <h2>{guide.principleTitle ?? "Princípios que orientam o controle de identidade"}</h2>
            </div>
          </div>

          <div className="identity-principles">
            {guide.principles.map((item) => (
              <article className="identity-principle" key={item.title}>
                <span className="identity-principle-mark"><Icon name="check" size={17} /></span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <small>{item.source}</small>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      <div className="detail-grid">
        <section className="detail-panel">
          <span className="section-kicker">CONTEXTO</span>
          <h2>Riscos observados</h2>
          <ul className="bullet-list">
            {p.risks.map((risk) => <li key={risk}>{risk}</li>)}
          </ul>
        </section>
        <section className="detail-panel">
          <span className="section-kicker">ORIENTAÇÃO</span>
          <h2>Boas práticas</h2>
          <ul className="check-list">
            {p.practices.map((practice) => (
              <li key={practice}><Icon name="check" size={17} />{practice}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="callout">
        <span className="callout-icon"><Icon name="shield" /></span>
        <div>
          <strong>Consideração específica para OT</strong>
          <p>{p.ot}</p>
        </div>
      </div>

      {guide && (
        <>
          <div className="section-heading compact identity-section-heading">
            <div>
              <span className="section-kicker">CONTROLES PRIORITÁRIOS</span>
              <h2>{guide.controlsTitle ?? "Como traduzir o pilar em controles práticos?"}</h2>
              <p>{guide.controlsDescription ?? "Os controles abaixo devem ser priorizados conforme criticidade, capacidade técnica e impacto operacional."}</p>
            </div>
          </div>

          <div className="identity-controls-grid">
            {guide.controls.map((control) => (
              <article className="identity-control-card" key={control.title}>
                <div className="identity-control-top">
                  <h3>{control.title}</h3>
                  <span>{control.priority}</span>
                </div>
                <p>{control.description}</p>
              </article>
            ))}
          </div>

          <div className="section-heading compact identity-section-heading">
            <div>
              <span className="section-kicker">APLICAÇÃO EM OT</span>
              <h2>{guide.scenariosTitle ?? "Situações comuns e como tratá-las"}</h2>
              <p>{guide.scenariosDescription ?? "Zero Trust deve ser adaptado ao processo. Nem todo mecanismo moderno pode ser inserido diretamente em um ativo industrial."}</p>
            </div>
          </div>

          <div className="ot-scenario-grid">
            {guide.otScenarios.map((scenario) => (
              <article className="ot-scenario-card" key={scenario.title}>
                <span className="scenario-label">CENÁRIO</span>
                <h3>{scenario.title}</h3>
                <div>
                  <small>DESAFIO</small>
                  <p>{scenario.challenge}</p>
                </div>
                <div>
                  <small>ORIENTAÇÃO</small>
                  <p>{scenario.guidance}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="section-heading compact identity-section-heading">
            <div>
              <span className="section-kicker">EVOLUÇÃO GRADUAL</span>
              <h2>Uma jornada possível de maturidade</h2>
              <p>A sequência é orientativa e adapta a ideia de evolução do CISA ZTMM ao contexto deste manual OT.</p>
            </div>
          </div>

          <div className="identity-maturity">
            {guide.maturity.map((item) => (
              <article key={item.level}>
                <span>{item.level}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="identity-two-column">
            <section className="detail-panel">
              <span className="section-kicker">ROTEIRO DE APLICAÇÃO</span>
              <h2>{guide.implementationTitle ?? "Por onde começar?"}</h2>
              <ol className="identity-steps">
                {guide.implementation.map((step, i) => (
                  <li key={step}><span>{String(i + 1).padStart(2, "0")}</span><p>{step}</p></li>
                ))}
              </ol>
            </section>

            <section className="detail-panel identity-indicators-panel">
              <span className="section-kicker">ACOMPANHAMENTO</span>
              <h2>Indicadores sugeridos</h2>
              <p className="identity-panel-intro">{guide.indicatorsIntro ?? "Indicadores ajudam a acompanhar evolução sem transformar o manual em uma certificação formal."}</p>
              <ul className="identity-indicators">
                {guide.indicators.map((indicator) => <li key={indicator}>{indicator}</li>)}
              </ul>
            </section>
          </div>
        </>
      )}

      <div className="detail-panel recommendation-panel">
        <span className="section-kicker">RASTREABILIDADE</span>
        <h2>Da pergunta à recomendação</h2>
        <div className="trace-grid">
          <div>
            <small>PERGUNTA DO DIAGNÓSTICO</small>
            <p>{p.question}</p>
          </div>
          <div>
            <small>RECOMENDAÇÃO INICIAL</small>
            <p>{p.recommendation}</p>
          </div>
        </div>
        <SourceLinks ids={p.sources} />
      </div>

      <div className="page-next">
        <Link href="/diagnostico" className="button button-dark">Fazer diagnóstico <Icon name="arrow" size={17} /></Link>
        <Link href={`/pilares/${next.slug}`} className="text-link">Próximo: {next.title} <Icon name="arrow" size={17} /></Link>
      </div>
    </div>
  );
}
