⚽ ScorePulse

O ScorePulse é uma plataforma analítica de futebol desenvolvida com foco em visualização de dados, performance de ligas e análise estatística de competições.

O projeto foi construído utilizando a API-Football como fonte oficial de dados, aplicando estratégias de tratamento, organização e otimização de requisições para transformar dados brutos em informações estratégicas e visualmente intuitivas.

A proposta vai além de apenas exibir resultados: o objetivo é apresentar insights competitivos, comparativos entre ligas e métricas relevantes que ajudam a entender o comportamento das competições ao longo da temporada.

📱 Experiência Mobile First

O ScorePulse foi projetado seguindo o conceito Mobile First, garantindo:

-> Interface totalmente responsiva

-> Navegação fluida com scroll horizontal por datas

-> Sistema de favoritos otimizado para uso rápido

-> Componentes adaptáveis para diferentes tamanhos de tela

-> Performance otimizada para conexões móveis

A experiência mobile foi pensada para simular o comportamento de aplicativos nativos de esportes, priorizando rapidez na visualização de jogos e interação intuitiva.

🛠️ Arquitetura e Tecnologias Utilizadas

O projeto foi desenvolvido utilizando tecnologias modernas de mercado:

-> Front-end

-> Next.js 16 (App Router)

-> React

-> TypeScript

-> Tailwind CSS

-> ShadCN UI

-> Componentização modular

-> Server Components + Client Components estratégicos

-> Back-end (API Layer)

-> Rotas server-side via /api

-> Tratamento de dados da API-Football

-> Controle de cache e revalidação (revalidate)

-> Redução estratégica de requisições para evitar limite diário

Estratégias Técnicas Implementadas

✅ Cache com tempo de expiração para reduzir consumo da API

✅ Organização de dados por temporada, liga e data

✅ Persistência de favoritos via localStorage

✅ Agrupamento inteligente de partidas por dia

✅ Separação entre jogos gerais e jogos favoritos

✅ Estrutura pensada para escalabilidade futura

🎯 Objetivo do Projeto

O ScorePulse foi desenvolvido com o objetivo de aprofundar minhas habilidades em integração com APIs externas, manipulação de dados e construção de dashboards analíticos modernos.

O projeto foi criado com foco em:

🌍 Trabalhar de forma prática com consumo de APIs REST (API-Football)

📊 Transformar dados brutos em informações estruturadas e relevantes

🧠 Aplicar lógica de agregação e interpretação de dados estatísticos

🖥️ Desenvolver uma interface moderna e responsiva utilizando Next.js

🧩 Estruturar o projeto de forma modular e escalável

Mais do que apenas exibir resultados de partidas, o objetivo foi entender como:

-> Dados são organizados e entregues por APIs externas

-> Estruturar chamadas e tratamento de respostas

-> Modelar dados para exibição estratégica

-> Construir uma experiência visual baseada em métricas

O projeto também representa um exercício prático de engenharia de software aplicada a dados esportivos, integrando front-end, rotas server-side e organização arquitetural.

🌍 Integração com API-Football

O sistema consome dados da API-Football, incluindo:

-> Tabelas de classificação

-> Jogos por data

-> Estatísticas de partidas

-> Informações de times

-> Ligas e temporadas

Para evitar atingir o limite diário da API, foram implementadas estratégias como:

-> Cache com tempo de expiração (TTL)

-> Centralização de requisições via rotas /api

-> Reaproveitamento inteligente de dados já carregados

-> Isso garante melhor performance e menor consumo de requisições externas.


📊 Estudo e Tratamento de Dados

Os dados recebidos da API são processados para gerar:

-> Total de ligas cadastradas

-> Total de times monitorados

-> Total de partidas registradas

-> Média de gols por partida

-> Liga mais competitiva (menor gap entre top 5)

-> Análises comparativas entre campeonatos

O foco do projeto é apresentar dados de forma clara, estratégica e comparável.

🖥️ Agora vamos estruturar a parte por páginas:

🏠 Home

<img width="1919" height="910" alt="Captura de tela 2026-02-28 110226" src="https://github.com/user-attachments/assets/f38c3630-10a8-48a4-875a-91b0b5d00c93" />
<img width="1919" height="908" alt="Captura de tela 2026-02-28 110420" src="https://github.com/user-attachments/assets/1c3d712f-e470-4b19-91ca-844214412980" />

