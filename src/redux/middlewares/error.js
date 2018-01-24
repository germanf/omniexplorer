/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import isPromise from '../../utils/is-promise';
import oneOfType from '../../utils/one-of-type';
import * as errorTypes from '../../constants/error';
import { clearToken, clearState } from '../../api/auth_token';

export default function globalErrorMiddleware() {
  return next => (action) => {
    const types = [
      errorTypes.GLOBAL_ERROR
    ];
    // If not a promise, continue on
    if (!isPromise(action.payload)) {
      if (action.payload && action.payload.status === 401) {
        clearToken();
        clearState();
        return next({
          type: 'RESET'
        });
      }
      return next(action);
    }

    /**
     * Because it iterates on an array for every async action, this
     * oneOfType function could be expensive to call in production.
     * Another solution would would be to include a property in `meta`
     * and evaulate that property.
     *
     * if (action.meta.globalError === true) {
     *   // handle error
     * }
     *
     * The error middleware serves to dispatch the initial pending promise to
     * the promise middleware, but adds a `catch`.
     */
    if (oneOfType(action.type, types)) {
      // Dispatch initial pending promise, but catch any errors
      return next(action).catch((error) => {
        if (process.env.DEVELOPMENT) {
          console.warn(`${action.type} caught at middleware with reason: ${JSON.stringify(error.message)}.`);
        }

        return error;
      });
    }

    return next(action);
  };
}
