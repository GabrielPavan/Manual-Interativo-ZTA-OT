export type PillarGuide = {
  introduction: string;
  guidingPrinciple?: string;
  scopeTitle?: string;
  scopeDescription?: string;
  principleTitle?: string;
  controlsTitle?: string;
  controlsDescription?: string;
  scenariosTitle?: string;
  scenariosDescription?: string;
  implementationTitle?: string;
  indicatorsIntro?: string;
  identityTypes?: { title: string; description: string; examples: string }[];
  areas?: { title: string; description: string; examples: string }[];
  principles: { title: string; description: string; source: string }[];
  controls: { title: string; description: string; priority: string }[];
  maturity: { level: string; title: string; description: string }[];
  otScenarios: { title: string; challenge: string; guidance: string }[];
  implementation: string[];
  indicators: string[];
};

export type Pillar = {
  slug: string; title: string; symbol: string; color: string; question: string;
  summary: string; risks: string[]; practices: string[]; ot: string; recommendation: string; sources: string[];
  identityGuide?: PillarGuide;
  guide?: PillarGuide;
};

export const references = [
  { id: "NIST 800-207", title: "Zero Trust Architecture", organization: "NIST · 2020", url: "https://csrc.nist.gov/pubs/sp/800/207/final", role: "Princípios, componentes lógicos e decisões de acesso de uma arquitetura Zero Trust." },
  { id: "NIST 800-207A", title: "A Zero Trust Architecture Model for Access Control in Cloud-Native Applications", organization: "NIST · 2023", url: "https://csrc.nist.gov/pubs/sp/800/207/a/final", role: "Complementa o SP 800-207 com políticas granulares para identidades de aplicações e serviços." },
  { id: "NIST 800-82r3", title: "Guide to Operational Technology Security", organization: "NIST · 2023", url: "https://csrc.nist.gov/pubs/sp/800/82/r3/final", role: "Segurança OT considerando desempenho, confiabilidade, safety, arquitetura, ativos, vulnerabilidades e controles." },
  { id: "NIST CSWP 28", title: "Security Segmentation in a Small Manufacturing Environment", organization: "NIST · 2023", url: "https://csrc.nist.gov/pubs/cswp/28/security-segmentation-in-a-small-manufacturing-env/final", role: "Abordagem prática para segmentação de segurança em manufatura baseada em ativos, requisitos de comunicação e risco." },
  { id: "CISA ZTMM v2", title: "Zero Trust Maturity Model", organization: "CISA · 2023", url: "https://www.cisa.gov/sites/default/files/2023-04/CISA_Zero_Trust_Maturity_Model_Version_2_508c.pdf", role: "Organização em cinco pilares, capacidades transversais e evolução de maturidade para Zero Trust." },
  { id: "ISA/IEC 62443-3-3", title: "System Security Requirements and Security Levels", organization: "ISA/IEC · 2013", url: "https://www.isa.org/getmedia/d73509e9-b626-4709-a406-be6fc7616b79/ISA-62443-3-3_Preview.pdf", role: "Requisitos técnicos para IACS: IAC, UC, integridade, confidencialidade, fluxo restrito, resposta a eventos e disponibilidade." },
];