A página inicial foi projetada para oferecer uma visão dinâmica e organizada das partidas, priorizando navegação fluida e personalização.

Ela funciona como o centro de interação do sistema, reunindo jogos por data e permitindo que o usuário acompanhe rapidamente os confrontos do dia.

📅 Organização por Data

-> Jogos agrupados por dia

-> Exibição clara de data, horário e status da partida

-> Estrutura pensada para leitura rápida

-> Separação visual entre competições

-> Essa organização facilita o acompanhamento diário dos jogos.

🔄 Navegação Horizontal por Dias

A navegação entre datas é feita através de scroll horizontal, proporcionando:

-> Transição fluida entre dias

-> Experiência semelhante a aplicativos esportivos modernos

-> Interação rápida sem necessidade de recarregamento completo da página

-> Esse modelo melhora a usabilidade e torna a navegação mais intuitiva.

⭐ Sistema de Favoritos Integrado

A Home possui integração direta com o sistema de favoritos da aplicação.

Os clubes marcados pelo usuário influenciam a forma como os jogos são exibidos, permitindo uma experiência personalizada.

🟢 Aba de Favoritos na Home

Além da visualização geral dos jogos do dia, a página possui uma aba dedicada aos jogos dos times favoritados.

Essa aba permite:

-> Visualizar apenas partidas dos clubes selecionados

-> Acesso rápido aos jogos mais relevantes para o usuário

-> Alternar entre visão geral e visão personalizada

-> Foco total no acompanhamento do próprio time

Essa funcionalidade torna a experiência mais direcionada e centrada no usuário.

💾 Persistência Local

O sistema utiliza localStorage para manter os times favoritos salvos no navegador.

Isso garante que:

-> As preferências não sejam perdidas ao atualizar a página

-> O usuário mantenha sua personalização ativa

-> Não seja necessário backend para armazenar preferências

🎨 Layout e Experiência

A Home foi desenvolvida com foco em:

-> Layout moderno e responsivo

