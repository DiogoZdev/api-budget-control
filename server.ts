import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from 'express';
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Testing API
app.get('/', (res: Response) => {
  res.send('API runnig');
});

// Get values from last 6 months
app.get('/report', async (res: Response) => {
  const months = await prisma.month.findMany({take: 6});
  res.json(months)
});

// Add new Month
app.post('/add/month', async (req: Request, res: Response) => {
  const month = req.body;
  const createdMonth = await prisma.month.create({data: month});
  res.json(createdMonth);
})

// Add new Expense
app.post('/add/expense', async (req: Request, res: Response) => {
  const expense = req.body;
  await prisma.expense.create({data: expense});
  res.json(expense)
})

//list all expenses from month
app.get('/month/:number/expenses', async (req: Request, res: Response) => {
  const month = req.params.number;
  const allExpenses = await prisma.expense.findMany({ where: { month_id: { equals: +month }}});
  res.json(allExpenses);
})

// Add new Income
app.post('/add/income', async (req: Request, res: Response) => {
  const income = req.body; 
  const newIncome = await prisma.income.create(income);
  res.json(newIncome)
})

// List all incomes from month
app.get('/month/:number/incomes', (req: Request, res: Response) => {
  const month = req.params.number;
  const allIncomes = prisma.income.findMany({where: { month_id: { equals: +month }}});
  res.json(allIncomes);
})

app.listen(process.env.PORT)