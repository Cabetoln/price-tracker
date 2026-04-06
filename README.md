# ARCHIV — Price Tracker

Plataforma web que monitora preços de itens de moda, oferece histórico de variação de preços, alertas personalizados e busca visual por imagem.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + TailwindCSS + Recharts |
| Backend | C# ASP.NET 8 + Entity Framework Core |
| Banco | PostgreSQL 16 |
| Cache | Redis 7 |
| Auth | JWT |

## Início rápido

### 1. Subir banco e Redis

```bash
docker compose up -d
```

### 2. Backend

```bash
cd backend/PriceTracker.API
dotnet run
# API em http://localhost:5000
# Swagger em http://localhost:5000/swagger
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
# App em http://localhost:5173
```

## Sprint 1 — Semanas 1-2

| UC | Funcionalidade | Status |
|----|---------------|--------|
| UC01 | Cadastro & Login (JWT) | ✅ |
| UC02 | Busca de item por nome/marca | ✅ |
| UC03 | Histórico de preços (gráfico) | ✅ |
| UC04 | Wishlist (adicionar/remover) | ✅ |

## Sprint 2 — Semanas 3-4

| UC | Funcionalidade |
|----|---------------|
| UC05 | Configuração de alertas |
| UC06 | Notificações |
| UC07 | Busca Visual (Python + CLIP) |
| UC08 | Marcas favoritas |

## Sprint 3 — Semanas 5-6

| UC | Funcionalidade |
|----|---------------|
| UC09 | Feed de promoções |
| UC10 | Dashboard pessoal |
| UC11 | Wishlist pública |
| UC12 | Alertas preditivos |

## Estrutura

```
price-tracker/
├── docker-compose.yml
├── backend/
│   └── PriceTracker.API/
│       ├── Controllers/     # AuthController, ItemsController, WishlistController
│       ├── Data/            # AppDbContext + migrations
│       ├── DTOs/            # Request/Response DTOs
│       ├── Models/          # User, Item, PriceHistory, WishlistItem, PriceAlert
│       └── Services/        # AuthService, ItemService
└── frontend/
    └── src/
        ├── components/      # Navbar, ItemCard
        ├── context/         # AuthContext
        ├── pages/           # Home, Login, Register, Search, ItemDetail, Wishlist
        └── services/        # api.js, authService.js, itemService.js
```
