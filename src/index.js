import app from './app';
import './leetbot/leetbot';
import { PORT } from './constants/config';

app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console
