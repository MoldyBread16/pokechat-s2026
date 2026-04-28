// Default matches backend/chat.py (port 3001 avoids macOS AirPlay using 5000).
const CHAT_API = process.env.REACT_APP_CHAT_API || "https://special-journey-6qqg6qqp477246-3001.app.github.dev"
const POKE_API = "https://pokeapi.co/api/v2"
const POKE_CARD = 213

export {POKE_CARD, CHAT_API, POKE_API}
