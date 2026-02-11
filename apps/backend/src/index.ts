import type { paths } from '@api-schema';
import { Hono } from 'hono';

type SuccessResponse = paths['/users/{id}']['get']['responses'][200]['content']['application/json'];
const successResponseExample: SuccessResponse = {
  id: 1,
  name: 'John Doe',
};

const app = new Hono<{ Bindings: CloudflareBindings }>();
app.get('/message', (c) => {
  return c.json(successResponseExample);
});

export default app;
