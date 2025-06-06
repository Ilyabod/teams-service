import express from 'express';
import teamsRouter from './teams.controller';

const app = express();

const PORT = 3000;

app.use('/api', teamsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