-> Tema visual consistente (neon #39FF14)

-> Componentização reutilizável

-> Separação clara entre informações principais e secundárias

A combinação entre organização por data e aba de favoritos cria uma experiência semelhante a aplicativos esportivos profissionais.

📊 Dashboard Analítico

<img width="1917" height="913" alt="Captura de tela 2026-02-28 110039" src="https://github.com/user-attachments/assets/ee94e937-3b0d-40ca-8c68-924562519657" />


Painel central com indicadores estratégicos:

-> Total de ligas

-> Total de times

-> Diferença entre o 1° colocado e o 5° colocado(mostrando o porque é a liga mais competitiva)

-> Liga mais competitiva

-> Inclui gráficos comparativos entre ligas para análise de competitividade.

📊 Análise Comparativa entre Ligas

Além dos KPIs, o Dashboard inclui gráficos comparativos que permitem analisar:

-> Diferença de pontos entre líderes

-> Distribuição de vitórias nas ligas

-> Média de gols por campeonato

-> Índices de equilíbrio competitivo

Essa abordagem permite identificar padrões como:

-> Ligas mais equilibradas

-> Campeonatos com domínio de poucos clubes

-> Competições com maior volume ofensivo

-> Diferenças estruturais entre torneios

🧠 Objetivo do Dashboard

O Dashboard foi pensado como um ambiente de análise estratégica, aplicando:

-> Agregação de dados de múltiplas ligas

-> Normalização de informações vindas da API

-> Cálculo manual de métricas estatísticas

-> Transformação de dados em visualizações interpretáveis

Ele representa a consolidação do projeto como um sistema analítico, e não apenas um site de consulta de resultados.

⚙️ Aspectos Técnicos

O Dashboard envolve:

-> Consumo de múltiplas rotas internas

-> Processamento server-side para agregação de dados

-> Geração de datasets estruturados para gráficos

-> Componentização reutilizável para KPIs e visualizações

-> Separação entre lógica de cálculo e renderização

📈 Por que isso é relevante?

Essa página demonstra capacidade de:

-> Trabalhar com múltiplas fontes simultaneamente

-> Criar métricas próprias a partir de dados brutos

-> Construir comparações entre entidades distintas (ligas)

-> Organizar visualizações de forma estratégica

O Dashboard consolida o ScoreSoccer como um projeto de engenharia aplicada a análise de dados esportivos.

🏆 Página da Liga

<img width="1918" height="912" alt="image" src="https://github.com/user-attachments/assets/e94b0b6b-0ba4-45ef-bfda-39bcca64c6c6" />


-> Tabela oficial da competição

-> Informações detalhadas da temporada

-> Dados estruturados a partir da API-Football

-> Visualização limpa e organizada da classificação


🔵 Página Personalizada do Time

<img width="1919" height="911" alt="Captura de tela 2026-02-28 105930" src="https://github.com/user-attachments/assets/70f9bc61-9c22-4ac3-b962-174cc1bfa56e" />
<img width="1919" height="912" alt="Captura de tela 2026-02-28 110001" src="https://github.com/user-attachments/assets/811a6125-e76b-44c8-b5aa-71d75dae22d2" />


🧩 Análise Individual por Clube

Cada equipe possui uma página exclusiva e dinâmica, gerada a partir do ID do time na API-Football.
Essa página centraliza informações estratégicas da temporada atual e transforma dados brutos em visualizações analíticas.

A proposta não é apenas mostrar resultados, mas permitir uma leitura de performance ao longo do campeonato.

📌 Informações exibidas

A página do clube apresenta:

🏟️ Informações Institucionais

-> Nome do clube

-> ID na API

-> Estádio

-> Identidade visual do time

⚽ Últimas Partidas

Lista das partidas recentes da temporada, contendo:

-> Adversário

-> Placar final

-> Rodada

-> Data e horário

-> Identificação da competição

Isso permite visualizar rapidamente o momento atual da equipe.

📊 Aproveitamento (Casa x Fora)

Gráfico comparativo contendo:

-> Vitórias

-> Empates

-> Derrotas

-> Percentual de aproveitamento em casa e fora

Esse bloco ajuda a identificar padrões como:

-> Time forte como mandante

-> Oscilação fora de casa

-> Equilíbrio ou inconsistência

📈 Pontos Acumulados na Temporada

Gráfico evolutivo mostrando:

-> Eixo X → Número do jogo na temporada

-> Eixo Y → Pontos acumulados

Essa visualização permite analisar:

-> Crescimento consistente

-> Momentos de queda

-> Sequências positivas

-> Recuperações ao longo do campeonato

É uma forma clara de observar a narrativa da temporada.

🎯 Gols Pró x Gols Contra por Mês

Gráfico comparativo mensal que apresenta:

-> Total de gols marcados

-> Total de gols sofridos

-> Esse indicador ajuda a interpretar:

-> Eficiência ofensiva

-> Solidez defensiva

-> Fases mais produtivas da equipe

-> Oscilações ao longo dos meses

🧠 Objetivo da Página do Time

A construção dessa página teve como foco:

-> Trabalhar modelagem de dados vindos da API

-> Criar agregações estatísticas personalizadas

-> Construir visualizações estratégicas

-> Aplicar lógica de transformação de dados para geração de insights

Cada métrica é calculada a partir das partidas da temporada, organizadas e processadas no lado do servidor antes da renderização.

⚙️ Aspectos Técnicos

-> Rota dinâmica baseada no ID do time

-> Consumo de fixtures filtradas por temporada

-> Agregação manual de dados (vitórias, empates, gols, pontos)

-> Construção de datasets para gráficos

-> Componentização modular dos blocos analíticos


⭐ Página de Favoritos

<img width="1919" height="911" alt="Captura de tela 2026-02-28 110123" src="https://github.com/user-attachments/assets/a6b29c27-fc3d-4a65-b0f8-01b1d0375f7f" />


🎯 Objetivo

A página de Favoritos foi desenvolvida para permitir que o usuário personalize sua experiência dentro da plataforma, selecionando os clubes que deseja acompanhar com maior prioridade.

A proposta é transformar o sistema em algo mais interativo e centrado no usuário, indo além de uma simples visualização de dados gerais.

🖥️ Funcionalidade

Na página de favoritos, o usuário pode:

-> Selecionar seus clubes preferidos dentro da liga

-> Visualizar todos os times organizados por competição (ex: Série A 2024)

-> Marcar e desmarcar clubes dinamicamente

-> Acessar rapidamente a página analítica individual de cada time

-> A interface apresenta os clubes em formato de grid visual, priorizando:

-> Identidade visual (escudos oficiais)

-> Organização clara

-> Facilidade de navegação

-> Experiência intuitiva

⚙️ Usabilidade Técnica

Essa página trabalha conceitos importantes de front-end moderno:

📌 1. Gerenciamento de Estado

Os times favoritados são controlados por estado interno da aplicação, permitindo:

-> Atualização instantânea na interface

-> Feedback visual imediato

-> Sincronização com outras páginas

💾 2. Persistência Local (localStorage)

As preferências do usuário são salvas no navegador utilizando localStorage.

Isso garante que:

-> Os favoritos permanecem salvos mesmo após atualizar a página

-> A experiência seja contínua

-> Não seja necessário backend para armazenar preferências

🔄 3. Integração com Outras Páginas

-> Os clubes marcados como favoritos influenciam outras áreas do sistema, como:

-> Exibição de partidas filtradas na Home

-> Destaque prioritário nos dashboards

-> Acesso rápido às páginas analíticas dos times

Essa integração mostra organização arquitetural e reaproveitamento de dados.

🎨 4. Experiência Visual

A página foi construída com foco em:

-> Grid responsivo

-> Cards interativos

-> Tema neon consistente com o design do projeto

-> Transições suaves ao marcar/desmarcar favoritos

A escolha visual reforça identidade e melhora a usabilidade.

🧠 Conceitos Aplicados

Essa funcionalidade envolve:

-> Manipulação de estado no React

-> Persistência client-side

-> Renderização condicional

-> Componentização reutilizável

-> Organização de dados por liga e temporada

🧠 Arquitetura do Projeto

<img width="1918" height="1021" alt="image" src="https://github.com/user-attachments/assets/f7a14d56-b625-473b-8952-b70940d39c2a" />

O ScoreSoccer foi estruturado com foco em organização, escalabilidade e clareza na separação de responsabilidades. A arquitetura combina Next.js (App Router) no front-end com uma camada de rotas server-side internas para centralizar o consumo da API externa e padronizar o tratamento dos dados.

🧱 Visão Geral

A aplicação é composta por três blocos principais:

-> Camada de Apresentação (UI):
Páginas e componentes responsáveis pela interface (cards, tabelas, gráficos, navegação e estados visuais).

-> Camada de Dados (Rotas internas do Next):
Rotas em /api que atuam como “backend” do projeto, centralizando chamadas, validando parâmetros e transformando respostas.

-> Fonte Externa (API-Football):
API responsável por fornecer standings, fixtures, times, estatísticas e informações das ligas/temporadas.

🔁 Fluxo de Dados

O fluxo foi desenhado para manter o front desacoplado da API externa:

-> Página/Componente solicita dados

-> Chama uma rota interna do projeto (/api/...)

-> A rota interna consulta a API-Football

-> O resultado é tratado/normalizado

-> A UI recebe dados consistentes e renderiza

Isso evita que cada componente “entenda” a API externa e permite evoluir a estrutura do sistema sem quebrar a interface.

🗂️ Organização por Domínio

A estrutura de pastas foi organizada por módulos, o que facilita manutenção e crescimento do projeto:

-> app/ → páginas e rotas (App Router)

-> app/api/football/... → rotas internas de consumo e agregação

-> components/ → componentes reutilizáveis (Navbar, Cards, Charts, Fixtures)

-> lib/ → utilitários, funções de requisição e helpers (ex: apiFootball, cache, formatadores)

Essa abordagem deixa o projeto mais próximo de um produto real, com separação por responsabilidade.

🧩 Componentização e Reuso

A UI foi montada com componentes reutilizáveis, permitindo padronização visual e reaproveitamento:

-> Cards para KPIs e informações rápidas

-> FixturesCard para jogos e resultados

-> Charts para análises (linha, barras, comparativos)

-> Navbar/Layout para consistência de navegação

-> Componentes com props bem definidas, facilitando manutenção

📊 Camada de Agregação e Transformação de Dados

Além de buscar dados, o projeto realiza tratamentos para gerar informação analítica, como:

-> cálculo de pontos acumulados

-> separação casa x fora (vitórias/empates/derrotas)

-> média de gols por partida

-> comparação de desempenho ao longo da temporada

-> organização de partidas por período (ex: mês)

Essas transformações são parte do “estudo de dados” do projeto e sustentam a parte mais forte do sistema: o dashboard e as páginas individuais dos clubes.

🧠 Por que essa arquitetura importa?

Essa estrutura demonstra capacidade de:

-> trabalhar com APIs reais de forma organizada

-> desacoplar UI de fonte externa

-> criar uma camada intermediária para padronização de dados

-> manter componentes reutilizáveis e consistentes

-> evoluir o projeto com segurança


🚀 Atualizações Futuras

O ScoreSoccer foi desenvolvido como uma base sólida para evolução contínua. A arquitetura modular permite expansão tanto na camada analítica quanto na experiência do usuário.

⚠️ Observação sobre dados:
Atualmente o projeto utiliza dados da temporada 2024, pois o plano gratuito da API-Football impõe limitações de acesso a temporadas mais recentes (como 2025/2026).
Essa restrição foi considerada no desenvolvimento, mantendo a aplicação preparada para expansão futura em planos pagos ou integração com novas fontes de dados.

🔐 Autenticação de Usuário

-> Implementação de login e cadastro

-> Persistência de favoritos em banco de dados

-> Histórico personalizado por usuário

-> Sincronização entre dispositivos

Hoje os favoritos são armazenados via localStorage, mas a estrutura já permite evolução para persistência server-side.

📊 Expansão Analítica

-> Comparação direta entre dois times

-> Indicadores avançados (saldo acumulado, sequência de vitórias, streaks)

-> Métricas de eficiência ofensiva e defensiva

-> Ranking de consistência ao longo da temporada

-> Indicadores preditivos simples baseados em média histórica

Essa evolução reforçaria o caráter analítico da plataforma.

🌍 Ampliação de Ligas

-> Atualmente o sistema opera com ligas específicas da temporada 2024 devido às limitações do plano gratuito da API.

-> Expansões futuras incluem:

-> Inclusão de novas competições (La Liga, Bundesliga, Premier League)

-> Comparação entre campeonatos

-> Indicador de competitividade entre ligas

-> Análises intertemporadas (quando permitido pela API)

A arquitetura foi pensada para permitir essa expansão sem necessidade de refatoração estrutural.

⚙️ Evolução Técnica

-> Implementação de cache mais robusto (Redis ou similar)

-> Paginação e carregamento sob demanda

-> Otimizações de performance

-> Estratégia de ISR (Incremental Static Regeneration)

Estrutura completa para deploy em ambiente de produção (Vercel ou similar)

📱 Experiência do Usuário

-> Melhorias na responsividade

-> Animações mais sofisticadas

-> Modo claro/escuro

-> Sistema de filtros avançados

-> Customização de dashboard por preferência do usuário

🧠 Por que mencionar a limitação da API é importante?

Porque demonstra:

-> Entendimento de planos e restrições de APIs reais

-> Capacidade de desenvolver dentro de limitações técnicas

-> Planejamento arquitetural voltado à escalabilidade futura

-> Consciência sobre custo, performance e modelo de negócio

Isso mostra maturidade de engenharia.


🏁 Conclusão & Aprendizados

O desenvolvimento do ScoreSoccer representou uma evolução prática nas minhas habilidades como desenvolvedor, principalmente no que envolve:

🌍 Consumo e organização de APIs externas

🧠 Modelagem e transformação de dados

📊 Construção de dashboards analíticos

🏗️ Estruturação arquitetural com Next.js (App Router)

⚙️ Separação de responsabilidades entre UI e camada de dados

🎨 Construção de interfaces modernas e consistentes

Durante o projeto, aprofundei meu entendimento sobre:

-> Como estruturar aplicações escaláveis

-> Como transformar dados brutos em informação estratégica

-> Como organizar código de forma modular

-> Como integrar experiência do usuário com análise de dados

Mais do que um site de resultados esportivos, o ScoreSoccer é um projeto focado em engenharia aplicada a dados, explorando integração, organização e visualização estratégica de informações.
