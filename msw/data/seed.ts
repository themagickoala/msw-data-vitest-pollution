import { getCurrentSuite, getCurrentTest } from "@vitest/runner";
import { db } from "./database";

export const seed = () => {
  const user = db.user.create({ name: 'User 1'});
  console.log({ test: getCurrentTest()?.name, suite: getCurrentSuite().name, id: user.id });
};
