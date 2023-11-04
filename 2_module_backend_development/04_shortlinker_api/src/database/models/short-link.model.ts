import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { ShortLink } from '../../resources/shortlink/entities/short-link.entity';

export const shortLinkSchema = new mongoose.Schema<ShortLink>({
  path: {
    type: String,
  },
  destination: {
    type: String,
    required: true,
  },
});

// Generate new path before saving
shortLinkSchema.pre('save', function (next) {
  this.path = nanoid(+process.env.SHORT_LINK_LENGTH! || 10);
  next();
});
