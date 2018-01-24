import development from './development';
import production from './production';

export default process.env.DEVELOPMENT ? development : production;
