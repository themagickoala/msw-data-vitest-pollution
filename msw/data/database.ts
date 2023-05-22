import { drop, factory, oneOf, primaryKey } from '@mswjs/data';
import { uuid } from 'uuidv4';

export const dbCreator = () =>
  factory({
    user: {
      name: String,
      id: primaryKey(uuid),
    },
    news: {
      user: oneOf('user'),
      id: primaryKey(uuid),
    }
  });
