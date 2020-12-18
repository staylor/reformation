import Cookies from 'js-cookie';
import { TOKEN_KEY } from 'utils/constants';
import client from '../apollo/client';

const authToken = Cookies.get(TOKEN_KEY);

export default client({ uri: '/graphql', authToken });
