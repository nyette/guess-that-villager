import { server } from "./mocks/server";

beforeAll(() => server.listen());

beforeEach(() => jest.useFakeTimers());

afterEach(() => {
  server.resetHandlers();
  jest.useRealTimers();
});

afterAll(() => server.close());
