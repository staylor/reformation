import React from 'react';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import debounce from 'debounce';
import Input from 'components/Form/Input';
import Select from 'components/Form/Select';
import ListTable from 'components/ListTable';
import { rowActionsClass, rowTitleClass, searchBoxClass } from 'components/ListTable/styled';
import Page from 'routes/Admin/Page';
import { useQueryParams, usePageOffset, useAdminQuery, usePropUpdate } from 'routes/Admin/utils';

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
  const params = useQueryParams(['search', 'year']);
  params.first = PER_PAGE;
  const variables = usePageOffset(params);
  const query = useAdminQuery(videosQuery, variables);

  const updateYear = usePropUpdate({ prop: 'year', pathname: '/video' });
  const updateSeachHook = usePropUpdate({ prop: 'search', pathname: '/video' });
  const updateSearch = debounce(updateSeachHook, 600);

  return (
    <Page query={query} title="Videos">
      {({ videos }) => {
        const filters = (
          <Select
            key="year"
            placeholder="Select Year"
            value={params.year}
            choices={videos.years}
            onChange={updateYear}
          />
        );

        return (
          <>
            <div className={searchBoxClass}>
              <Input value={params.search} placeholder="Search Videos" onChange={updateSearch} />
            </div>
            <ListTable filters={filters} columns={columns} data={videos} path="/video" />
          </>
        );
      }}
    </Page>
  );
}

export default VideosListTable;
