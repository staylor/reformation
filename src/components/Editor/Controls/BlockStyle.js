import React from 'react';
import StyleButton from './StyleButton';
import { Controls } from './styled';

/* eslint-disable react/prop-types */

// type Props = {
//   editorState: EditorState,
//   onToggle: string => void,
//   openVideoModal: () => void,
//   openMediaModal: () => void,
// };

const BlockStyleControls = ({ editorState, onToggle, openVideoModal, openMediaModal }) => {
  const selection = editorState.getSelection();
  if (!selection) {
    return null;
  }

  const block = editorState.getCurrentContent().getBlockForKey(selection.getStartKey());
  if (!block) {
    return null;
  }

  const blockType = block.getType();

  const BLOCK_TYPES = [
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    {
      label: '',
      style: 'atomic-image',
      className: 'dashicons dashicons-format-image',
      onToggle: openMediaModal,
    },
    {
      label: '',
      style: 'atomic-video',
      className: 'dashicons dashicons-format-video',
      onToggle: openVideoModal,
    },
    {
      label: '',
      style: 'blockquote',
      className: 'dashicons dashicons-editor-quote',
    },
    {
      label: '',
      style: 'unordered-list-item',
      className: 'dashicons dashicons-editor-ul',
    },
    {
      label: '',
      style: 'ordered-list-item',
      className: 'dashicons dashicons-editor-ol',
    },
    {
      label: '',
      style: 'code-block',
      className: 'dashicons dashicons-editor-code',
    },
  ];

  return (
    <Controls>
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.style}
          className={type.className}
          active={type.style === blockType}
          label={type.label}
          onToggle={type.onToggle || onToggle}
          style={type.style}
        />
      ))}
    </Controls>
  );
};

export default BlockStyleControls;
