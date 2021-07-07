import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import ShowsList from 'routes/App/Shows/List';
import ShowsGrid from 'routes/App/Shows/Grid';

const showsQuery = gql`
  query ShowsQuery($first: Int, $after: String, $taxonomy: String, $term: String) {
    shows(latest: true, first: $first, after: $after, taxonomy: $taxonomy, term: $term) {
      ...ShowsGrid_shows
    }
  }
  ${ShowsGrid.fragments.shows}
`;

function Shows() {
  const location = useLocation();
  const params = useParams();
  const variables = { first: 200 };
  if (params.taxonomy && params.term) {
    variables.taxonomy = params.taxonomy;
    variables.term = params.term;
  }
  const { loading, data } = useQuery(showsQuery, {
    variables,
  });

  if (loading && !data) {
    return <Loading />;
  }

  if (location.pathname === '/shows/list') {
    return <ShowsList shows={data.shows} />;
  }

  return <ShowsGrid shows={data.shows} />;
}

export default Shows;
