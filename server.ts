// server.ts
import { createRequire } from "module";
import cors from "cors";

const require = createRequire(import.meta.url);
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(router);

const PORT = 5006;

server.listen(PORT, () => {
  console.log(`✅ JSON Server running at http://localhost:${PORT}`);
});
