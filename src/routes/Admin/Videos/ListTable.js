import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import debounce from 'debounce';
import { parse, stringify } from 'query-string';
import Input from 'components/Form/Input';
import Select from 'components/Form/Select';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass, searchBoxClass } from 'components/ListTable/styled';
import { offsetToCursor } from 'utils/connection';
import Page from 'routes/Admin/Page';

/* eslint-disable react/no-multi-comp */

const PER_PAGE = 20;

const columns = [
  {
    label: 'Title',
    render: video => (
      <>
        <strong className={rowTitleClass}>
          <Link to={`/video/${video.id}`}>{video.title}</Link>
        </strong>
        <nav className={rowActionsClass}>
          <Link to={`/video/${video.id}`}>Edit</Link> | <a href={`/video/${video.slug}`}>View</a>
        </nav>
      </>
    ),
  },
  {
    label: 'Slug',
    prop: 'slug',
  },
  {
    label: 'Year',
    prop: 'year',
  },
  {
    label: 'Date',
    render: video => {
      const date = new Date(video.publishedAt);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      return (
        <>
          Published
          <br />
          {formattedDate}
        </>
      );
    },
  },
];

const videosQuery = gql`
  query VideosAdminQuery($first: Int, $after: String, $year: Int, $search: String) {
    videos(first: $first, after: $after, year: $year, search: $search) @cache(key: "admin") {
      count
      years
      edges {
        node {
          id
          title
          slug
          publishedAt
          year
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

function VideosListTable() {
  const location = useLocation();
  const params = useParams();
  const history = useHistory();
  const queryParams = parse(location.search);
  const variables = { first: PER_PAGE };
  if (queryParams.search) {
    // $TODO: sanitize this
    variables.search = queryParams.search;
  }
  if (queryParams.year) {
    variables.year = parseInt(queryParams.year, 10);
  }
  if (params.page) {
    const pageOffset = parseInt(params.page, 10) - 1;
    if (pageOffset > 0) {
      variables.after = offsetToCursor(pageOffset * PER_PAGE - 1);
    }
  }
  const query = useQuery(videosQuery, {
    variables,
    // This ensures that the table is up to date when uploads are mutated.
    // The alternative is to specify refetchQueries on all Video mutations.
    fetchPolicy: 'cache-and-network',
  });

  const updateProp = prop => value => {
    const p = {};
    if (value) {
      p[prop] = value;
    }
    history.push({
      pathname: '/video',
      search: stringify(p),
    });
  };

  const updateYear = updateProp('year');

  const updateSearch = debounce(updateProp('search'), 600);

  return (
    <Page query={query} title="Videos">
      {({ videos }) => {
        const filters = (
          <Select
            key="year"
            placeholder="Select Year"
            value={queryParams.year}
            choices={videos.years}
            onChange={updateYear}
          />
        );

        return (
          <>
            <div className={searchBoxClass}>
              <Input
                value={queryParams.search}
                placeholder="Search Videos"
                onChange={updateSearch}
              />
            </div>
            <ListTable
              filters={filters}
              columns={columns}
              variables={query.variables}
              data={videos}
              path="/video"
            />
          </>
        );
      }}
    </Page>
  );
}

export default VideosListTable;
