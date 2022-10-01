import dotenv from "dotenv";

dotenv.config();

const ALLOWED_ORIGINS = [/https?:\/\/127\.0\.0\.1:.+/, /https?:\/\/localhost:.+/];

// SERVER
export const PORT = process.env.PORT;

export const CORS = { origin: ALLOWED_ORIGINS };

// GAME
export const CODE_STRENGTH = Number(process.env.CODE_STRENGTH) || 4;
