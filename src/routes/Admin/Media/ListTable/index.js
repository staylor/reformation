import React from 'react';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import debounce from 'debounce';
import { stringify } from 'query-string';
import Input from 'components/Form/Input';
import Select from 'components/Form/Select';
import ListTable, { renderThumbnail } from 'components/ListTable';
import {
  thumbnailColumnClass,
  rowActionsClass,
  rowTitleClass,
  searchBoxClass,
} from 'components/ListTable/styled';
import Page from 'routes/Admin/Page';
import {
  useQueryParams,
  usePageOffset,
  useAdminQuery,
  usePropUpdate,
  useSubmitDelete,
} from 'routes/Admin/utils';
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
    render: (media, { onDelete }) => {
      return (
        <>
          <strong className={rowTitleClass}>
            <Link to={`/media/${media.id}`}>{media.title || '(no title)'}</Link>
            <br />
            <span>{media.originalName}</span>
          </strong>
          <nav className={rowActionsClass}>
            <Link to={`/media/${media.id}`}>Edit</Link> |{' '}
            <a className="delete" onClick={onDelete([media.id])} href={`/media/${media.id}`}>
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
  const params = useQueryParams(['search', 'type', 'mimeType']);
  params.first = PER_PAGE;
  const variables = usePageOffset(params);
  const query = useAdminQuery(uploadsQuery, variables);
  const onDelete = useSubmitDelete({ mutation: uploadsMutation, query });
  const updateType = usePropUpdate({ prop: 'type', pathname: '/media' });
  const updateMimeType = usePropUpdate({ prop: 'mimeType', pathname: '/media' });
  const updateSearchHook = usePropUpdate({ prop: 'search', pathname: '/media' });
  const updateSearch = debounce(updateSearchHook, 600);

  return (
    <Page query={query} title="Media" add={{ to: '/media/upload', label: 'Add Media' }}>
      {({ uploads }) => {
        const filters = (
          <>
            <Select
              key="type"
              placeholder="Select Media Type"
              value={params.type}
              choices={uploads.types.map(type => ({
                value: type,
                label: type.charAt(0).toUpperCase() + type.substring(1),
              }))}
              onChange={updateType}
            />
            <Select
              key="mimeType"
              placeholder="Select MIME Type"
              value={params.mimeType}
              choices={uploads.mimeTypes}
              onChange={updateMimeType}
            />
          </>
        );

        return (
          <>
            <div className={searchBoxClass}>
              <Input value={params.search} placeholder="Search Media" onChange={updateSearch} />
            </div>
            <ListTable
              filters={filters}
              columns={columns}
              onDelete={onDelete}
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
