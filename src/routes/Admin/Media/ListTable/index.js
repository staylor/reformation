import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import debounce from 'debounce';
import { parse, stringify } from 'query-string';
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
import Page from 'routes/Admin/Page';
import { HeaderAdd } from 'routes/Admin/styled';
import { titleColumnClass } from './styled';

/* eslint-disable react/no-multi-comp */

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

const uploadsQuery = gql`
  query UploadsAdminQuery(
    $first: Int
    $after: String
    $type: String
    $mimeType: String
    $search: String
  ) {
    uploads(first: $first, after: $after, type: $type, mimeType: $mimeType, search: $search)
      @cache(key: "admin") {
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
`;

const uploadsMutation = gql`
  mutation DeleteMediaMutation($ids: [ObjID]!) {
    removeMediaUpload(ids: $ids)
  }
`;

function MediaListTable() {
  const location = useLocation();
  const params = useParams();
  const history = useHistory();
  const queryParams = parse(location.search);

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
  const query = useQuery(uploadsQuery, {
    variables,
    // This ensures that the table is up to date when uploads are mutated.
    // The alternative is to specify refetchQueries on all Upload mutations.
    fetchPolicy: 'cache-and-network',
  });

  const [mutate] = useMutation(uploadsMutation);

  const updateProp = prop => value => {
    const p = {};
    if (value) {
      p[prop] = value;
    }
    history.push({
      pathname: '/media',
      search: stringify(p),
    });
  };

  const updateType = updateProp('type');

  const updateMimeType = updateProp('mimeType');

  const updateSearch = debounce(updateProp('search'), 600);

  return (
    <Page query={query} title="Media">
      {({ uploads }) => {
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
              onChange={updateType}
            />
            <Select
              key="mimeType"
              placeholder="Select MIME Type"
              value={queryParams.mimeType}
              choices={uploads.mimeTypes}
              onChange={updateMimeType}
            />
          </>
        );

        return (
          <>
            <HeaderAdd to="/media/upload">Add Media</HeaderAdd>
            <div className={searchBoxClass}>
              <Input
                value={queryParams.search}
                placeholder="Search Media"
                onChange={updateSearch}
              />
            </div>
            <ListTable
              filters={filters}
              columns={columns}
              variables={query.variables}
              mutate={mutate}
              refetch={query.refetch}
              data={uploads}
              path="/media"
            />
          </>
        );
      }}
    </Page>
  );
}

export default MediaListTable;
