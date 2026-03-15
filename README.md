# Gestão de Geradores - Infratech

Sistema de gerenciamento de geradores para a operação de Carajás-PA.

## Recursos

- Dashboard com estatísticas em tempo real
- Sincronização em tempo real com Firebase
- Filtros avançados (status, automação, fornecedor, nível)
- Busca por texto livre
- Tema claro/escuro
- PWA (Progressive Web App)
- Cache offline para economia de dados

## Deploy no Netlify

1. Faça upload dos arquivos para o Netlify
2. Configure as regras de redirecionamento (já incluso no `_redirects`)
3. O deploy será automático

## Credenciais Admin

- Usuário: `admin`
- Senha: `admin`

## Segurança das Chaves

As chaves do Firebase expostas no código são de **chaves públicas** (client-side). Para proteger seu projeto:

1. **Restringir Domínio no Firebase Console:**
   - Acesse: Firebase Console → Projeto → Configurações → APIs do Firebase
   - Em "Restrições de chave de API", adicione seu domínio Netlify
   - Exemplo: `*.netlify.app`

2. **Regras do Banco de Dados:**
   - Firebase Console → Realtime Database → Regras
   - Configure para permitir apenas leitura/escrita autenticada

3. **Autenticação:**
   - O sistema já possui autenticação básica com login/senha

## Estrutura do Projeto

```
gestao_geradores_netlify/
├── index.html          # Página principal
├── css/styles.css      # Estilos otimizados
├── src/
│   ├── app.js         # Lógica da aplicação
│   ├── firebase.js   # Integração Firebase
│   ├── utils.js      # Funções utilitárias
│   └── env.js        # Configurações
├── sw.js              # Service Worker (cache)
├── manifest.json     # Manifesto PWA
├── _redirects        # Redirects Netlify
└── README.md         # Este arquivo
```

## Otimizações para Conta Free

- Service Worker com cache agressivo
- CSS inline mínimo
- Firebase Realtime Database (free tier)
- Módulos ES6 para lazy loading

## Tecnologias

- Tailwind CSS (via CDN)
- Chart.js
- Font Awesome
- Firebase Realtime Database