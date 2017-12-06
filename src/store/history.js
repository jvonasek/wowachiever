import createHistory from 'history/createBrowserHistory';

import { getProcessEnvPublicUrl } from '../utils';

export default createHistory({
  basename: getProcessEnvPublicUrl(),
});
