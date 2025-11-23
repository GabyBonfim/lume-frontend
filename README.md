📘 LUME — Plataforma de Desenvolvimento de Soft Skills com IA

A LUME é uma plataforma corporativa focada no desenvolvimento de soft skills, avaliação contínua e acompanhamento de colaboradores dentro de equipes.
O sistema integra Java (Spring Boot) no backend, React + Vite + Tailwind no frontend e uma assistente inteligente chamada LUM.IA, que auxilia gestores e colaboradores com interações automáticas, análises e feedbacks.

Este projeto foi desenvolvido para as disciplinas de Front-End Design Engineering e Java/Domain Driven Design using Java, durante o 1º ano do curso de Análise e Desenvolvimento de Sistemas – FIAP.

👥 Desenvolvedores
Nome	RM	Função
Gabriely Bonfim Silva	RM566242	Front-end, Back-end, UI/UX, integração com API
Mirelly Sousa Alves	RM566299	Back-end, lógica de negócio, LUM.IA e modelagem do sistema
Henrique Sousa Vespasiano	RM562917	Banco de dados, testes e implementação de regras de negócio

📌 Descrição Geral do Projeto

A LUME tem como objetivo automatizar, organizar e ampliar o desenvolvimento humano dentro das empresas, oferecendo:

Gestão de colaboradores

Atribuição de testes individuais

Registro e acompanhamento de resultados

Chat inteligente com IA

Dashboard com status e pendências

Área administrativa para gerenciar toda a operação

A plataforma foi construída com foco em escalabilidade, boas práticas de arquitetura e experiência do usuário.

🛠️ Arquitetura da Solução
Front-end (React + Vite + TypeScript)

React + Vite

TailwindCSS

React Router DOM

Requisições assíncronas para a API

Páginas:

Homepage

Login

Perfil do Colaborador

Perfil Administrativo

Lista de Testes

Detalhes do Teste

Sobre Nós

Componentes reutilizáveis

Layout responsivo

Back-end (Java + Spring Boot + DDD)

Java 17

Spring Boot

Controllers REST

Services e Regras de Negócio

Repositórios JPA

MySQL / H2 (dependendo do ambiente)

Domínio organizado (DDD):

Colaborador

Teste

Feedback

Resultado

Endpoints CRUD completos

Documentação de rotas REST

📊 Banco de Dados (Modelo Resumido)

COLABORADOR

id, nome, email, telefone, dataNascimento, número, testes (1:N)

TESTE

id, titulo, conteúdo, criadoEm, status, colaborador_id

FEEDBACK

id, conteudo, criadoEm, teste_id

📡 Endpoints Principais (API REST)
Método	Rota	Descrição
GET	/colaboradores	Lista todos os colaboradores
POST	/colaboradores	Cria um novo colaborador
GET	/testes	Retorna todos os testes
POST	/colaboradores/{id}/teste/{idTeste}	Atribui um teste
GET	/testes/{id}	Dados completos de um teste
POST	/feedback/{idTeste}	Adiciona feedback ao teste
✨ Funcionalidades Principais
👤 Para Colaboradores

Visualizar seus dados pessoais

Ver testes pendentes

Realizar testes

Enviar respostas

Ler feedbacks da IA

Conversar com a assistente LUM.IA

🛠️ Para Administradores

Criar colaboradores

Editar e excluir cadastros

Atribuir testes

Acessar conversas e feedbacks

Visualizar progresso geral

Gerenciar banco de testes

🎨 Identidade e Experiência do Usuário

A LUME foi projetada para transmitir:

Clareza

Leveza

Organização

Fluidez

Minimalismo moderno

Com uma paleta suave em tons de bege, verde e branco, e elementos arredondados inspirados em sistemas corporativos modernos.

🌐 Links do Projeto

👉 Frontend (Vercel): adicione aqui
👉 Backend (Render): adicione aqui
👉 Vídeo de Demonstração (YouTube): adicione aqui

Se quiser, posso preencher automaticamente quando você mandar os links.

🚀 Como Rodar o Projeto Localmente
Back-end (Java)
# entrar na pasta do backend
cd lume-backend

# rodar o projeto
mvn spring-boot:run


API abrirá em:
👉 http://localhost:8080

Front-end (React)
# entrar na pasta do front
cd lume-frontend

# instalar dependências
npm install

# rodar o projeto
npm run dev


Aplicação abrirá em:
👉 http://localhost:5173

📑 Conclusão

A LUME se consolidou como uma solução inovadora e completa para o desenvolvimento de soft skills dentro de equipes corporativas, unindo tecnologia, design e inteligência artificial. O projeto demonstrou domínio técnico do grupo, uso eficiente de boas práticas de front-end, back-end e modelagem de dados, além de abrir espaço para futuras evoluções e integração com análises avançadas.
