import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const filePath = path.resolve('data/sampleData.json');

// Defina a secret (pode vir de .env)
const JWT_SECRET = process.env.JWT_SECRET || "segredo_super_forte";

// Gerar token
const generateToken = (user) => {
  return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware de autenticação JWT
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.user = user; // { id: ... }
    next();
  });
};

// POST /api/dados/login
export const login = (req, res) => {
  const { nome, senha } = req.body;
  const data = readData();
  const user = data.find(u => u.nome === nome);

  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

  // Verifica senha
  if (!bcrypt.compareSync(senha, user.senha)) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }

  const token = generateToken(user);
  res.json({ token });
};

// Helper: lê o arquivo JSON
const readData = () => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Helper: salva os dados no JSON
const saveData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET: todos os dados
export const getAllDados = (req, res) => {
  const data = readData();
  res.json(data);
};

// GET: um dado por ID
export const getDadoById = (req, res) => {
  const data = readData();
  const item = data.find(d => d.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item não encontrado" });
  }
};

// POST: criar novo usuário
export const createDado = (req, res) => {
  const data = readData();
  const { nome, idade, senha } = req.body;

  if (!senha) return res.status(400).json({ message: 'Senha é obrigatória' });

  const hashedPassword = bcrypt.hashSync(senha, 8);

  const newDado = {
    id: data.length ? data[data.length - 1].id + 1 : 1,
    nome,
    idade,
    senha: hashedPassword
  };

  data.push(newDado);
  saveData(data);
  res.status(201).json({ id: newDado.id, nome: newDado.nome, idade: newDado.idade });
};

// PUT: atualizar usuário
export const updateDado = (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user.id !== id) {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  const data = readData();
  const index = data.findIndex(d => d.id === id);
  if (index !== -1) {
    // Atualizar dados (sem alterar senha aqui)
    const updated = { ...data[index], ...req.body, id };
    data[index] = updated;
    saveData(data);
    res.json({ id: updated.id, nome: updated.nome, idade: updated.idade });
  } else {
    res.status(404).json({ message: 'Item não encontrado' });
  }
};

// DELETE: excluir usuário
export const deleteDado = (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user.id !== id) {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  let data = readData();
  const index = data.findIndex(d => d.id === id);
  if (index !== -1) {
    const removed = data.splice(index, 1);
    saveData(data);
    res.json(removed[0]);
  } else {
    res.status(404).json({ message: 'Item não encontrado' });
  }
};
