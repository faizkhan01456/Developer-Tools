import app from './app.js';
import { PORT } from './config/env.js';

app.listen(PORT, () => {
	console.log('');
	console.log('🚀 Server running');

	console.log(`http://localhost:${PORT}`);

	console.log('');
});
