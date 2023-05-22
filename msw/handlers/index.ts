import { getCurrentSuite, getCurrentTest } from "@vitest/runner";
import { rest } from "msw";

declare module 'vitest' {
  export interface TestContext {
    db?: any;
  }
}

export const handlers = [
  rest.get('http://localhost:3000/api/hello', (_req, res, ctx) => {
    const db = getCurrentTest()?.context.db;
    const users = db.user.getAll();
    return res(
      ctx.delay(Math.random() * 100),
      ctx.json({ users }),
    );
  }),
  rest.post('http://localhost:3000/api/user', async (req, res, ctx) => {
    const db = getCurrentTest()?.context.db;
    const user = db.user.create({ name: (await req.json()).name });
    const userCount = db.user.count();
    console.log({ test: getCurrentTest()?.name, id: user.id, userCount });
    return res(
      ctx.delay(Math.random() * 100),
      ctx.json({ user }),
    );
  }),
  rest.put('http://localhost:3000/api/user/:userId', async (req, res, ctx) => {
    const db = getCurrentTest()?.context.db;
    const userCountShouldBeOne = db.user.count();
    // console.log({ test: getCurrentTest()?.name, id: req.params.userId, userCountShouldBeOne });
    const user = db.user.findFirst({ where: { id: { equals: req.params.userId } } });
    if (!user) {
      throw new Error('User not found');
    }

    db.user.update({
      where: { id: { equals: user.id } },
      data: {
        name: (await req.json()).name,
      },
    });

    return res(
      ctx.delay(Math.random() * 100),
      ctx.json({ user }),
    );
  }),
];