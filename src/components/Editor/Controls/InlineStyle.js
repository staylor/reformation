import React, { Component } from 'react';
import { RichUtils, EditorState } from 'draft-js';
import { cx } from 'pretty-lights';
import StyleButton from './StyleButton';
import { linkInputClass, linkActionClass, Controls } from './styled';

/* eslint-disable react/prop-types */

const INLINE_STYLES = [
  { label: '', style: 'BOLD', className: 'dashicons dashicons-editor-bold' },
  {
    label: '',
    style: 'ITALIC',
    className: 'dashicons dashicons-editor-italic',
  },
  {
    label: '',
    style: 'UNDERLINE',
    className: 'dashicons dashicons-editor-underline',
  },
  {
    label: '',
    style: 'STRIKETHROUGH',
    className: 'dashicons dashicons-editor-strikethrough',
  },
  {
    label: (
      <>
        X<sup>2</sup>
      </>
    ),
    style: 'SUPERSCRIPT',
    className: '',
  },
  {
    label: (
      <>
        X<sub>2</sub>
      </>
    ),
    style: 'SUBSCRIPT',
    className: '',
  },
  { label: '', style: 'CODE', className: 'dashicons dashicons-editor-code' },
  { label: '', style: 'LINK', className: 'dashicons dashicons-admin-links' },
];

// type Props = {
//   editorState: EditorState,
//   onChange: EditorState => void,
//   onToggle: string => void,
// };
//
// type State = {
//   mode: string,
//   urlValue: string,
// };

class InlineStyleControls extends Component {
  linkInput = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      mode: '',
      urlValue: '',
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const selection = nextProps.editorState.getSelection();
    if (selection.isCollapsed()) {
      return { mode: '', urlValue: '' };
    }
    return null;
  }

  // event propagation is already handled
  showLink = () => {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }
    const contentState = editorState.getCurrentContent();
    const blockWithLink = contentState.getBlockForKey(selection.getStartKey());
    const linkKey = blockWithLink.getEntityAt(selection.getStartOffset());

    let urlValue = '';
    let mode = 'ADD_LINK';
    if (linkKey) {
      const linkInstance = contentState.getEntity(linkKey);
      urlValue = linkInstance.getData().href;
      mode = 'EDIT_LINK';
    }

    this.setState({ mode, urlValue }, () => {
      setTimeout(() => this.linkInput.current.focus(), 0);
    });
  };

  addLink = e => {
    e.preventDefault();
    const { editorState } = this.props;
    const { urlValue } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
      type: 'LINK',
      href: urlValue,
      target: null,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const selection = editorState.getSelection();
    const newEditorState = RichUtils.toggleLink(editorState, selection, entityKey);
    const selectionState = EditorState.forceSelection(newEditorState, selection);

    this.setState({ mode: '', urlValue: '' }, () => {
      this.props.onChange(selectionState);
    });
  };

  removeLink = (e: Event) => {
    e.preventDefault();
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }

    this.setState({ mode: '', urlValue: '' }, () => {
      const newEditorState = RichUtils.toggleLink(editorState, selection, null);
      const selectionState = EditorState.forceSelection(newEditorState, selection);
      this.props.onChange(selectionState);
    });
  };

  cancelLink = (e: Event) => {
    e.preventDefault();

    this.setState({ mode: '', urlValue: '' });
  };

  onLinkInputChange = (e: { target: HTMLInputElement }) => {
    this.setState({ urlValue: e.target.value });
  };

  onLinkInputKeyDown = (e: Event) => {
    if (e.which === 13) {
      this.addLink(e);
    }
  };

  onLinkInputMouseDown = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const { editorState, onToggle } = this.props;
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const block = contentState.getBlockForKey(selection.getStartKey());
    if (!block) {
      return null;
    }
    const currentStyle = editorState.getCurrentInlineStyle();

    let linkKey = '';
    if (!selection.isCollapsed()) {
      linkKey = block.getEntityAt(selection.getStartOffset());
    }

    return (
      <Controls>
        {!selection.isCollapsed() && ['ADD_LINK', 'EDIT_LINK'].includes(this.state.mode) ? (
          <>
            <input
              className={linkInputClass}
              innerRef={this.linkInput}
              placeholder="Type a URL and press Enter"
              value={this.state.urlValue}
              onChange={this.onLinkInputChange}
              onKeyDown={this.onLinkInputKeyDown}
              onMouseDown={this.onLinkInputMouseDown}
              onClick={this.onLinkInputMouseDown}
              type="text"
            />
            {this.state.mode === 'EDIT_LINK' && (
              <span // eslint-disable-line
                className={cx(linkActionClass, 'dashicons dashicons-editor-unlink')}
                onClick={this.removeLink}
              />
            )}
            {this.state.mode === 'ADD_LINK' && (
              <span // eslint-disable-line
                className={cx(linkActionClass, 'dashicons dashicons-no-alt')}
                onClick={this.cancelLink}
              />
            )}
          </>
        ) : (
          INLINE_STYLES.map(type => (
            <StyleButton
              key={type.style}
              className={type.className}
              active={currentStyle.has(type.style) || (type.style === 'LINK' && linkKey !== '')}
              label={type.label}
              onToggle={type.style === 'LINK' ? this.showLink : onToggle}
              style={type.style}
            />
          ))
        )}
      </Controls>
    );
  }
}

export default InlineStyleControls;
