# Teachy SWE Challenge

## Instruções Gerais

1. *Clone* este repositório
2. Em seu *fork*, atenda os casos de usos especificados
3. Nos notifique de sua entrega para que possamos dar prosseguimento ao processo.

## Desafio

O nosso desafio é dividido em dois: 
 - Desenvolvimento frontend
 - Proposta de arquitetura de software

A ideia é conhecer um pouco sobre como você trabalha e pensa de forma prática. Ambos deverão estar no repositório e documentados no README da raiz do projeto. Abaixo temos detalhes sobre os requisitos de cada desafio.

<aside class="notice">
  Recomendamos também que crie suasolução sob a estrutura de pastas abaixo, para facilitar a organização de seu trabalho.
</aside>

Example:

```

  .
  ├── frontend-challenge
  │   └── ...
  └── architecture-challenge
  │   └── README.md
  │   └── ...
  │
  ├── README.md
  └── ...

```

### 1. Desenvolvimento frontend

Implementação de uma aplicação web para a exibição de informações sobre os personagens de Star Wars utilizando paginação infinita com a API https://swapi.dev/ e a seguinte referência de Layout:

<img width="789" alt="Captura de Tela 2024-07-18 às 17 49 12" src="https://github.com/user-attachments/assets/96bfbf45-66fe-4dfd-98a1-d65e9c9b91fc">


Ela precisa ser desenvolvida utilizando *NextJS* e *Tailwind*. Também é necessária uma instrução de como rodar o projeto.

Referências:
 - https://tailwindcss.com/
 - https://swapi.dev/
 - https://nextjs.org/
 - https://react.dev/

### 2. Proposta de arquitetura de software

Se você fosse criar o Pinterest do zero, como você faria?
Principais casos de uso para serem pensados:
 - Como lidar com formatos de mídia diferentes (imagens, videos, links) e de origem diferente (criado por usuário, gerado pela plataforma, ADs, conteúdo externo - que redireciona para um site);
 - Recomendação de conteúdos relevantes para o usuário;
 - Possibilidade so usuário salvar o conteúdo em pastas, curtir e comentar um conteúdo;

A plataforma será utilizada por aproximadamente 100 mil pessoas, a princípio será uma solução apenas para o Brasil ou falantes de lingua portuguesa.

Deve-se explicar o escopo da proposta de arquitetura de software, exemplo: desenho da infra, escolha da stack e arquitetura de serviços. Segue abaixo uma imagem de exemplo de arquitetura. A proposta deverá ser documentada mostrando a proposta e o por quê das escolhas tecnológicas. Sinta-se livre para usar imagens e também referenciar soluções de Cloud.

Sinta-se à vontade para tirar dúvidas.
