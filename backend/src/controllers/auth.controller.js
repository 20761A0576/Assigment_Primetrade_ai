const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashed, name }
    });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    if (err.code === 'P2002') return next({ status: 400, message: 'Email already in use' });
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) return next({ status: 401, message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if(!match) return next({ status: 401, message: 'Invalid credentials' });

    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login };
