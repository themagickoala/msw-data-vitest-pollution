import { drop, factory, oneOf, primaryKey } from '@mswjs/data';
import { getId } from './utils';

export const dbCreator = () =>
  factory({
    user: {
      name: String,
      id: primaryKey(getId),
    },
    news: {
      user: oneOf('user'),
      id: primaryKey(getId),
    }
  });

export const db = dbCreator();

export const resetDb = () => {
  drop(db);
};
