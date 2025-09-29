const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({ error: 'Authorization header missing' });

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if(!user) return res.status(401).json({ error: 'Invalid token' });

    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    next({ status: 401, message: 'Unauthorized' });
  }
};
