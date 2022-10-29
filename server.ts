import { Month, PrismaClient } from "@prisma/client";
import express, { Request, Response } from 'express';
import { ExpenseDTO } from "./types/expenseDTO";
import { IncomeDTO } from "./types/incomeDTO";
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Testing API
app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

// Get values from last 6 months
app.get('/load', async (req: Request, res: Response) => {
  try {
    const date = new Date()
    const [month, year] = [date.getMonth(), date.getFullYear()];
    const thisMonth = await prisma.month.findFirst({ where: { AND: [{month: month+1}, { year }] }});
    res.json(thisMonth);
  } catch {
    res.send('An error occurred loading the initial data')
  }
});

// get data from six last months
app.get('/report/:id', async (req: Request, res: Response) => {
  const monthId = +req.params.id;
  try {
    const lastMonths = await prisma.month.findMany({ where: { AND: [{id: { gt: monthId-6 }}, {id: {lte: monthId }}]}});
    res.json(lastMonths);
  } catch {
    res.send('It was not possible to load the report');
  }
})

// Add new Month
app.post('/month', async (req: Request, res: Response) => {
  const date = new Date();
  const [month, year] = [date.getMonth(), date.getFullYear()];
  const newMonth = { month: month+1, year }
  try {
    const createdMonth = await prisma.month.create({data: newMonth});
    res.json(createdMonth);
  } catch {
    res.send('It was not possible to create a new month');
  }
})

app.put('/month', async (req: Request, res: Response) => {
  try {
    const month = req.body as Month;
    const updatedMonth = await prisma.month.update({ where: { id: month.id }, data: month });
    res.json(updatedMonth);
  } catch {
    res.send('It was not possible to edit the month');
  }
})

app.delete('/month/:id', async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    await prisma.month.delete({ where:{ id }});
    res.send(`Month succesfully deleted`);
  } catch {
    res.send('It was not possible to delete the specified month')
  }
})

// --------
// EXPENSES
// --------


//list all expenses from month
app.get('/month/:number/expenses', async (req: Request, res: Response) => {
  try {
    const month: number = +req.params.number;
    const allExpenses: ExpenseDTO[] = await prisma.expense.findMany({ where: { month_id: { equals: month }}});
    res.json(allExpenses);
  } catch {
    res.send('It was not possible to get the expenses');
  }
})

// Add new Expense
app.post('/expense', async (req: Request, res: Response) => {
  try {
    const expense = req.body;
    await prisma.expense.create({data: expense});
    res.json(expense)
  } catch {
    res.send('It was not possible to add an expense');
  } 
})

// Method to edit existing expense
app.put('/expense', async (req: Request, res: Response) => {
  try {
    const expense = req.body;
    const updatedExpense = await prisma.expense.update({where: { id: expense.id }, data: expense });
    res.json(updatedExpense)
  } catch {
    res.send('It was not possible to update the expense');
  }
})

app.delete('/expense/:id', async (req: Request, res: Response) => {
  try {
    const id: number = +req.params.id;
    await prisma.expense.delete({ where: { id }});
    res.send(`expense #${ id } deleted`);
  } catch {
    res.send('It was not possible to delete the expense');
  }
})

// -------
// INCOMES
// -------

/**
 * Methid to list all incomes from specified month
 */
app.get('/month/:number/incomes', async (req: Request, res: Response) => {
  try {
    const month = +req.params.number;
    const allIncomes = await prisma.income.findMany({where: { month_id: { equals: month }}});
    res.json(allIncomes);
  } catch {
    res.send('It was not possible to list the incomes');
  }
})

/**
 * Method to add new Income
 */
app.post('/income', async (req: Request, res: Response) => {
  try {
    const income = req.body; 
    const newIncome = await prisma.income.create({data: income});
    res.json(newIncome);
  } catch {
    res.send('It was not possible to add the income');
  }
})

/**
 * Method to edit existing income
 */ 
app.put('/income/', async (req: Request, res: Response) => {
  try {
    const income = req.body as IncomeDTO;
    const updatedIncome = await prisma.income.update({where: { id: income.id }, data: income});
    res.json(updatedIncome)
  } catch {
    res.send('It was not possible to update the income');
  }
})

/**
 * Method do delete income by ID
 */
app.delete('/income/:id', async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    await prisma.income.delete({ where: { id }});
    res.send(`income #${ id } deleted`)
  } catch {
    res.send('It was not possible to delete the income');
  }
})


app.listen(process.env.PORT)