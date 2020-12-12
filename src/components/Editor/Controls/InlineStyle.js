import React, { useReducer, useRef } from 'react';
import { RichUtils, EditorState } from 'draft-js';
import StyleButton from './StyleButton';
import { linkInputClass, linkActionClass, Controls } from './styled';

/* eslint-disable react/prop-types,jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */

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

const reducer = (a, b) => ({ ...a, ...b });

export default function InlineStyleControls({ editorState, onChange, onToggle }) {
  const linkInput = useRef(null);
  const [state, setState] = useReducer(reducer, {
    mode: '',
    urlValue: '',
  });

  // event propagation is already handled
  const showLink = () => {
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

    setState({ mode, urlValue });
    setTimeout(() => linkInput.current.focus(), 0);
  };

  const addLink = e => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
      type: 'LINK',
      href: state.urlValue,
      target: null,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const selection = editorState.getSelection();
    const newEditorState = RichUtils.toggleLink(editorState, selection, entityKey);
    const selectionState = EditorState.forceSelection(newEditorState, selection);

    setState({ mode: '', urlValue: '' });
    onChange(selectionState);
  };

  const removeLink = e => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }

    setState({ mode: '', urlValue: '' });
    const newEditorState = RichUtils.toggleLink(editorState, selection, null);
    const selectionState = EditorState.forceSelection(newEditorState, selection);
    onChange(selectionState);
  };

  const cancelLink = e => {
    e.preventDefault();

    setState({ mode: '', urlValue: '' });
  };

  const onLinkInputChange = e => {
    setState({ urlValue: e.target.value });
  };

  const onLinkInputKeyDown = e => {
    if (e.which === 13) {
      addLink(e);
    }
  };

  const onLinkInputMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();
  };

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
      {!selection.isCollapsed() && ['ADD_LINK', 'EDIT_LINK'].includes(state.mode) ? (
        <>
          <input
            className={linkInputClass}
            innerRef={linkInput}
            placeholder="Type a URL and press Enter"
            value={state.urlValue}
            onChange={onLinkInputChange}
            onKeyDown={onLinkInputKeyDown}
            onMouseDown={onLinkInputMouseDown}
            onClick={onLinkInputMouseDown}
            type="text"
          />
          {state.mode === 'EDIT_LINK' && (
            <span
              className={`dashicons dashicons-editor-unlink ${linkActionClass}`}
              onClick={removeLink}
            />
          )}
          {state.mode === 'ADD_LINK' && (
            <span
              className={`dashicons dashicons-no-alt ${linkActionClass}`}
              onClick={cancelLink}
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
            onToggle={type.style === 'LINK' ? showLink : onToggle}
            style={type.style}
          />
        ))
      )}
    </Controls>
  );
}
