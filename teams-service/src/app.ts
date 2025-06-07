import express from 'express';
import teamsRouter from './teams.controller';

const app = express();

// Включаем парсинг JSON-запросов
app.use(express.json()); // <-- добавлено для поддержки методов POST/PATCH/PUT

const PORT = 3000;

app.use('/api', teamsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
