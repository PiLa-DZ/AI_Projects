const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/todos.json');

const getTodos = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const saveTodos = (todos) => {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

exports.getAllTodos = (req, res) => {
    res.json(getTodos());
};

exports.createTodo = (req, res) => {
    const todos = getTodos();
    const newTodo = { id: Date.now(), ...req.body, completed: false };
    todos.push(newTodo);
    saveTodos(todos);
    res.status(201).json(newTodo);
};

exports.updateTodo = (req, res) => {
    const todos = getTodos();
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Todo not found' });
    
    todos[index] = { ...todos[index], ...req.body };
    saveTodos(todos);
    res.json(todos[index]);
};

exports.deleteTodo = (req, res) => {
    const todos = getTodos();
    const filtered = todos.filter(t => t.id !== parseInt(req.params.id));
    if (todos.length === filtered.length) return res.status(404).json({ message: 'Todo not found' });
    
    saveTodos(filtered);
    res.status(204).end();
};
