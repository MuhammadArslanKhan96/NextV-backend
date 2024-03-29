import { App } from '@/app';
import { StreamRoute } from '@routes/streams.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new StreamRoute()]);

app.listen();
