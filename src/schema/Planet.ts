import mongoose, { Document, Schema } from 'mongoose';

type Planet = Document & {};

const PlanetSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    climate: {
      type: String,
      trim: true,
      required: true,
    },
    terrain: {
      type: String,
      trim: true,
      required: true,
    },
    appearances: {
      type: Number,
      required: false,
    },
  }
);

export default mongoose.model<Planet>('Planet', PlanetSchema);