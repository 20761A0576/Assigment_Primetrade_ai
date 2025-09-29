const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createTask(ownerId, { title, description }) {
  return prisma.task.create({
    data: { title, description, ownerId }
  });
}

async function listTasks(user) {
  const where = user.role === 'ADMIN' ? {} : { ownerId: user.id };
  return prisma.task.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });
}

async function updateTask(user, taskId, data) {
  const task = await prisma.task.findUnique({ where: { id: Number(taskId) } });
  if (!task) throw { status: 404, message: 'Task not found' };

  if (user.role !== 'ADMIN' && task.ownerId !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  return prisma.task.update({
    where: { id: Number(taskId) },
    data
  });
}

async function deleteTask(user, taskId) {
  const task = await prisma.task.findUnique({ where: { id: Number(taskId) } });
  if (!task) throw { status: 404, message: 'Task not found' };

  if (user.role !== 'ADMIN' && task.ownerId !== user.id) {
    throw { status: 403, message: 'Forbidden' };
  }

  await prisma.task.delete({ where: { id: Number(taskId) } });
  return { success: true };
}

module.exports = { createTask, listTasks, updateTask, deleteTask };
