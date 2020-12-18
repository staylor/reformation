const makeEmptyData = () => {
  return {
    edges: [],
    pageInfo: {
      hasPreviousPage: false,
      hasNextPage: true,
      startCursor: '',
      endCursor: '',
    },
  };
};

const getCacheKey = options => {
  let cacheKey = 'default';
  const cacheDirective = options.field.directives.find(d => d.name && d.name.value === 'cache');
  if (cacheDirective) {
    const arg = cacheDirective.arguments.find(d => d.name && d.name.value === 'key');
    if (arg.value.kind === 'Variable' && options.variables[arg.value.name.value]) {
      cacheKey = options.variables[arg.value.name.value];
    } else if (arg.value.kind === 'StringValue') {
      cacheKey = arg.value.value;
    }
  }
  return [cacheKey, cacheKey + JSON.stringify(options.variables)];
};

// eslint-disable-next-line import/prefer-default-export
export const makeCacheAware = (typePolicy, paginationKey) => ({
  ...typePolicy,
  read(existing, options) {
    const [key, hash] = getCacheKey(options);
    if (key === paginationKey) {
      return existing && existing[hash] ? existing[hash] : undefined;
    }
    return existing && existing[key] ? typePolicy.read(existing[key], options) : undefined;
  },
  merge(existing, incoming, options) {
    const [key, hash] = getCacheKey(options);
    if (key === paginationKey) {
      return {
        ...existing,
        [hash]: incoming,
      };
    }
    return {
      ...existing,
      [key]: typePolicy.merge(
        existing && existing[key] ? existing[key] : makeEmptyData(),
        incoming,
        options
      ),
    };
  },
});
