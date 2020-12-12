import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import debounce from 'debounce';
import { parse, stringify } from 'query-string';
import Loading from 'components/Loading';
import Input from 'components/Form/Input';
import Select from 'components/Form/Select';
import ListTable, { renderThumbnail } from 'components/ListTable';
import {
  thumbnailColumnClass,
  rowActionsClass,
  rowTitleClass,
  searchBoxClass,
} from 'components/ListTable/styled';
import { offsetToCursor } from 'utils/connection';
import { Heading, HeaderAdd } from 'routes/Admin/styled';
import { titleColumnClass } from './styled';

/* eslint-disable react/prop-types,react/no-multi-comp */

const PER_PAGE = 20;

const columns = [
  {
    className: thumbnailColumnClass,
    render: media => {
      if (media.type === 'audio') {
        return renderThumbnail(media, 'images');
      }

      if (media.type === 'image') {
        return renderThumbnail(media, 'crops');
      }

      return null;
    },
  },
  {
    className: titleColumnClass,
    label: 'Title',
    render: (media, { mutate, refetch }) => {
      const onClick = e => {
        e.preventDefault();

        mutate({
          variables: {
            ids: [media.id],
          },
        }).then(() => {
          refetch();
        });
      };

      return (
        <>
          <strong className={rowTitleClass}>
            <Link to={`/media/${media.id}`}>{media.title || '(no title)'}</Link>
            <br />
            <span>{media.originalName}</span>
          </strong>
          <nav className={rowActionsClass}>
            <Link to={`/media/${media.id}`}>Edit</Link> |{' '}
            <a className="delete" onClick={onClick} href={`/media/${media.id}`}>
              Delete
            </a>
          </nav>
        </>
      );
    },
  },
  {
    label: 'Type',
    render: media => (
      <Link to={{ pathname: '/media', search: stringify({ type: media.type }) }}>{media.type}</Link>
    ),
  },
  {
    label: 'MIME type',
    render: media => (
      <Link
        to={{
          pathname: '/media',
          search: stringify({ mimeType: media.mimeType }),
        }}
      >
        {media.mimeType}
      </Link>
    ),
  },
];

@compose(
  graphql(
    gql`
      query UploadsQuery(
        $first: Int
        $after: String
        $type: String
        $mimeType: String
        $search: String
      ) {
        uploads(first: $first, after: $after, type: $type, mimeType: $mimeType, search: $search)
          @connection(key: "uploads", filter: ["type", "mimeType", "search"]) {
          types
          mimeTypes
          count
          edges {
            node {
              id
              type
              mimeType
              title
              originalName
              destination
              ... on ImageUpload {
                crops {
                  fileName
                  width
                }
              }
              ... on AudioUpload {
                images {
                  fileName
                  width
                }
              }
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
        if (queryParams.type) {
          variables.type = queryParams.type;
        }
        if (queryParams.mimeType) {
          variables.mimeType = queryParams.mimeType;
        }
        if (params.page) {
          const pageOffset = parseInt(params.page, 10) - 1;
          if (pageOffset > 0) {
            variables.after = offsetToCursor(pageOffset * PER_PAGE - 1);
          }
        }
        // This ensures that the table is up to date when uploads are mutated.
        // The alternative is to specify refetchQueries on all Post mutations.
        return { variables, fetchPolicy: 'cache-and-network' };
      },
    }
  ),
  graphql(gql`
    mutation DeleteMediaMutation($ids: [ObjID]!) {
      removeMediaUpload(ids: $ids)
    }
  `)
)
class Media extends Component {
  updateProp = prop => value => {
    const params = {};
    if (value) {
      params[prop] = value;
    }
    this.props.history.push({
      pathname: '/media',
      search: stringify(params),
    });
  };

  updateType = this.updateProp('type');

  updateMimeType = this.updateProp('mimeType');

  updateSearch = debounce(this.updateProp('search'), 600);

  render() {
    const {
      location,
      match,
      mutate,
      data: { variables, refetch, loading, uploads },
    } = this.props;

    if (loading && !uploads) {
      return <Loading />;
    }

    const queryParams = parse(location.search);

    const filters = (
      <>
        <Select
          key="type"
          placeholder="Select Media Type"
          value={queryParams.type}
          choices={uploads.types.map(type => ({
            value: type,
            label: type.charAt(0).toUpperCase() + type.substring(1),
          }))}
          onChange={this.updateType}
        />
        <Select
          key="mimeType"
          placeholder="Select MIME Type"
          value={queryParams.mimeType}
          choices={uploads.mimeTypes}
          onChange={this.updateMimeType}
        />
      </>
    );

    return (
      <>
        <Heading>Media</Heading>
        <HeaderAdd to="/media/upload">Add Media</HeaderAdd>
        <div className={searchBoxClass}>
          <Input
            value={queryParams.search}
            placeholder="Search Media"
            onChange={this.updateSearch}
          />
        </div>
        <ListTable
          location={location}
          match={match}
          filters={filters}
          columns={columns}
          variables={variables}
          mutate={mutate}
          refetch={refetch}
          data={uploads}
          path="/media"
        />
      </>
    );
  }
}

export default Media;
