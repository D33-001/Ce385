import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

const TODOS = [
  { id: "1", title: "อ่านสไลด์สัปดาห์ที่ 5", done: false, priority: "high" },
  { id: "2", title: "ติดตั้ง Express", done: true, priority: "medium" },
  { id: "3", title: "ทำ workshop 4", done: true, priority: "low" },
  { id: "4", title: "เตรียมสอบ", done: true, priority: "high" },
];

const PRIORITIES = ["low", "medium", "high"];
function validateTodo(req, res, next) {
  const { title, done, priority } = req.body ?? {};

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title ต้องเป็น string และไม่ว่างเปล่า" });
  }
  if (priority !== undefined && !PRIORITIES.includes(priority)) {
    return res.status(400).json({ error: "Priority ไม่ถูกต้อง" });
  }
  return next();
}

const todoRouter = express.Router();
todoRouter.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

todoRouter.get('/', (req, res) => {
  res.json(TODOS.map((t) => ({ ...t })));
});

todoRouter.get('/:id', (req, res) => {
  const todo = TODOS.find((t) => t.id === req.params.id);
  if (!todo) {
  return res.status(404).json({ error: `ไม่พบรายการ ${req.params.id}` });
  }
  return res.json({ todo });
});

todoRouter.post('/', validateTodo, (req, res) => {
    const created = {
    id: (TODOS.length + 1).toString(),
    title: req.body.title,
    done: req.body.done ?? false,
    priority: req.body.priority ?? "medium",
  };
  TODOS.push(created);
  return res.status(201).json({ created });
});

app.use('/api/v1/todos', todoRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api/v1`);
});