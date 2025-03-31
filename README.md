Este projeto é desenvolvido para a plataforma educacional Teachy, visando implementar um sistema robusto de autenticação e gerenciamento de sessões. A arquitetura é projetada para garantir segurança, escalabilidade e flexibilidade, oferecendo uma experiência de login suave e segura para os usuários, com suporte a múltiplas escolas, login via Google e autenticação de dois fatores (2FA).

Tecnologias Utilizadas

Linguagem: TypeScript
Escolhida por oferecer tipagem estática, facilitando a manutenção e desenvolvimento de um código limpo.

Backend Framework: NestJS
Motivo: NestJS oferece uma estrutura modular e escalável, adequada para criar um sistema robusto de autenticação e gerenciamento de sessões com integração fácil ao TypeScript. Além disso o controle de rotas é gerenciado de forma abstrata, tendo uma vantagem sobre os concorrentes.
Alternativas Consideradas:
Express.js: Descartado devido à necessidade de configurações extensivas para alcançar o mesmo nível de modularidade.

Autenticação e Gestão de Sessões: Passport.js
Motivo: Parece mais adequado um controle de autenticação interno para esse cenário, tanto em relação à exposição dos dados dos usuários quanto ao custo associado à utilização de sistemas externos. O Passport.js é uma solução extensível que suporta múltiplas estratégias de autenticação, incluindo OAuth (para Google) e 2FA. 
Alternativas Consideradas:
Auth0: Menos controle interno e potencialmente mais caro em grande escala.
Firebase Auth: Menos controle interno e potencialmente mais caro em grande escala.

Banco de Dados: PostgreSQL e Redis
Motivo: O uso combinado de PostgreSQL e Redis é estratégico para este sistema. O PostgreSQL oferece uma base robusta para o armazenamento de dados relacionais, enquanto o Redis é utilizado para cache em memória. Este sistema pode não exigir um processamento extensivo de CPU, mas a expectativa é de um volume elevado de requisições. Portanto, armazenar dados frequentemente acessados em memória com Redis melhora significativamente o desempenho e reduz a carga de I/O no banco de dados principal.

ORM: TypeORM
Motivo: O TypeORM foi escolhido por ter mais tempo de mercado e sua capacidade de lidar bem com relacionamentos complexos e pela facilidade que oferece no gerenciamento de migrações.
Alternativas Consideradas:
Prisma: Embora seja uma solução bastante adotada, ainda está em fase de aprimoramentos pela equipe mantenedora.
Observação: É importante testar ambas as abordagens para avaliar a performance das queries em diferentes cenários.

Segurança
A segurança é aprimorada através de criptografia com Bcrypt, proteção CSRF/XSS, e gerenciamento de sessões utilizando JWT (JSON Web Tokens).
