import { PrismaClient } from "../../generated/prisma/client.js";

const db = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});

export default db;
