import mongoose, { Document, Schema } from "mongoose";

// Definiera interface för aktivitet, detta kommer att användas för typkontroll
export interface IActivity extends Document {
  date: string; // Datumet för aktiviteten (format YYYY-MM-DD)
  activity: string; // Beskrivning av aktiviteten
}

// Skapa Mongoose-schema och använd TypeScript för att definiera typerna
const activitySchema: Schema = new Schema({
  date: { type: String, required: true },
  activity: { type: String, required: true },
});

// Exportera Mongoose-modellen, typad med IActivity interface
const Activity = mongoose.model<IActivity>("Activity", activitySchema);

export default Activity;
