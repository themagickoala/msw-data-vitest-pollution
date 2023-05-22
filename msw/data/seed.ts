import { drop } from "@mswjs/data";
import { getCurrentSuite, getCurrentTest } from "@vitest/runner";

export const seed = (db: any) => {
  drop(db);
  const userCountShouldBeZero = db.user.count();
  const user = db.user.create({ name: 'User 1'});
  // console.log({ test: getCurrentTest()?.name, id: user.id, userCountShouldBeZero });
};
