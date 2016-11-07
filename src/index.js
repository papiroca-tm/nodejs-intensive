import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.get('/', (req, res) => {
  const a = req.query.a || 0;
  const b = req.query.b || 0;
  const result = parseInt(a) + parseInt(b);
  res.send(result.toString());
});

app.listen(3000, () => {
  console.log('app listening on port 3000');
});
