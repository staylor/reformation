import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useParams } from 'react-router-dom';
import { cx } from 'pretty-lights';
import Select from 'components/Form/Select';
import Checkbox from 'components/Form/Checkbox';
import { uploadUrl } from 'utils/media';
import { formatDate } from './utils';
import {
  filtersClass,
  paginationClass,
  tableClass,
  cellClass,
  stripedRowClass,
  cellHeadingClass,
  checkboxCellClass,
  noItemsClass,
  thumbnailClass,
} from './styled';

export const renderThumbnail = (media, field) => {
  if (!media[field] || !media[field].length) {
    return null;
  }
  const sorted = [...media[field]];
  sorted.sort((a, b) => a.width - b.width);
  return (
    <img className={thumbnailClass} src={uploadUrl(media.destination, sorted[0].fileName)} alt="" />
  );
};

const reducer = (state, action) => ({ ...state, ...action });

function ListTable(props) {
  const location = useLocation();
  const params = useParams();
  const [state, setState] = useReducer(reducer, {
    checked: [],
    all: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const { data, path, columns, filters, variables } = props;
  if (!data || !data.edges || !data.edges.length) {
    return <p className={noItemsClass}>No items found.</p>;
  }

  const bulkAction = value => {
    if (value === 'deleteAll' && state.checked.length) {
      const options = {
        variables: {
          ids: state.checked,
        },
      };

      props.mutate(options).then(() => {
        if (props.refetch) {
          props.refetch();
        }
      });
    }
  };

  const toggleAll = checked => {
    let ids;
    if (checked) {
      ids = props.data.edges.map(({ node }) => node.id);
    } else {
      ids = [];
    }
    setState({ checked: ids, all: checked });
  };

  const toggleCheck = (checked, id = null) => {
    if (!id) {
      return;
    }

    setState(({ checked: stateChecked, all: stateAll }) => {
      const ids = [...stateChecked];
      let all = stateAll;
      if (checked) {
        ids.push(id);
      } else {
        all = false;
        ids.splice(ids.indexOf(id), 1);
      }
      return { checked: ids, all };
    });
  };

  // eslint-disable-next-line react/prop-types
  const LinkTo = ({ to = '', children }) => (
    <Link to={{ pathname: `${path}${to}`, search: location.search }}>{children}</Link>
  );

  const headers = (
    <tr>
      <th className={cx(cellHeadingClass, checkboxCellClass)}>
        <Checkbox checked={state.all} onChange={toggleAll} />
      </th>
      {columns.map((column, i) => (
        <th className={cx(cellHeadingClass, column.className)} key={i.toString(16)}>
          {column.label}
        </th>
      ))}
    </tr>
  );

  const pages = data.count > 0 ? Math.ceil(data.count / variables.first) : 0;
  const firstPage = pages === 0 ? 0 : 1;
  const currentPage = params.page ? parseInt(params.page, 10) : firstPage;
  const paginated = currentPage && currentPage > 1;
  let previousUrl = null;
  let nextUrl = null;
  if (paginated) {
    if (currentPage - 1 > 1) {
      previousUrl = `/page/${currentPage - 1}`;
    } else {
      previousUrl = '';
    }
  }
  if (currentPage !== pages && data.pageInfo.hasNextPage) {
    nextUrl = `/page/${currentPage + 1}`;
  }

  const paginationMatrix = (
    <nav className={paginationClass}>
      <strong>{data.count} items</strong>
      {paginated ? <LinkTo>«</LinkTo> : <span>«</span>}
      {previousUrl === null ? <span>‹</span> : <LinkTo to={previousUrl}>‹</LinkTo>}
      <strong>
        {paginated ? currentPage : firstPage} of {pages}
      </strong>
      {nextUrl === null ? <span>›</span> : <LinkTo to={nextUrl}>›</LinkTo>}
      {currentPage !== pages ? <LinkTo to={`/page/${pages}`}>»</LinkTo> : <span>»</span>}
    </nav>
  );

  return (
    <>
      <section className={filtersClass}>
        {props.mutate && (
          <Select
            key="bulk"
            placeholder="Bulk Actions"
            choices={[{ label: 'Delete', value: 'deleteAll' }]}
            onChange={bulkAction}
          />
        )}
        {filters}
        {paginationMatrix}
      </section>
      <table className={tableClass}>
        <thead>{headers}</thead>
        <tbody>
          {data.edges.map(({ node }) => (
            <tr className={stripedRowClass} key={node.id}>
              <th className={cx(cellHeadingClass, checkboxCellClass)}>
                <Checkbox
                  checked={state.checked.includes(node.id)}
                  id={node.id}
                  onChange={toggleCheck}
                />
              </th>
              {columns.map((column, i) => {
                let content = null;
                if (column.type && column.type === 'date') {
                  content = node[column.prop] ? formatDate(node[column.prop]) : null;
                } else {
                  content = column.render ? column.render(node, props) : node[column.prop];
                }
                return (
                  <td key={i.toString(16)} className={cx(cellClass, column.className)}>
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>{headers}</tfoot>
      </table>
      <section className={filtersClass}>{paginationMatrix}</section>
    </>
  );
}

ListTable.propTypes = {
  // provided by Apollo
  variables: PropTypes.shape(),
  mutate: PropTypes.func,
  refetch: PropTypes.func,
  data: PropTypes.shape({
    count: PropTypes.number,
    pageInfo: PropTypes.shape(),
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape(),
      })
    ),
  }),
  // component props
  path: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      prop: PropTypes.string,
      render: PropTypes.func,
      className: PropTypes.string,
    })
  ).isRequired,
  filters: PropTypes.node,
};

ListTable.defaultProps = {
  variables: {},
  refetch: () => null,
  mutate: () => null,
  filters: null,
  data: {},
};

export default ListTable;
