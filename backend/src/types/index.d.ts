// src/types/express-session/index.d.ts
import session from "express-session";

declare module "express-session" {
  interface Session {
    userId?: string; // Deklarera userId direkt på Session
  }
}

// Utöka Request-typen också för att säkerställa att TypeScript vet om sessionen
declare module "express" {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}
