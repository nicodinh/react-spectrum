import moment from 'moment';

export const toMoment = (value, format) => {
  // if 'today'
  if (value === 'today') {
    return moment();
  }

  // If it's a moment object
  if (moment.isMoment(value)) {
    return value.isValid() ? value.clone() : null;
  }

  // Anything else
  const result = moment(value, value instanceof Date ? null : format, true);
  return result.isValid() ? result : null;
};

export const isDateInRange = (date, min, max) => {
  if (!min && !max) {
    return true;
  }
  if (!min) {
    return date <= max;
  }
  if (!max) {
    return date >= min;
  }
  return min <= date && date <= max;
};

export const formatMoment = (date, valueFormat) => {
  if (!date) {
    return '';
  }
  if (valueFormat === moment.ISO_8601) {
    return date.format();
  }
  if (typeof valueFormat === 'string') {
    return date.format(valueFormat);
  }

  throw new Error(
    `${ valueFormat } is not valid, 'valueFormat' should be a moment format string ` +
    'or the moment.ISO_8601 constant.'
  );
};