import app from './app';
import './utils/connection';

const PORT = 3333;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));