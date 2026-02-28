⚽ ScorePulse

O ScorePulse é uma plataforma analítica de futebol desenvolvida com foco em visualização de dados, performance de ligas e análise estatística de competições.

O projeto foi construído utilizando a API-Football como fonte de dados oficial, aplicando estratégias de tratamento, organização e otimização de requisições para transformar dados brutos em informações estratégicas e visualmente intuitivas.

A proposta vai além de apenas exibir resultados: o objetivo é apresentar insights competitivos, comparativos entre ligas e métricas relevantes que ajudam a entender o comportamento das competições ao longo da temporada.

🎯 Objetivo do Projeto

O ScorePulse foi desenvolvido com o objetivo de aprofundar minhas habilidades em integração com APIs externas, manipulação de dados e construção de dashboards analíticos modernos.

O projeto foi criado com foco em:

🌍 Trabalhar de forma prática com consumo de APIs REST (API-Football)

📊 Transformar dados brutos em informações estruturadas e relevantes

🧠 Aplicar lógica de agregação e interpretação de dados estatísticos

🖥️ Desenvolver uma interface moderna e responsiva utilizando Next.js

🧩 Estruturar o projeto de forma modular e escalável

Mais do que apenas exibir resultados de partidas, o objetivo foi entender como:

Dados são organizados e entregues por APIs externas

Estruturar chamadas e tratamento de respostas

Modelar dados para exibição estratégica

Construir uma experiência visual baseada em métricas

O projeto também representa um exercício prático de engenharia de software aplicada a dados esportivos, integrando front-end, rotas server-side e organização arquitetural.

🌍 Integração com API-Football

O sistema consome dados da API-Football, incluindo:

Tabelas de classificação

Jogos por data

Estatísticas de partidas

Informações de times

Ligas e temporadas

Para evitar atingir o limite diário da API, foram implementadas estratégias como:

Cache com tempo de expiração (TTL)

Centralização de requisições via rotas /api

Reaproveitamento inteligente de dados já carregados

Isso garante melhor performance e menor consumo de requisições externas.


📊 Estudo e Tratamento de Dados

Os dados recebidos da API são processados para gerar:

Total de ligas cadastradas

Total de times monitorados

Total de partidas registradas

Média de gols por partida

Liga mais competitiva (menor gap entre top 5)

Análises comparativas entre campeonatos

O foco do projeto é apresentar dados de forma clara, estratégica e comparável.

🖥️ Agora vamos estruturar a parte por páginas:

🏠 Home

<img width="1919" height="910" alt="Captura de tela 2026-02-28 110226" src="https://github.com/user-attachments/assets/f38c3630-10a8-48a4-875a-91b0b5d00c93" />


A página inicial exibe:

Jogos organizados por data

Sistema de favoritos (persistido via localStorage)

Navegação por dias com scroll horizontal

Separação entre jogos gerais e jogos favoritos

Layout moderno e responsivo
