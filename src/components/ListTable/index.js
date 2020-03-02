import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { cx } from 'pretty-lights';
import Select from 'components/Form/Select';
import Checkbox from 'components/Form/Checkbox';
import { uploadUrl } from 'utils/media';
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

/* eslint-disable class-methods-use-this */

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

@withRouter
class ListTable extends Component {
  static propTypes = {
    // provided by withRouter
    location: PropTypes.shape().isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape(),
    }).isRequired,
    // provided by Apollo
    variables: PropTypes.shape(),
    mutate: PropTypes.func,
    refetch: PropTypes.func,
    data: PropTypes.shape({
      count: PropTypes.number,
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

  static defaultProps = {
    variables: {},
    refetch: () => null,
    mutate: () => null,
    filters: null,
    data: {},
  };

  state = {
    checked: [],
    all: false,
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  bulkAction = value => {
    if (value === 'deleteAll' && this.state.checked.length) {
      const options = {
        variables: {
          ids: this.state.checked,
        },
      };

      this.props.mutate(options).then(() => {
        if (this.props.refetch) {
          this.props.refetch();
        }
      });
    }
  };

  toggleAll = checked => {
    let ids;
    if (checked) {
      ids = this.props.data.edges.map(({ node }) => node.id);
    } else {
      ids = [];
    }
    this.setState({ checked: ids, all: checked });
  };

  toggleCheck = (checked, id = null) => {
    if (!id) {
      return;
    }

    this.setState(({ checked: stateChecked, all: stateAll }) => {
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

  formatDate(date) {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const min = d.getMinutes();
    const hour = d.getHours();
    return `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${d.getFullYear()}
    ${' '}at${' '}
    ${hour % 12}:${min < 10 ? `0${min}` : min}${hour < 12 ? 'am' : 'pm'}`;
  }

  render() {
    const {
      location,
      match: { params },
      data,
      path,
      columns,
      filters,
      variables,
    } = this.props;

    if (!data || !data.edges || !data.edges.length) {
      return <p className={noItemsClass}>No items found.</p>;
    }

    const LinkTo = ({ to = '', children }) => (
      <Link to={{ pathname: `${path}${to}`, search: location.search }}>{children}</Link>
    );

    const headers = (
      <tr>
        <th className={cx(cellHeadingClass, checkboxCellClass)}>
          <Checkbox checked={this.state.all} onChange={this.toggleAll} />
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
          {this.props.mutate && (
            <Select
              key="bulk"
              placeholder="Bulk Actions"
              choices={[{ label: 'Delete', value: 'deleteAll' }]}
              onChange={this.bulkAction}
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
                    checked={this.state.checked.includes(node.id)}
                    id={node.id}
                    onChange={this.toggleCheck}
                  />
                </th>
                {columns.map((column, i) => {
                  let content = null;
                  if (column.type && column.type === 'date') {
                    content = node[column.prop] ? this.formatDate(node[column.prop]) : null;
                  } else {
                    content = column.render ? column.render(node, this.props) : node[column.prop];
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
}

export default ListTable;
