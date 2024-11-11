# Pokémon Favorites App

A full-stack application that allows users to search Pokémon using multiple filters, create favorite lists, and share them through unique codes.

## ⚡ Features

- **Advanced Search System**
  - Search by name
  - Filter by type
  - Filter by ability
  - Real-time results
- **Favorites Management**
  - Add/remove Pokémon to favorites
  - Generate shareable codes (valid for 7 days)
  - Load favorite lists using codes
- **Rich Pokémon Details**
  - Official artwork display
  - Type information
  - Abilities (including hidden abilities)
  - Formatted Pokémon number (#001)

## 🚀 Tech Stack

### Frontend

- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Axios for API requests
- React Router for navigation
- Vitest + Testing Library for testing

### Backend

- Node.js + Express
- MongoDB for data persistence
- TypeScript
- ts-node-dev for development
- Cors for cross-origin support

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Git

### Frontend Setup

```bash
# Navigate to frontend directory
cd front-pokemon

# Install dependencies
npm install

# Start development server
npm run dev
```

Available frontend scripts:

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run test`: Run tests
- `npm run coverage`: Generate test coverage
- `npm run lint`: Run ESLint

### Backend Setup

```bash
# Navigate to backend directory
cd back-pokemon

# Install dependencies
npm install

# Start development server
npm run dev
```

Available backend scripts:

- `npm run dev`: Start development server with hot-reload
- `npm run build`: Build TypeScript to JavaScript
- `npm start`: Run production server

### Environment Variables

Frontend (.env):

```
VITE_API_URL=http://localhost:5000/api
```

Backend (.env):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pokemon-favorites
```

## 📦 Project Structure

```
front-pokemon/
├── src/
│   ├── components/
│   │   ├── pokemon/
│   │   │   └── PokemonCard.tsx      # Pokemon card component
│   │   └── search/
│   │       └── AdvancedSearch.tsx   # Search functionality
│   ├── context/
│   │   └── FavoritesContext.tsx     # Favorites state management
│   ├── services/
│   │   ├── pokemonService.ts        # PokeAPI integration
│   │   └── favoriteService.ts       # Backend API integration
│   └── types/
│       └── pokemon.ts               # TypeScript interfaces

back-pokemon/
├── src/
│   ├── config/
│   │   └── db.ts                    # MongoDB configuration
│   ├── models/
│   │   └── favorite.model.ts        # Mongoose schemas
│   ├── controllers/
│   │   └── favorite.controller.ts   # Request handlers
│   ├── routes/
│   │   └── favorite.routes.ts       # API routes
│   └── app.ts                       # Express application setup
```

## 💾 Data Models

### MongoDB Schemas

```typescript
// Type Schema
const typeSchema = {
  type: {
    name: String,
  },
};

// Ability Schema
const abilitySchema = {
  ability: {
    name: String,
  },
  is_hidden: Boolean, // For hidden abilities
};

// Sprites Schema
const spritesSchema = {
  front_default: String,
  other: {
    "official-artwork": {
      front_default: String,
    },
  },
};

// Pokemon Schema
const pokemonSchema = {
  id: Number,
  name: String,
  types: [typeSchema],
  abilities: [abilitySchema],
  sprites: spritesSchema,
};

// Favorite List Schema
const favoriteListSchema = {
  code: String, // Unique sharing code
  pokemons: [pokemonSchema],
  createdAt: Date, // Auto-expires after 7 days
};
```

## 🔌 API Integration

### External API (PokeAPI)

```typescript
const API_URL = "https://pokeapi.co/api/v2";
```

Endpoints used:

- `GET /pokemon/{name}`: Get Pokémon details
- `GET /type`: Get all Pokémon types
- `GET /ability`: Get Pokémon abilities (limit: 100)
- `GET /type/{type}`: Get Pokémon by type
- `GET /ability/{ability}`: Get Pokémon by ability (limit: 20)

### Backend API

```typescript
const API_URL = "http://localhost:5000/api";
```

Endpoints:

- `POST /api/favorites`: Save favorites list and generate code
  - Body: `{ pokemons: Pokemon[] }`
  - Response: `{ code: string }`
- `GET /api/favorites/{code}`: Get favorites by code
  - Response: `{ pokemons: Pokemon[] }`

## 💅 UI Components

### PokemonCard

Features:

- Displays official artwork
- Shows Pokémon number in #000 format
- Type badges with color coding
- Ability tags with special styling for hidden abilities
- Favorite toggle button
- Hover effects and transitions

### AdvancedSearch

Features:

- Combined search bar for name search
- Type dropdown selector
- Ability dropdown selector (100 most common abilities)
- Loading states and error handling
- Responsive grid layout for results
- Mutually exclusive search options

## 🔄 State Management

Using React Context for favorites management:

```typescript
interface FavoritesContextType {
  favorites: Pokemon[];
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
  generateCode: () => Promise<string>;
  loadFavorites: (code: string) => Promise<void>;
  shareCode: string | null;
}
```

## 🔒 Security & Performance

- CORS enabled for API security
- Data expiration (7 days) for MongoDB documents
- Input validation and sanitization
- Error handling on both frontend and backend
- Optimized Pokemon data structure for storage
- Limited API results for better performance

## 🧪 Testing

The project includes tests for:

- Component rendering
- User interactions
- Context functionality
- API integration

Run tests with:

```bash
# Frontend tests
cd front-pokemon
npm test

# Generate coverage report
npm run coverage
```

👨‍💻 Author
[Alexander Saile Lucano Ramos]

GitHub: [Saile16]

## 📄 License

This project is MIT licensed.
