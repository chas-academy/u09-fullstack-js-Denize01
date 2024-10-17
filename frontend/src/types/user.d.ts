import "express-session";

declare module "express-session" {
  interface Session {
    userId?: string; // Lägg till userId som en valfri egenskap
  }
}
