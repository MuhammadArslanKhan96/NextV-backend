import { model, Schema, Document } from 'mongoose';
import { Stream } from '@interfaces/streams.interface';

const StreamSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  raw: {
    type: String,
    required: true,
  },
});

export const StreamModel = model<Stream & Document>('Stream', StreamSchema);
