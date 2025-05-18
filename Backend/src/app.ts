// src/index.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma'
    
import { TestUser } from '../generated/prisma';

const app = express();
const prisma = new PrismaClient()

app.use(express.json());

// Get all users
app.get('/users', async (_req: Request, res: Response<TestUser[] | { error: string }>) => {
  try {
    const users: TestUser[] = await prisma.testUser.findMany();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
app.post('/users', async (req: Request, res: Response<TestUser | { error: string }>) => {
  try {
    const { name, email } = req.body as { name: string; email: string };

    const user: TestUser = await prisma.testUser.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
