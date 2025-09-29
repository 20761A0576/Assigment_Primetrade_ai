const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await prisma.task.create({
      data: { title, description, ownerId: req.user.id }
    });
    res.status(201).json(task);
  } catch (err) { next(err); }
};

const listTasks = async (req, res, next) => {
  try {
    // admin can see all tasks; user sees only own tasks
    const where = req.user.role === 'ADMIN' ? {} : { ownerId: req.user.id };
    const tasks = await prisma.task.findMany({ where, orderBy: { createdAt: 'desc' } });
    res.json(tasks);
  } catch (err) { next(err); }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.task.findUnique({ where: { id: Number(id) } });
    if(!existing) return res.status(404).json({ error: 'Not found' });
    if(req.user.role !== 'ADMIN' && existing.ownerId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

    const updated = await prisma.task.update({
      where: { id: Number(id) },
      data: req.body
    });
    res.json(updated);
  } catch (err) { next(err); }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.task.findUnique({ where: { id: Number(id) } });
    if(!existing) return res.status(404).json({ error: 'Not found' });
    if(req.user.role !== 'ADMIN' && existing.ownerId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (err) { next(err); }
};

module.exports = { createTask, listTasks, updateTask, deleteTask };
