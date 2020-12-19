import { useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { parse, stringify } from 'query-string';
import { offsetToCursor } from 'utils/connection';

export const useQueryParams = (keys = []) => {
  const location = useLocation();
  const queryParams = parse(location.search);
  const variables = {};
  keys.forEach(key => {
    if (queryParams[key]) {
      if (key === 'year') {
        variables[key] = parseInt(queryParams[key], 10);
      } else {
        variables[key] = queryParams[key];
      }
    }
  });
  return variables;
};

export const usePageOffset = variables => {
  const params = useParams();
  if (params.page) {
    const pageOffset = parseInt(params.page, 10) - 1;
    if (pageOffset > 0) {
      variables.after = offsetToCursor(pageOffset * variables.first - 1);
    }
  }
  return variables;
};

export const useAdminQuery = (query, variables) =>
  useQuery(query, {
    variables,
    // This ensures that the tables are up to date when items are mutated.
    // The alternative is to specify refetchQueries on all mutations.
    fetchPolicy: 'cache-and-network',
  });

export const usePropUpdate = ({ prop, pathname }) => {
  const history = useHistory();
  return value => {
    const p = {};
    if (value) {
      p[prop] = value;
    }
    history.push({
      pathname,
      search: stringify(p),
    });
  };
};

export const useEditQuery = (query, variables = {}) => {
  const params = useParams();
  return useAdminQuery(query, { ...variables, id: params.id });
};

export const useSubmitEdit = ({ mutation }) => {
  const [mutate] = useMutation(mutation);
  const [message, setMessage] = useState(null);

  const onSubmit = data => (e, updates) => {
    e.preventDefault();

    mutate({
      variables: {
        id: data.id,
        input: updates,
      },
    })
      .then(() => {
        setMessage('updated');
        document.documentElement.scrollTop = 0;
      })
      .catch(() => setMessage('error'));
  };

  return { onSubmit, message };
};

export const useSubmitNew = ({ mutation, path, key }) => {
  const [mutate] = useMutation(mutation);
  const [message, setMessage] = useState(null);
  const history = useHistory();

  const onSubmit = (e, updates) => {
    e.preventDefault();

    mutate({
      variables: {
        input: updates,
      },
    })
      .then(({ data }) => {
        history.push({
          pathname: `/${path}/${data[key].id}`,
        });
      })
      .catch(() => setMessage('error'));
  };

  return { message, onSubmit };
};

export const useSubmitDelete = ({ mutation, query: { refetch } }) => {
  const [mutate] = useMutation(mutation);

  return ids => e => {
    e.preventDefault();

    mutate({
      variables: {
        ids,
      },
    }).then(() => {
      refetch();
    });
  };
};
