import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import debounce from 'debounce';
import { parse, stringify } from 'utils/query-string';
import Loading from 'components/Loading';
import Input from 'components/Form/Input';
import Select from 'components/Form/Select';
import ListTable from 'components/ListTable';
import { RowActions, RowTitle, SearchBox } from 'components/ListTable/styled';
import { offsetToCursor } from 'utils/connection';
import { Heading } from '../styled';

/* eslint-disable react/prop-types */

const PER_PAGE = 20;

const columns = [
  {
    label: 'Title',
    render: video => (
      <>
        <RowTitle>
          <Link to={`/video/${video.id}`}>{video.title}</Link>
        </RowTitle>
        <RowActions>
          <Link to={`/video/${video.id}`}>Edit</Link> | <a href={`/video/${video.slug}`}>View</a>
        </RowActions>
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

@graphql(
  gql`
    query VideosQuery($first: Int, $after: String, $year: Int, $search: String) {
      videos(first: $first, after: $after, year: $year, search: $search)
        @connection(key: "videos", filter: ["year", "search", "first", "after"]) {
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
  `,
  {
    options: ({ match, location }) => {
      const queryParams = parse(location.search);
      const { params } = match;

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
      return { variables };
    },
  }
)
class Videos extends Component {
  updateProp = prop => value => {
    const params = {};
    if (value) {
      params[prop] = value;
    }
    this.props.history.push({
      pathname: '/video',
      search: stringify(params),
    });
  };

  updateYear = this.updateProp('year');

  updateSearch = debounce(this.updateProp('search'), 600);

  render() {
    const {
      location,
      match,
      data: { loading, videos, variables },
    } = this.props;

    if (loading && !videos) {
      return <Loading />;
    }

    const queryParams = parse(location.search);

    const filters = (
      <Select
        key="year"
        placeholder="Select Year"
        value={queryParams.year}
        choices={videos.years}
        onChange={this.updateYear}
      />
    );

    return (
      <>
        <Heading>Videos</Heading>
        <SearchBox>
          <Input
            value={queryParams.search}
            placeholder="Search Videos"
            onChange={this.updateSearch}
          />
        </SearchBox>
        <ListTable
          {...{ location, match, columns, filters, variables }}
          data={videos}
          path="/video"
        />
      </>
    );
  }
}

export default Videos;
