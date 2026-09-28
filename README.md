# Zero Trust OT — manual interativo (MVP 0.1)

Protótipo do portal de apoio ao TCC **Zero Trust em redes de tecnologia operacional**. O conteúdo é uma síntese conceitual em revisão, não uma certificação ou avaliação normativa.

## O que está pronto

- Página inicial com percurso Entenda → Avalie → Aplique.
- Fundamentos, cinco páginas de pilares, referências e navegação responsiva.
- Diagnóstico piloto com uma pergunta por pilar e recomendações vinculadas.
- Respostas guardadas somente no `localStorage` do navegador.
- Exportação estática em `out/`, sem banco de dados ou backend.

## Executar o código

Requer Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Gerar e avaliar a exportação

```bash
npm run build
npx serve out
```

A exportação usa `output: "export"` e `trailingSlash: true`. Sirva a pasta `out` por HTTP; abrir `index.html` diretamente como arquivo local não resolve os caminhos absolutos dos recursos.

## Onde editar

| Local | Conteúdo |
| --- | --- |
| `src/data/manual.ts` | Pilares, perguntas, riscos, práticas, recomendações e fontes |
| `src/app/page.tsx` | Página inicial |
| `src/app/pilares/[slug]/page.tsx` | Modelo das páginas dos pilares |
| `src/components/assessment.tsx` | Questionário e resultado piloto |
| `src/app/globals.css` | Identidade visual e responsividade |

## Próxima revisão conjunta

1. Ajustar a redação de cada pilar à versão final do manual do TCC.
2. Expandir cada pilar para múltiplas perguntas com critérios e vínculos bibliográficos específicos.
3. Revisar o método de priorização com especialistas OT antes de apresentar qualquer indicador de maturidade.
4. Adicionar glossário, plano de implementação e exportação de relatório depois da validação do conteúdo.

Fontes iniciais: [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final), [NIST SP 800-82 Rev. 3](https://csrc.nist.gov/pubs/sp/800/82/r3/final) e [CISA Zero Trust Maturity Model v2](https://www.cisa.gov/sites/default/files/2023-04/CISA_Zero_Trust_Maturity_Model_Version_2_508c.pdf).
