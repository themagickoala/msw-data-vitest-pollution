import { getCurrentSuite, getCurrentTest } from "@vitest/runner";
import { rest } from "msw";
import { db } from "../data";

export const handlers = [
  rest.get('http://localhost:3000/api/hello', (_req, res, ctx) => {
    const users = db.user.getAll();
    return res(
      ctx.delay(Math.random() * 200),
      ctx.json({ users }),
    );
  }),
  rest.post('http://localhost:3000/api/user', async (req, res, ctx) => {
    const user = db.user.create({ name: (await req.json()).name });
    console.log({ test: getCurrentTest()?.name, suite: getCurrentSuite()?.name, id: user.id });
    return res(
      ctx.delay(Math.random() * 200),
      ctx.json({ user }),
    );
  }),
  rest.put('http://localhost:3000/api/user/:userId', async (req, res, ctx) => {
    const user = db.user.findFirst({ where: { id: { gte: 1 } } });
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
      ctx.delay(Math.random() * 200),
      ctx.json({ user }),
    );
  }),
];