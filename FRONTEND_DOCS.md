# 📚 Documentação Técnica - Front-end do Cardápio (Angular)

## Visão Geral

O **Front-end do Cardápio** é uma aplicação Angular moderna que consome a API REST do cardápio. A arquitetura segue o padrão **LIFT (Load, Identify, Folders, Try to be DRY)**, com separação clara entre Core, Features e Shared.

---

## 🏗️ Arquitetura LIFT

### Estrutura de Diretórios

```
cardapio-web/
├── src/
│   ├── app/
│   │   ├── core/                    # Serviços e configurações globais
│   │   │   ├── services/
│   │   │   │   └── menu.service.ts  # Serviço para consumir API
│   │   │   ├── guards/              # Guards de rota (futuro)
│   │   │   └── interceptors/        # Interceptadores HTTP (futuro)
│   │   │
│   │   ├── features/                # Funcionalidades da aplicação
│   │   │   ├── menu/
│   │   │   │   ├── menu-list.component.ts
│   │   │   │   ├── menu-list.component.html
│   │   │   │   └── menu-list.component.css
│   │   │   └── home/                # Futuro
│   │   │
│   │   ├── shared/                  # Componentes, modelos e utilitários compartilhados
│   │   │   ├── components/
│   │   │   │   └── menu-item-card/
│   │   │   │       ├── menu-item-card.component.ts
│   │   │   │       ├── menu-item-card.component.html
│   │   │   │       └── menu-item-card.component.css
│   │   │   ├── models/
│   │   │   │   └── menu-item.model.ts
│   │   │   ├── pipes/               # Pipes customizados (futuro)
│   │   │   └── directives/          # Diretivas customizadas (futuro)
│   │   │
│   │   ├── app.ts                   # Componente raiz
│   │   ├── app.html                 # Template raiz
│   │   ├── app.config.ts            # Configuração da aplicação
│   │   └── app.routes.ts            # Rotas da aplicação
│   │
│   ├── environments/                # Configurações por ambiente
│   │   ├── environment.ts           # Desenvolvimento
│   │   └── environment.prod.ts      # Produção
│   │
│   ├── styles.css                   # Estilos globais
│   └── index.html                   # HTML principal
│
├── angular.json                     # Configuração do Angular CLI
├── tsconfig.json                    # Configuração do TypeScript
└── package.json                     # Dependências do projeto
```

### Padrão LIFT Explicado

| Letra | Significado | Aplicação |
|-------|-------------|-----------|
| **L** | Load | Organizar para carregar rapidamente |
| **I** | Identify | Facilitar identificação de código |
| **F** | Folders | Usar estrutura de pastas clara |
| **T** | Try DRY | Manter código DRY (Don't Repeat Yourself) |

---

## 🚀 Como Executar

### Instalação de Dependências

```bash
cd cardapio-web
npm install
```

### Executar em Desenvolvimento

```bash
ng serve
# ou
npm start
```

A aplicação estará disponível em `http://localhost:4200`

### Build para Produção

```bash
ng build --configuration production
```

Os arquivos compilados estarão em `dist/cardapio-web/`

---

## 📦 Componentes

### MenuListComponent

Componente principal que lista e filtra itens do cardápio.

**Localização:** `src/app/features/menu/menu-list.component.ts`

**Funcionalidades:**
- Listagem de todos os itens
- Filtro por categoria
- Busca por nome
- Carregamento de dados da API
- Tratamento de erros

**Inputs:** Nenhum

**Outputs:** Nenhum

---

### MenuItemCardComponent

Componente que exibe um item do cardápio em formato de card.

**Localização:** `src/app/shared/components/menu-item-card/`

**Funcionalidades:**
- Exibição de informações do item
- Formatação de preço em Real
- Emoji por categoria
- Design responsivo

**Inputs:**
- `item: MenuItem` - Item a ser exibido

**Outputs:** Nenhum

---

## 🔌 Serviços

### MenuService

Serviço responsável por todas as requisições HTTP para a API do cardápio.

**Localização:** `src/app/core/services/menu.service.ts`

**Métodos:**

```typescript
// Obter todos os itens
getAllItems(): Observable<ApiResponse<MenuItem[]>>

// Obter item por ID
getItemById(id: number): Observable<ApiResponse<MenuItem>>

// Filtrar por categoria
getItemsByCategory(categoria: string): Observable<ApiResponse<MenuItem[]>>

// Buscar por nome
searchItems(nome: string): Observable<ApiResponse<MenuItem[]>>

// Obter todas as categorias
getAllCategories(): Observable<ApiResponse<string[]>>
```

---

## 📊 Modelos de Dados

### MenuItem

```typescript
interface MenuItem {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
}
```

### ApiResponse

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  error?: string;
}
```

---

## 🎨 Estilos

### Paleta de Cores

| Cor | Valor | Uso |
|-----|-------|-----|
| Primária | `#667eea` | Botões, links, destaque |
| Secundária | `#764ba2` | Gradientes |
| Fundo | `#f9f9f9` | Fundo da página |
| Texto | `#333` | Texto principal |
| Cinza | `#999` | Texto secundário |

### Componentes Estilizados

- **Cards:** Sombra, hover effect, transições suaves
- **Botões:** Gradiente, hover, active states
- **Inputs:** Borda customizada, focus state
- **Grid:** Responsivo com auto-fill

---

## 🌍 Configuração de Ambiente

### Development (localhost)

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### Production (Vercel)

```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://cardapio-api.onrender.com/api'
};
```

---

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints:

- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** 480px - 767px
- **Small Mobile:** < 480px

---

## 🧪 Testando a Aplicação

### 1. Iniciar o Back-end

```bash
cd ../cardapio-api
npm start
```

### 2. Iniciar o Front-end

```bash
cd ../cardapio-web
ng serve
```

### 3. Acessar a Aplicação

Abra o navegador em `http://localhost:4200`

### 4. Testar Funcionalidades

- ✅ Listar todos os itens
- ✅ Filtrar por categoria
- ✅ Buscar por nome
- ✅ Ver detalhes do item

---

## 🚀 Deploy no Vercel

### Passo 1: Preparar o Repositório

```bash
git init
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Passo 2: Conectar ao Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Importe seu repositório GitHub
4. Configure:
   - **Framework:** Angular
   - **Build Command:** `ng build --configuration production`
   - **Output Directory:** `dist/cardapio-web/browser`
   - **Environment Variables:**
     ```
     ANGULAR_API_URL=https://cardapio-api.onrender.com/api
     ```

### Passo 3: Deploy

Clique em "Deploy" e aguarde a conclusão

---

## 📚 Recursos Adicionais

- [Angular Docs](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## ✅ Checklist de Implementação

- [x] Estrutura LIFT
- [x] MenuListComponent
- [x] MenuItemCardComponent
- [x] MenuService
- [x] Modelos de dados
- [x] Estilos responsivos
- [x] Configuração de ambiente
- [x] Documentação técnica
- [ ] Deploy no Vercel
- [ ] Integração com Back-end

---

**Última atualização:** 2 de Dezembro de 2025  
**Versão:** 1.0.0
