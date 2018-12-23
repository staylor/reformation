import decodeComponent from 'decode-uri-component';

/* eslint-disable no-param-reassign */

function encode(value, options) {
  if (options.encode) {
    return options.strict ? encodeURIComponent(value) : encodeURIComponent(value);
  }

  return value;
}

function decode(value, options) {
  if (options.decode) {
    return decodeComponent(value);
  }

  return value;
}

function encoderForArrayFormat(options) {
  switch (options.arrayFormat) {
    case 'index':
      return (key, value, index) =>
        value === null
          ? [encode(key, options), '[', index, ']'].join('')
          : [encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join(
              ''
            );
    case 'bracket':
      return (key, value) =>
        value === null
          ? [encode(key, options), '[]'].join('')
          : [encode(key, options), '[]=', encode(value, options)].join('');
    default:
      return (key, value) =>
        value === null
          ? encode(key, options)
          : [encode(key, options), '=', encode(value, options)].join('');
  }
}

function parserForArrayFormat(options) {
  let result;

  switch (options.arrayFormat) {
    case 'index':
      return (key, value, accumulator) => {
        result = /\[(\d*)\]$/.exec(key);

        key = key.replace(/\[\d*\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = {};
        }

        accumulator[key][result[1]] = value;
      };
    case 'bracket':
      return (key, value, accumulator) => {
        result = /(\[\])$/.exec(key);
        key = key.replace(/\[\]$/, '');

        if (!result) {
          accumulator[key] = value;
          return;
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = [value];
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };
    default:
      return (key, value, accumulator) => {
        if (accumulator[key] === undefined) {
          accumulator[key] = value;
          return;
        }

        accumulator[key] = [].concat(accumulator[key], value);
      };
  }
}

function keysSorter(input) {
  if (Array.isArray(input)) {
    return input.sort();
  }

  if (typeof input === 'object') {
    return keysSorter(Object.keys(input))
      .sort((a, b) => Number(a) - Number(b))
      .map(key => input[key]);
  }

  return input;
}

export function extract(input) {
  const queryStart = input.indexOf('?');
  if (queryStart === -1) {
    return '';
  }
  return input.slice(queryStart + 1);
}

export function parse(input, options) {
  options = Object.assign({ decode: true, arrayFormat: 'none' }, options);

  const formatter = parserForArrayFormat(options);

  // Create an object with no prototype
  const ret = Object.create(null);

  if (typeof input !== 'string') {
    return ret;
  }

  input = input.trim().replace(/^[?#&]/, '');

  if (!input) {
    return ret;
  }

  input.split('&').forEach(param => {
    // eslint-disable-next-line
    let [key, value] = param.replace(/\+/g, ' ').split('=');

    // Missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    value = value === undefined ? null : decode(value, options);

    formatter(decode(key, options), value, ret);
  });

  return Object.keys(ret)
    .sort()
    .reduce((result, key) => {
      const value = ret[key];
      if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
        // Sort object keys, not values
        result[key] = keysSorter(value);
      } else {
        result[key] = value;
      }

      return result;
    }, Object.create(null));
}

export const stringify = (obj, options) => {
  const defaults = {
    encode: true,
    strict: true,
    arrayFormat: 'none',
  };

  options = Object.assign(defaults, options);

  if (options.sort === false) {
    options.sort = () => {};
  }

  const formatter = encoderForArrayFormat(options);

  return obj
    ? Object.keys(obj)
        .sort(options.sort)
        .map(key => {
          const value = obj[key];

          if (value === undefined) {
            return '';
          }

          if (value === null) {
            return encode(key, options);
          }

          if (Array.isArray(value)) {
            const result = [];

            value.slice().forEach(value2 => {
              if (value2 === undefined) {
                return;
              }

              result.push(formatter(key, value2, result.length));
            });

            return result.join('&');
          }

          return `${encode(key, options)}=${encode(value, options)}`;
        })
        .filter(x => x.length > 0)
        .join('&')
    : '';
};

export const parseUrl = (input, options) => ({
  url: input.split('?')[0] || '',
  query: parse(extract(input), options),
});
