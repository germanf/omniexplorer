import { groupBy, forEach, map } from 'lodash';

const getResponse = (authentication, fromObj) => {
  const response = authentication[`${fromObj}Request`].response;
  const success = response.success;
  const message = response.message;
  const errors = response.errors || [];
  let serverErrors = {};

  if (errors.length) {
    const groupedErrors = groupBy(errors, error => error.field);
    serverErrors = forEach(groupedErrors, (value, key) => {
      groupedErrors[key] = map(value, error => error.value).join(', ');
    });
  }

  return {
    [`${fromObj}Response`]: { success, message, serverErrors }
  };
};

export default getResponse;