export const pillars: Pillar[] = [
  {
    slug: "identidade", title: "Identidade", symbol: "ID", color: "mint",
    question: "Os acessos OT são associados a identidades individuais e privilégios revisados?",
    summary: "Garantir que pessoas, serviços e entidades sejam identificados e tenham acesso somente aos recursos necessários, pelo tempo e contexto apropriados.",
    risks: [
      "Contas compartilhadas que reduzem a rastreabilidade das ações",
      "Acessos administrativos ou de fornecedores com privilégios amplos e permanentes",
      "Credenciais padrão, antigas ou sem ciclo de vida definido em sistemas legados",
      "Contas de serviço e identidades de máquina sem responsável ou finalidade documentada",
      "Autenticação baseada apenas em senha para acessos remotos ou privilegiados"
    ],
    practices: [
      "Inventariar identidades humanas, contas de serviço e entidades não humanas",
      "Adotar identidade individual para operadores, engenharia, manutenção e terceiros quando tecnicamente viável",
      "Aplicar privilégio mínimo e separar funções administrativas das atividades operacionais",
      "Usar MFA, preferencialmente resistente a phishing, em acessos humanos remotos e privilegiados quando compatível",
      "Revisar periodicamente privilégios, contas inativas e acessos temporários de terceiros",
      "Registrar autenticações, alterações de privilégio e sessões administrativas para apoiar rastreabilidade"
    ],
    ot: "Em OT, a melhoria da identidade não deve introduzir indisponibilidade ou impedir ações operacionais essenciais. Sistemas legados, HMIs e equipamentos que não suportam autenticação moderna podem exigir controles compensatórios em jump servers, gateways, PAM, firewalls ou serviços de acesso remoto. Acesso de emergência deve ser documentado, restrito e testado.",
    recommendation: "Começar pelo inventário de identidades e privilégios dos ativos críticos, eliminar credenciais desnecessárias, restringir acessos remotos e administrativos e definir controles compensatórios para sistemas que não suportem mecanismos modernos de autenticação.",
    sources: ["NIST 800-207", "NIST 800-82r3", "CISA ZTMM v2", "ISA/IEC 62443-3-3"],
    identityGuide: {
      introduction: "No Zero Trust, identidade é um elemento central da decisão de acesso. A localização dentro da rede OT não deve, por si só, estabelecer confiança. Cada acesso deve estar associado a uma entidade conhecida e ser autorizado conforme função, recurso solicitado, contexto e risco, preservando os requisitos de segurança e continuidade do processo industrial.",
      identityTypes: [
        { title: "Pessoas", description: "Operadores, engenheiros, administradores, manutenção e fornecedores devem ser associados a identidades rastreáveis.", examples: "Operador de HMI · Engenheiro de automação · Administrador" },
        { title: "Serviços", description: "Contas utilizadas por aplicações, integrações e tarefas automatizadas precisam de finalidade, proprietário e privilégios definidos.", examples: "SCADA · Historian · Backup · Integração MES" },
        { title: "Entidades não humanas", description: "Dispositivos e componentes também participam de relações de confiança e devem ser reconhecidos quando a tecnologia permitir.", examples: "Estações de engenharia · Gateways · Serviços · Dispositivos" },
        { title: "Terceiros", description: "Acesso externo deve ser temporário, justificado, controlado e encerrado quando a atividade for concluída.", examples: "Fabricante · Integrador · Suporte remoto" }
      ],
      principles: [
        { title: "Verificar explicitamente", description: "Autenticação e autorização devem ocorrer antes do acesso ao recurso, considerando a identidade e, quando disponível, atributos adicionais de contexto.", source: "NIST SP 800-207" },
        { title: "Privilégio mínimo", description: "A identidade recebe somente os acessos necessários à atividade e pelo período necessário, reduzindo exposição e movimentação indevida.", source: "NIST SP 800-207 · CISA ZTMM" },
        { title: "Identificação e autenticação", description: "A ISA/IEC 62443 trata identificação e autenticação como requisito fundamental para sistemas de automação e controle industrial.", source: "ISA/IEC 62443-3-3 · FR 1 / IAC" },
        { title: "Reavaliar confiança", description: "Eventos, alterações de privilégio e risco da identidade devem alimentar revisões de acesso; confiança não deve ser permanente ou implícita.", source: "CISA ZTMM v2" }
      ],
      controls: [
        { title: "Identidade individual", description: "Reduzir contas genéricas e compartilhadas. Quando elas forem inevitáveis por limitação operacional, registrar a exceção e adicionar mecanismos compensatórios de rastreabilidade.", priority: "Fundamental" },
        { title: "MFA para acessos críticos", description: "Priorizar MFA em VPNs, jump servers, PAM e consoles administrativos utilizados por pessoas. Evitar inserir mecanismos incompatíveis diretamente no fluxo de controle do processo.", priority: "Alta" },
        { title: "RBAC e separação de funções", description: "Vincular permissões à função operacional e separar atividades de operação, engenharia, manutenção e administração sempre que viável.", priority: "Alta" },
        { title: "Gestão de terceiros", description: "Conceder acesso mediante aprovação, janela de tempo, escopo definido e monitoramento da sessão; revogar o acesso ao final da atividade.", priority: "Alta" },
        { title: "Ciclo de vida de contas", description: "Criar, alterar, revisar e remover acessos acompanhando mudanças de função, desligamentos, contratos e períodos de inatividade.", priority: "Contínua" },
        { title: "Credenciais privilegiadas", description: "Separar contas administrativas, restringir seu uso e considerar cofres/PAM quando compatíveis com a arquitetura e criticidade do ambiente.", priority: "Alta" }
      ],
      maturity: [
        { level: "01", title: "Inicial", description: "Inventário de contas críticas, responsáveis definidos, redução de contas padrão e revisão dos acessos mais sensíveis." },
        { level: "02", title: "Intermediário", description: "MFA em acesso remoto/privilegiado, RBAC, ciclo de vida formal e acesso temporário para fornecedores." },
        { level: "03", title: "Avançado", description: "Integração de fontes de identidade, políticas contextuais, telemetria de autenticação e revisão automatizada onde isso não afete a operação." },
        { level: "04", title: "Adaptativo", description: "Validação mais contínua de identidade e risco para acessos compatíveis, mantendo exceções OT documentadas e controles compensatórios." }
      ],
      otScenarios: [
        { title: "HMI com conta compartilhada", challenge: "A aplicação ou o equipamento pode não suportar múltiplas identidades sem alteração do processo.", guidance: "Não substituir de forma abrupta. Avaliar identificação no sistema operacional, terminal, badge, jump host ou registro operacional e documentar a exceção até que exista alternativa segura." },
        { title: "Fornecedor remoto", challenge: "Credenciais permanentes e conexões diretas dificultam controle e auditoria.", guidance: "Usar ponto de acesso controlado, MFA para o usuário, aprovação prévia, acesso com duração limitada e registro da sessão quando tecnicamente possível." },
        { title: "Conta de engenharia privilegiada", challenge: "Uma credencial com amplo poder pode alterar lógica, configuração e parâmetros de processo.", guidance: "Separar conta comum e administrativa, limitar a equipamentos necessários e registrar o uso privilegiado." },
        { title: "Acesso de emergência", challenge: "Controles excessivos podem atrasar ações necessárias para manter ou recuperar uma operação segura.", guidance: "Definir mecanismo break-glass controlado, com acesso restrito, registro, revisão posterior e testes periódicos do procedimento." }
      ],
      implementation: [
        "Mapear usuários, contas de serviço, identidades de dispositivos e acessos de terceiros associados aos ativos críticos.",
        "Relacionar cada identidade a um responsável, função, recurso acessado e nível de privilégio necessário.",
        "Identificar contas compartilhadas, padrão, inativas e administrativas que representem maior risco.",
        "Priorizar MFA e controle temporal nos acessos humanos remotos e privilegiados, começando pelos pontos de entrada na OT.",
        "Aplicar RBAC/privilégio mínimo e formalizar exceções onde o legado impedir a implementação direta.",
        "Monitorar autenticações e revisar periodicamente privilégios, contas temporárias e acessos de fornecedores."
      ],
      indicators: [
        "% de contas privilegiadas associadas a uma pessoa responsável",
        "% de acessos remotos humanos protegidos por MFA",
        "Quantidade de contas compartilhadas ou padrão ainda em uso",
        "% de contas de terceiros com expiração ou janela de acesso definida",
        "Tempo entre desligamento/mudança de função e revogação do acesso",
        "% de contas de serviço com proprietário e finalidade documentados"
      ]
    }
  },
  {
    slug: "dispositivos", title: "Dispositivos", symbol: "DV", color: "blue",
    question: "Existe inventário dos ativos OT com função, criticidade e responsável definidos?",
    summary: "Conhecer os ativos conectados, sua função, criticidade e condição de segurança antes de permitir ou manter relações de acesso.",
    risks: [
      "Ativos OT não inventariados ou descobertos apenas após incidentes e mudanças",
      "Equipamentos legados, firmware obsoleto e sistemas sem suporte do fabricante",
      "Estações de engenharia e notebooks de manutenção com postura de segurança desconhecida",
      "Dispositivos temporários, de terceiros ou não gerenciados conectados à rede industrial",
      "Mudanças de configuração ou software que alteram a postura do ativo sem revisão operacional"
    ],
    practices: [
      "Manter inventário de ativos com proprietário, função, localização lógica, versão e criticidade",
      "Priorizar descoberta passiva e fontes já existentes quando varreduras ativas puderem afetar o processo",
      "Definir baselines de configuração e registrar desvios relevantes nos ativos críticos",
      "Avaliar vulnerabilidades, firmware e patches com abordagem baseada em risco e janela operacional",
      "Controlar a entrada de notebooks de manutenção, dispositivos de terceiros e equipamentos temporários",
      "Correlacionar condição do dispositivo com decisões de acesso quando tecnicamente possível"
    ],
    ot: "A postura de um dispositivo OT deve ser avaliada sem comprometer estabilidade, tempo de resposta ou safety. PLCs, IEDs, HMIs e outros ativos legados podem não suportar agentes, EDR ou autenticação moderna; nesses casos, inventário passivo, segmentação, monitoramento de rede, hardening e controles compensatórios podem fornecer a visibilidade necessária.",
    recommendation: "Começar pelos ativos que controlam ou supervisionam processos críticos, estabelecer inventário confiável e proprietário responsável, registrar versões e dependências e definir controles compensatórios para dispositivos que não suportem mecanismos modernos de postura e proteção.",
    sources: ["NIST 800-207", "NIST 800-82r3", "CISA ZTMM v2", "ISA/IEC 62443-3-3"],
    guide: {
      introduction: "No pilar de Dispositivos, Zero Trust considera que possuir um endereço conhecido ou estar conectado à rede OT não torna um ativo automaticamente confiável. A decisão de acesso deve utilizar, sempre que possível, informações sobre identidade do dispositivo, criticidade, configuração, integridade, versão, responsável e condição operacional.",
      guidingPrinciple: "Conhecer o dispositivo e sua função é pré-requisito para decidir o que ele pode acessar. Em OT, a coleta dessa informação deve preferir métodos compatíveis com a sensibilidade do processo.",
      scopeTitle: "Quais dispositivos precisam entrar no escopo?",
      scopeDescription: "O inventário deve cobrir não apenas controladores. Estações, infraestrutura, dispositivos temporários e componentes de suporte também participam das relações de confiança.",
      principleTitle: "Princípios que orientam a confiança em dispositivos",
      controlsTitle: "Como traduzir o pilar em controles práticos?",
      controlsDescription: "Os controles devem aumentar visibilidade e integridade sem introduzir ferramentas incompatíveis com o ativo ou com o ciclo operacional.",
      scenariosTitle: "Situações comuns e como tratá-las",
      scenariosDescription: "Em OT, a melhor decisão nem sempre é instalar um agente. Muitas vezes a proteção precisa ser aplicada ao redor do equipamento.",
      areas: [
        { title: "Controle e campo", description: "Ativos que executam ou influenciam diretamente o processo precisam ser conhecidos e tratados conforme criticidade.", examples: "PLC · RTU · IED · Controladores · Gateways" },
        { title: "Supervisão e engenharia", description: "Sistemas que programam, operam ou supervisionam ativos possuem alto impacto e exigem controle reforçado.", examples: "HMI · SCADA · Engineering Workstation" },
        { title: "Infraestrutura OT", description: "Componentes de rede e serviços de suporte sustentam a comunicação e podem ampliar o impacto de uma falha.", examples: "Switch · Firewall · Servidor · NTP · Virtualização" },
        { title: "Temporários e terceiros", description: "Equipamentos de manutenção e suporte devem ter entrada, finalidade, período de uso e saída controlados.", examples: "Notebook de fornecedor · Ferramenta de manutenção · Dispositivo temporário" }
      ],
      principles: [
        { title: "Inventariar antes de confiar", description: "CISA orienta a evolução do inventário e da política de conformidade de dispositivos; em OT, o inventário também sustenta análise de risco, manutenção e resposta.", source: "CISA ZTMM v2 · NIST SP 800-82r3" },
        { title: "Autenticar sujeito e dispositivo", description: "O NIST SP 800-207 estabelece que autenticação e autorização do sujeito e, quando aplicável, do dispositivo antecedem a sessão ao recurso.", source: "NIST SP 800-207" },
        { title: "Preservar integridade", description: "Configuração, firmware e software do ativo devem permanecer dentro de estados aprovados, respeitando as limitações de teste e disponibilidade do processo.", source: "ISA/IEC 62443-3-3 · FR 3 / SI" },
        { title: "Disponibilidade é requisito", description: "Um controle que torna o dispositivo indisponível ou instável pode aumentar o risco operacional; medidas de postura precisam ser compatíveis com o processo.", source: "NIST SP 800-82r3 · ISA/IEC 62443-3-3 · FR 7 / RA" }
      ],
      controls: [
        { title: "Inventário e propriedade", description: "Registrar ativo, função, fabricante/modelo, versão, endereço lógico quando aplicável, criticidade e responsável pela revisão.", priority: "Fundamental" },
        { title: "Descoberta segura", description: "Priorizar monitoramento passivo, tabelas de rede, backups de configuração e fontes de engenharia quando a descoberta ativa puder afetar equipamentos sensíveis.", priority: "Alta" },
        { title: "Baseline e hardening", description: "Definir configurações aprovadas, desabilitar serviços desnecessários e registrar exceções impostas pelo fabricante ou pelo processo.", priority: "Alta" },
        { title: "Vulnerabilidade e patching", description: "Avaliar exposição, criticidade, compensações e testes antes da aplicação de correções; patching em OT deve considerar janela e impacto operacional.", priority: "Contínua" },
        { title: "Dispositivos temporários", description: "Controlar notebooks de terceiros e manutenção por processo de aprovação, verificação, segmentação e prazo de permanência.", priority: "Alta" },
        { title: "Telemetria e proteção", description: "Coletar sinais de condição e eventos onde possível; quando agentes não forem suportados, usar rede, gateways e controles compensatórios.", priority: "Contínua" }
      ],
      otScenarios: [
        { title: "PLC legado sem suporte a agente", challenge: "O controlador não suporta EDR, inventário ativo frequente ou autenticação moderna.", guidance: "Identificar passivamente, restringir fluxos ao necessário, proteger o caminho de engenharia, documentar firmware e aplicar monitoramento/controle na rede ao redor do ativo." },
        { title: "Notebook de manutenção", challenge: "Um equipamento móvel pode transitar entre redes e introduzir software, credenciais ou mídia não controlada.", guidance: "Usar equipamento dedicado ou aprovado, verificar postura antes da conexão, limitar a zona acessível e registrar a janela e a finalidade da atividade." },
        { title: "Ativo desconhecido na rede", challenge: "Um novo endereço ou MAC pode representar instalação legítima, substituição ou conexão não autorizada.", guidance: "Validar com operação e engenharia antes de bloquear automaticamente; identificar responsável e função e só então decidir contenção compatível com o risco do processo." },
        { title: "Firmware vulnerável sem correção imediata", challenge: "O fabricante não fornece patch seguro ou a parada necessária não é aceitável naquele momento.", guidance: "Aplicar medidas compensatórias como restrição de acesso, segmentação, monitoramento e redução de serviços até uma janela de atualização validada." }
      ],
      maturity: [
        { level: "01", title: "Inicial", description: "Inventário dos ativos críticos, responsáveis definidos e identificação dos dispositivos desconhecidos ou sem suporte." },
        { level: "02", title: "Intermediário", description: "Classificação de criticidade, baselines, processo de vulnerabilidade/patching e controle de dispositivos temporários." },
        { level: "03", title: "Avançado", description: "Inventário amplamente automatizado ou passivo, correlação de telemetria, postura e políticas de acesso nos pontos compatíveis." },
        { level: "04", title: "Adaptativo", description: "Condição e risco do dispositivo alimentam decisões dinâmicas, com exceções OT governadas e respostas automatizadas somente onde seguras." }
      ],
      implementation: [
        "Listar ativos de controle, supervisão, engenharia, infraestrutura e manutenção associados aos processos críticos.",
        "Atribuir proprietário, função, criticidade, fabricante/modelo, versão e dependências relevantes a cada ativo.",
        "Identificar quais dispositivos suportam telemetria ou agente e quais exigem visibilidade passiva ou controles compensatórios.",
        "Definir baseline de configuração, processo de vulnerabilidades e critérios de patching compatíveis com a operação.",
        "Criar procedimento para conexão de notebooks, dispositivos de terceiros e equipamentos temporários.",
        "Revisar periodicamente inventário, alterações de configuração, ativos sem suporte e exceções de postura."
      ],
      indicators: [
        "% de ativos críticos presentes no inventário com proprietário definido",
        "% de ativos com versão de firmware/SO conhecida",
        "Quantidade de dispositivos desconhecidos ou não gerenciados detectados",
        "% de ativos críticos com baseline ou configuração de referência documentada",
        "% de vulnerabilidades críticas com tratamento ou compensação documentada",
        "% de dispositivos temporários/terceiros com aprovação e janela registradas"
      ]
    }
  },
  {
    slug: "redes", title: "Redes", symbol: "NW", color: "violet",
    question: "Os fluxos IT–OT estão documentados e limitados ao necessário?",
    summary: "Controlar caminhos de comunicação com base na necessidade do processo, reduzindo confiança implícita entre segmentos, zonas e recursos.",
    risks: [
      "Rede OT plana permitindo movimentação lateral entre ativos com funções distintas",
      "Integrações IT–OT, rotas e regras de firewall sem documentação ou responsável",
      "Acesso remoto direto a segmentos críticos sem ponto de controle intermediário",
      "Regras permissivas baseadas apenas em origem/destino amplos e sem necessidade operacional",
      "Mudanças de segmentação que afetam protocolos, latência, redundância ou disponibilidade"
    ],
    practices: [
      "Mapear fluxos essenciais, origem, destino, protocolo, porta, direção e finalidade operacional",
      "Agrupar ativos em zonas coerentes com função, criticidade e requisitos de comunicação",
      "Utilizar conduítes e pontos de controle para limitar tráfego entre zonas ao necessário",
      "Separar integrações IT–OT por DMZ industrial ou arquitetura equivalente quando aplicável",
      "Centralizar acessos remotos em gateways ou jump hosts controlados e monitorados",
      "Validar mudanças em etapas, observando disponibilidade, redundância e tempo de resposta"
    ],
    ot: "Segmentação em OT precisa respeitar dependências de controle, broadcast/multicast, redundância, sincronismo e protocolos industriais. Antes de bloquear tráfego, o fluxo deve ser conhecido e validado com operação e engenharia. A meta é reduzir a superfície de confiança sem interromper o processo.",
    recommendation: "Começar pelo mapa de comunicações dos processos críticos, identificar fronteiras IT–OT e acessos remotos e aplicar segmentação gradual em zonas e conduítes, com regras específicas e plano de retorno validado pela operação.",
    sources: ["NIST 800-207", "NIST 800-82r3", "NIST CSWP 28", "CISA ZTMM v2", "ISA/IEC 62443-3-3"],
    guide: {
      introduction: "No pilar de Redes, Zero Trust reduz a dependência da localização de rede como fator de confiança. VLAN, sub-rede ou presença dentro da OT não devem conceder acesso amplo por padrão. Os fluxos precisam existir porque suportam uma função conhecida do processo e devem atravessar pontos de controle compatíveis com a criticidade do ambiente.",
      guidingPrinciple: "Mesma rede não significa mesma confiança. Cada caminho de comunicação deve ter finalidade conhecida, origem e destino definidos e controles proporcionais ao risco.",
      scopeTitle: "Quais caminhos de comunicação precisam ser considerados?",
      scopeDescription: "O pilar cobre comunicação interna da OT, fronteiras IT–OT, acesso remoto e integrações que transportam dados ou comandos entre zonas.",
      principleTitle: "Princípios que orientam a segmentação e o fluxo de rede",
      controlsTitle: "Como traduzir o pilar em controles práticos?",
      controlsDescription: "A segmentação deve combinar necessidade de comunicação e nível de proteção requerido, evitando mudanças amplas sem conhecimento do processo.",
      scenariosTitle: "Situações comuns e como tratá-las",
      scenariosDescription: "A maior parte dos riscos de rede em OT envolve relações de confiança excessivas ou caminhos que cresceram sem documentação.",
      areas: [
        { title: "Zonas OT", description: "Agrupam ativos com funções e requisitos de proteção semelhantes, reduzindo a exposição entre partes distintas do processo.", examples: "Célula · Linha · Área de processo · Supervisão" },
        { title: "Conduítes", description: "Representam caminhos controlados entre zonas e concentram regras de comunicação e monitoramento.", examples: "Firewall · ACL · Gateway industrial · Proxy" },
        { title: "Fronteira IT–OT", description: "Integrações corporativas precisam de pontos de mediação para evitar comunicação direta e confiança ampla.", examples: "Industrial DMZ · Historian replica · Broker · Proxy" },
        { title: "Acesso remoto", description: "Usuários e fornecedores externos devem entrar por caminhos definidos, autenticados e limitados ao ativo necessário.", examples: "VPN · ZTNA · Jump server · PRA/PAM" }
      ],
      principles: [
        { title: "Proteger recursos, não confiar no segmento", description: "O NIST SP 800-207 desloca o foco do perímetro para o recurso e não concede confiança implícita pela localização de rede.", source: "NIST SP 800-207" },
        { title: "Microsegmentar conforme perfis", description: "O CISA ZTMM orienta a evolução da segmentação para políticas mais granulares, associadas a aplicações, recursos e contexto.", source: "CISA ZTMM v2 · Networks" },
        { title: "Restringir fluxo de dados", description: "A ISA/IEC 62443 define Restricted Data Flow como requisito fundamental para limitar comunicações entre zonas e conduítes.", source: "ISA/IEC 62443-3-3 · FR 5 / RDF" },
        { title: "Segmentar por comunicação e risco", description: "O NIST CSWP 28 propõe agrupar ativos em zonas conforme requisitos de comunicação e proteção, criando uma base prática para estratégias como Zero Trust.", source: "NIST CSWP 28" }
      ],
      controls: [
        { title: "Mapa de fluxos", description: "Documentar origem, destino, protocolo, porta, direção, frequência e finalidade dos fluxos que sustentam o processo.", priority: "Fundamental" },
        { title: "Zonas e conduítes", description: "Agrupar ativos e conduzir tráfego entre zonas por pontos de controle onde políticas possam ser aplicadas e auditadas.", priority: "Alta" },
        { title: "Regras específicas", description: "Substituir permissões amplas por regras aderentes ao fluxo necessário, evitando bloqueio abrupto antes da validação operacional.", priority: "Alta" },
        { title: "Industrial DMZ", description: "Intermediar integrações IT–OT com serviços apropriados, reduzindo conexões diretas entre redes de diferentes níveis de confiança.", priority: "Alta" },
        { title: "Acesso remoto controlado", description: "Concentrar sessões externas em pontos gerenciados, combinando identidade, escopo, duração e monitoramento.", priority: "Alta" },
        { title: "Visibilidade e resiliência", description: "Monitorar tráfego de forma compatível, preservar redundância e testar impacto de alterações em protocolos e caminhos críticos.", priority: "Contínua" }
      ],
      otScenarios: [
        { title: "Rede OT plana", challenge: "HMIs, estações de engenharia e controladores compartilham ampla conectividade, permitindo propagação lateral.", guidance: "Mapear primeiro os fluxos reais, agrupar por função e criticidade e criar segmentação gradual com regras explícitas entre zonas." },
        { title: "Historian envia dados para IT", challenge: "Uma conexão direta da rede corporativa ao servidor OT pode ampliar a superfície de ataque.", guidance: "Avaliar DMZ industrial, réplica/intermediação e fluxos preferencialmente unidirecionais conforme necessidade e arquitetura do processo." },
        { title: "Fornecedor acessa PLC remotamente", challenge: "VPN direta ao segmento de controle concede alcance maior que o necessário.", guidance: "Encerrar a conexão em ponto controlado, autenticar o usuário, limitar a rota ao recurso autorizado e registrar a sessão quando viável." },
        { title: "Regra antiga 'any-any'", challenge: "A regra pode ter sido criada por urgência e permanecer sem conhecimento das dependências atuais.", guidance: "Observar tráfego, identificar dependências e reduzir a regra em etapas, com janela, monitoramento e rollback planejado." }
      ],
      maturity: [
        { level: "01", title: "Inicial", description: "Fronteiras principais conhecidas, fluxos críticos documentados e acessos remotos identificados." },
        { level: "02", title: "Intermediário", description: "Zonas e conduítes definidos, DMZ quando aplicável e revisão de regras permissivas prioritárias." },
        { level: "03", title: "Avançado", description: "Segmentação mais granular por aplicação/recurso, telemetria consolidada e políticas revisadas com base em uso observado." },
        { level: "04", title: "Adaptativo", description: "Políticas de tráfego incorporam contexto e risco onde tecnicamente viável, preservando exceções OT e resiliência operacional." }
      ],
      implementation: [
        "Levantar topologia, zonas atuais, interfaces IT–OT e caminhos de acesso remoto.",
        "Capturar ou obter fluxos essenciais e registrar finalidade, protocolo, origem e destino.",
        "Agrupar ativos por função, criticidade, comunicação necessária e nível de proteção requerido.",
        "Priorizar fronteiras mais expostas: IT–OT, acesso remoto, engenharia e comunicação entre áreas críticas.",
        "Aplicar regras e segmentação em etapas, com validação da operação, monitoramento e plano de retorno.",
        "Revisar periodicamente regras, exceções, serviços publicados e novos fluxos introduzidos por projetos."
      ],
      indicators: [
        "% de fluxos críticos documentados com finalidade e responsável",
        "% de zonas críticas protegidas por ponto de controle entre si",
        "Quantidade de regras amplas ou sem responsável em firewalls OT",
        "% de acessos remotos que passam por gateway/jump host controlado",
        "Quantidade de conexões diretas IT–OT não justificadas",
        "% de mudanças de segmentação executadas com teste e rollback documentados"
      ]
    }
  },
  {
    slug: "aplicacoes", title: "Aplicações", symbol: "AP", color: "amber",
    question: "Aplicações e integrações OT críticas têm responsáveis e acessos documentados?",
    summary: "Proteger aplicações, serviços e workloads que supervisionam, configuram ou integram o processo, controlando acesso, mudanças e integridade.",
    risks: [
      "Aplicações críticas expostas a usuários, redes ou serviços além do necessário",
      "Contas de serviço, APIs e integrações com privilégios excessivos ou credenciais estáticas",
      "Versões antigas, componentes sem suporte e dependências de software pouco conhecidas",
      "Mudanças em SCADA, HMI, historian ou ferramentas de engenharia sem teste e rollback",
      "Software não autorizado ou alteração de binários/configurações em estações sensíveis"
    ],
    practices: [
      "Catalogar aplicações, serviços, versões, proprietários e dependências do processo",
      "Autorizar acesso por função, identidade, dispositivo e contexto quando suportado",
      "Separar contas de serviço, limitar privilégios e proteger segredos de integração",
      "Aplicar allowlisting ou controles equivalentes em sistemas estáveis e compatíveis",
      "Formalizar gestão de mudanças, testes, backup e rollback para aplicações críticas",
      "Monitorar eventos relevantes de aplicação e integrar proteção contra ameaças onde viável"
    ],
    ot: "Aplicações OT frequentemente têm dependências rígidas de versão, drivers, licenças e protocolos. Atualizar ou endurecer um SCADA, historian ou estação de engenharia sem homologação pode afetar o processo. Zero Trust deve reduzir o acesso e aumentar a integridade, mas toda mudança precisa respeitar compatibilidade do fabricante e requisitos operacionais.",
    recommendation: "Catalogar aplicações e integrações que influenciam processos críticos, definir responsáveis e identidades de serviço, restringir acesso e formalizar mudanças e atualizações com teste e rollback antes de ampliar controles mais dinâmicos.",
    sources: ["NIST 800-207", "NIST 800-207A", "NIST 800-82r3", "CISA ZTMM v2", "ISA/IEC 62443-3-3"],
    guide: {
      introduction: "No pilar de Aplicações e Workloads, Zero Trust trata cada serviço como um recurso que precisa de acesso explícito, identidade conhecida e proteção compatível com sua função. Em OT, isso abrange desde SCADA e HMI até historians, ferramentas de engenharia, APIs, bancos de dados e integrações com MES/ERP.",
      guidingPrinciple: "A aplicação deve receber apenas as conexões, identidades e permissões necessárias à sua função; mudanças e versões precisam preservar a integridade e a continuidade do processo.",
      scopeTitle: "Quais aplicações e workloads precisam ser considerados?",
      scopeDescription: "O escopo deve incluir aplicações visíveis ao operador, ferramentas de engenharia e serviços de integração que podem alterar ou transportar informações do processo.",
      principleTitle: "Princípios que orientam a proteção de aplicações",
      controlsTitle: "Como traduzir o pilar em controles práticos?",
      controlsDescription: "Controles de aplicação devem combinar acesso granular, integridade do software e gestão de mudanças compatível com o ciclo de vida industrial.",
      scenariosTitle: "Situações comuns e como tratá-las",
      scenariosDescription: "Em ambientes OT, mudanças aparentemente simples podem afetar drivers, comunicação, licenciamento ou comportamento do processo.",
      areas: [
        { title: "Supervisão", description: "Aplicações usadas para visualizar e operar o processo possuem alta criticidade e precisam de acesso controlado.", examples: "SCADA · HMI · Alarmes · DCS clients" },
        { title: "Engenharia", description: "Ferramentas capazes de alterar lógica, firmware ou parâmetros representam workloads privilegiados.", examples: "IDE PLC · Configuradores · Ferramentas de commissioning" },
        { title: "Dados e integração", description: "Serviços que transferem dados entre OT e outras camadas precisam de identidades e fluxos claramente definidos.", examples: "Historian · OPC · MES · API · Banco de dados" },
        { title: "Serviços de suporte", description: "Backup, virtualização, licenciamento e acesso remoto podem ter alcance elevado sobre múltiplos ativos.", examples: "Backup · Hypervisor · License server · Remote support" }
      ],
      principles: [
        { title: "Aplicação é recurso", description: "O NIST SP 800-207 considera serviços e aplicações recursos protegidos, e o acesso deve ser explicitamente autorizado antes da sessão.", source: "NIST SP 800-207" },
        { title: "Identidades de serviço importam", description: "O NIST SP 800-207A reforça políticas granulares baseadas em identidades de aplicações e serviços, além de parâmetros de rede e identidade do usuário.", source: "NIST SP 800-207A" },
        { title: "Acesso contextual e mínimo", description: "O CISA ZTMM evolui o acesso a aplicações de atributos estáticos para contexto, expiração e revisão contínua orientada a risco.", source: "CISA ZTMM v2 · Applications and Workloads" },
        { title: "Integridade do sistema", description: "Software, configuração e mudanças devem preservar a integridade do IACS e ser aplicados com controles compatíveis com disponibilidade e safety.", source: "ISA/IEC 62443-3-3 · FR 3 / SI · NIST SP 800-82r3" }
      ],
      controls: [
        { title: "Catálogo de aplicações", description: "Registrar função, versão, proprietário, dependências, servidores, contas de serviço e nível de criticidade.", priority: "Fundamental" },
        { title: "Acesso granular", description: "Restringir acesso por função e necessidade, combinando identidade, dispositivo e contexto onde houver suporte.", priority: "Alta" },
        { title: "Contas e segredos de serviço", description: "Separar identidades de serviço, reduzir privilégios, evitar credenciais embutidas e definir rotação compatível com a aplicação.", priority: "Alta" },
        { title: "Allowlisting e hardening", description: "Em workloads estáveis, permitir apenas software/serviços necessários, após teste de compatibilidade e com exceções documentadas.", priority: "Alta" },
        { title: "Gestão de mudanças", description: "Homologar versões, patches, configuração e integrações; manter backup e procedimento de rollback para componentes críticos.", priority: "Contínua" },
        { title: "Proteção e telemetria", description: "Coletar logs e aplicar proteção contra ameaças no ponto suportado sem introduzir impacto de desempenho ou incompatibilidade.", priority: "Contínua" }
      ],
      otScenarios: [
        { title: "Atualização do SCADA", challenge: "Nova versão pode alterar drivers, serviços, licenças ou integração com equipamentos de campo.", guidance: "Testar em ambiente representativo, validar compatibilidade do fabricante, manter backup da configuração e definir janela/rollback antes da implantação." },
        { title: "Integração Historian–MES", challenge: "Uma conta de serviço ampla e conexão permanente podem criar caminho entre OT e IT.", guidance: "Usar identidade dedicada, privilégio mínimo, fluxo específico pela arquitetura intermediária e monitoramento da integração." },
        { title: "Ferramenta de engenharia", challenge: "O software possui capacidade de alterar lógica e parâmetros de controladores.", guidance: "Restringir a estações e identidades autorizadas, controlar versões/projetos e limitar comunicação aos ativos que realmente precisam ser programados." },
        { title: "Software não autorizado", challenge: "Uma estação crítica recebe utilitário ou executável fora do baseline aprovado.", guidance: "Validar necessidade com engenharia, usar allowlisting quando compatível e tratar exceções formalmente em vez de bloquear sem entender o impacto operacional." }
      ],
      maturity: [
        { level: "01", title: "Inicial", description: "Aplicações críticas, responsáveis, versões e principais contas de serviço são conhecidos." },
        { level: "02", title: "Intermediário", description: "Acessos por função, processo formal de mudanças, hardening e revisão de contas/segredos são aplicados aos sistemas prioritários." },
        { level: "03", title: "Avançado", description: "Controles de acesso incorporam mais contexto, telemetria de aplicação é correlacionada e testes de segurança entram no ciclo de mudança." },
        { level: "04", title: "Adaptativo", description: "Acesso e proteção respondem a risco em tempo mais próximo do real onde suportado, mantendo governança rigorosa sobre exceções OT." }
      ],
      implementation: [
        "Mapear SCADA, HMI, historians, ferramentas de engenharia, integrações e serviços de suporte ligados aos processos críticos.",
        "Registrar versão, proprietário, dependências, contas de serviço e caminhos de comunicação de cada aplicação prioritária.",
        "Revisar acessos humanos e de serviço, removendo privilégios e conexões que não sejam necessários.",
        "Definir baseline, hardening e allowlisting onde houver compatibilidade e benefício operacional.",
        "Formalizar teste, aprovação, backup e rollback para mudanças de versão, patch e configuração.",
        "Monitorar eventos relevantes e revisar periodicamente aplicações sem suporte, segredos, integrações e exceções."
      ],
      indicators: [
        "% de aplicações críticas com proprietário e versão documentados",
        "% de contas de serviço com finalidade, proprietário e privilégio revisados",
        "% de aplicações críticas cobertas por processo formal de mudança e rollback",
        "Quantidade de aplicações críticas fora de suporte ou com versão desconhecida",
        "% de workloads elegíveis com hardening/allowlisting aplicado",
        "% de integrações OT com fluxo e identidade de serviço documentados"
      ]
    }
  },
  {
    slug: "dados", title: "Dados", symbol: "DT", color: "rose",
    question: "Dados, projetos e configurações críticos têm acesso e recuperação definidos?",
    summary: "Conhecer dados e artefatos essenciais ao processo, controlar quem pode utilizá-los e garantir sua integridade, disponibilidade e recuperação.",
    risks: [
      "Projetos de PLC, receitas e configurações armazenados sem proprietário ou classificação",
      "Backups existentes, porém nunca testados ou dependentes do mesmo ambiente comprometido",
      "Arquivos transferidos entre IT e OT sem controle de origem, integridade ou finalidade",
      "Credenciais, chaves ou segredos armazenados em scripts, planilhas ou configurações abertas",
      "Criptografia ou controles de acesso aplicados sem considerar disponibilidade e compatibilidade do processo"
    ],
    practices: [
      "Inventariar dados e artefatos operacionais essenciais, incluindo localização e responsável",
      "Classificar informação conforme impacto sobre operação, integridade, confidencialidade e recuperação",
      "Aplicar privilégio mínimo a projetos, receitas, configurações, históricos e backups",
      "Proteger dados em trânsito e repouso quando tecnicamente viável e compatível com o ambiente",
      "Controlar transferência de arquivos e mídias entre zonas, registrando origem e finalidade",
      "Manter backups protegidos e testar restauração conforme RTO/RPO e criticidade do processo"
    ],
    ot: "Em OT, dados não são apenas documentos. Lógica de PLC, receitas, parâmetros, configurações, alarmes e históricos podem determinar o comportamento físico do processo. Por isso, integridade e disponibilidade costumam ser tão ou mais importantes que confidencialidade, e mecanismos de proteção precisam ser compatíveis com tempos de recuperação e tecnologias legadas.",
    recommendation: "Priorizar a identificação de projetos, configurações, receitas, históricos e backups que permitam operar ou recuperar processos críticos, atribuir responsáveis e aplicar controles de acesso, integridade e recuperação proporcionais ao impacto.",
    sources: ["NIST 800-207", "NIST 800-82r3", "CISA ZTMM v2", "ISA/IEC 62443-3-3"],
    guide: {
      introduction: "No pilar de Dados, Zero Trust exige saber quais informações e artefatos são relevantes, onde estão, quem pode acessá-los e como sua integridade e disponibilidade são mantidas. Em OT, uma pequena alteração em lógica, receita ou parâmetro pode produzir efeito físico, por isso a proteção precisa considerar o impacto operacional.",
      guidingPrinciple: "Dado crítico precisa de proprietário, finalidade, controle de acesso e capacidade de recuperação. A proteção deve acompanhar o ciclo de vida sem impedir o uso legítimo exigido pelo processo.",
      scopeTitle: "Quais dados e artefatos precisam ser considerados?",
      scopeDescription: "O escopo inclui informações usadas para controlar, configurar, investigar e recuperar o ambiente industrial, não apenas dados tradicionais de negócio.",
      principleTitle: "Princípios que orientam a proteção dos dados",
      controlsTitle: "Como traduzir o pilar em controles práticos?",
      controlsDescription: "Classificação, acesso, integridade, criptografia e recuperação devem ser combinados conforme impacto e capacidade técnica do ambiente.",
      scenariosTitle: "Situações comuns e como tratá-las",
      scenariosDescription: "Em OT, a prioridade pode mudar conforme o dado: lógica de controle exige forte integridade; histórico pode exigir disponibilidade; segredos exigem confidencialidade.",
      areas: [
        { title: "Lógica e configuração", description: "Artefatos que definem o comportamento de controladores e sistemas precisam de versionamento, integridade e acesso restrito.", examples: "Projeto PLC · Configuração DCS · Parâmetros · Receitas" },
        { title: "Dados de processo", description: "Telemetria, alarmes e históricos sustentam operação, análise e investigação e podem ter requisitos próprios de retenção.", examples: "Historian · Alarmes · Tendências · Eventos" },
        { title: "Segredos e credenciais", description: "Chaves, senhas e tokens usados por aplicações e integrações não devem ficar expostos ou compartilhados sem controle.", examples: "Senhas de serviço · Certificados · Chaves · Tokens" },
        { title: "Backup e recuperação", description: "Cópias de projetos, imagens e configurações precisam permanecer disponíveis e restauráveis após falha ou incidente.", examples: "Backup PLC · Imagem HMI · Configuração SCADA · Arquivos de recuperação" }
      ],
      principles: [
        { title: "Dados são recursos", description: "O NIST SP 800-207 inclui fontes de dados e serviços computacionais entre os recursos que devem receber proteção e acesso explícito.", source: "NIST SP 800-207" },
        { title: "Inventariar e categorizar", description: "O CISA ZTMM recomenda inventário, categorização, acesso controlado, criptografia e visibilidade ao longo do ciclo de vida dos dados.", source: "CISA ZTMM v2 · Data" },
        { title: "Integridade e confidencialidade", description: "A ISA/IEC 62443 trata integridade do sistema e confidencialidade dos dados como requisitos fundamentais do IACS.", source: "ISA/IEC 62443-3-3 · FR 3 / SI · FR 4 / DC" },
        { title: "Recuperação sustenta disponibilidade", description: "NIST SP 800-82r3 enfatiza requisitos de confiabilidade e disponibilidade; backups e restauração precisam ser planejados para o contexto OT.", source: "NIST SP 800-82r3" }
      ],
      controls: [
        { title: "Inventário e classificação", description: "Mapear dados, projetos, configurações, backups e segredos, indicando proprietário, localização, criticidade e requisito de retenção.", priority: "Fundamental" },
        { title: "Controle de acesso", description: "Aplicar privilégio mínimo a leitura, alteração, cópia e exportação, diferenciando operador, engenharia, manutenção e terceiros.", priority: "Alta" },
        { title: "Integridade e versionamento", description: "Controlar versões, hashes, assinaturas ou mecanismos equivalentes para detectar alteração indevida em artefatos críticos quando viável.", priority: "Alta" },
        { title: "Backup e restauração", description: "Manter cópias protegidas e separadas de falhas comuns, documentar dependências e testar recuperação dos processos prioritários.", priority: "Alta" },
        { title: "Criptografia compatível", description: "Proteger dados em trânsito e repouso onde tecnicamente viável, sem introduzir latência ou incompatibilidade que comprometa o processo.", priority: "Contextual" },
        { title: "Transferência controlada", description: "Definir processo para arquivos e mídias que atravessam IT–OT, com verificação, registro e destino previamente autorizado.", priority: "Alta" }
      ],
      otScenarios: [
        { title: "Projeto de PLC em notebook local", challenge: "A única cópia válida pode ficar em um equipamento individual sem controle de versão ou backup.", guidance: "Definir repositório controlado, responsável, versionamento e cópia protegida; validar procedimento de restauração antes de depender dele." },
        { title: "Historian exporta dados para IT", challenge: "O fluxo precisa disponibilizar informações sem abrir caminho de retorno desnecessário ao ambiente OT.", guidance: "Controlar o fluxo pela arquitetura intermediária, aplicar identidade e permissões específicas e proteger dados conforme sua classificação." },
        { title: "Receita ou parâmetro crítico", challenge: "Alteração indevida pode modificar diretamente qualidade, segurança ou comportamento do processo.", guidance: "Restringir edição, registrar mudanças, manter versão anterior e separar permissões de visualização e alteração quando suportado." },
        { title: "Arquivo de atualização via mídia removível", challenge: "A mídia pode transportar conteúdo malicioso ou versão incorreta para uma rede isolada.", guidance: "Usar processo controlado de origem, verificação, escaneamento em ponto apropriado, aprovação e registro antes da introdução na OT." }
      ],
      maturity: [
        { level: "01", title: "Inicial", description: "Dados e artefatos críticos são identificados, responsáveis são definidos e backups essenciais são localizados." },
        { level: "02", title: "Intermediário", description: "Classificação, privilégio mínimo, processo de transferência e testes de restauração cobrem os dados prioritários." },
        { level: "03", title: "Avançado", description: "Inventário e categorização tornam-se mais consistentes, controles de integridade e telemetria de acesso são ampliados." },
        { level: "04", title: "Adaptativo", description: "Acesso e proteção respondem a contexto e classificação de forma mais dinâmica, com ciclo de vida e recuperação continuamente avaliados." }
      ],
      implementation: [
        "Identificar projetos, lógicas, receitas, configurações, históricos, credenciais e backups relacionados aos processos críticos.",
        "Atribuir proprietário, localização, classificação e requisito de retenção/recuperação aos conjuntos prioritários.",
        "Revisar quem pode ler, alterar, exportar e restaurar cada tipo de dado e remover acessos desnecessários.",
        "Definir versionamento e mecanismos de integridade para artefatos que alteram o comportamento do processo.",
        "Estabelecer fluxo controlado para transferência IT–OT e proteção criptográfica onde houver compatibilidade.",
        "Testar restauração de backups e revisar periodicamente RTO/RPO, cópias, segredos e exceções."
      ],
      indicators: [
        "% de dados/artefatos críticos com proprietário e classificação definidos",
        "% de projetos e configurações críticas com backup atualizado e protegido",
        "% de processos prioritários com teste de restauração realizado no período definido",
        "Quantidade de segredos/credenciais armazenados fora de mecanismos aprovados",
        "% de transferências IT–OT críticas cobertas por processo controlado",
        "% de artefatos críticos com versionamento ou mecanismo de integridade documentado"
      ]
    }
  },
];
