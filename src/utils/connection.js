// @flow
import { base64Decode, base64Encode } from 'utils/base64';

const PREFIX = 'arrayconnection:';

export function cursorToOffset(cursor: string) {
  return parseInt(base64Decode(cursor).substring(PREFIX.length), 10);
}

export function offsetToCursor(offset: number) {
  return base64Encode(PREFIX + offset);
}

/**
 * All instances of infinite scroll follow the same convention
 * - Relay-based pagination using the Connection spec
 * - Always loading more items after the last loaded item
 *
 * To avoid component inheritance, `this` must be bound when calling this function
 */
export function bindLoadMore(prop: string) {
  return (e: Event): Promise<{}> => {
    e.preventDefault();

    const { fetchMore, variables } = this.props.data;

    const data = this.props.data[prop];

    return fetchMore({
      variables: {
        ...variables,
        after: data.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const mergedResult = {
          ...fetchMoreResult,
          [prop]: {
            ...fetchMoreResult[prop],
            edges: previousResult[prop].edges.concat(fetchMoreResult[prop].edges),
          },
        };

        return mergedResult;
      },
    });
  };
}
