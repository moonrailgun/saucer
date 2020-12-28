import React, { useCallback, useState } from 'react';
import EditorList, { EditorListChangeState } from 'rc-editor-list';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import { parseStyleStringToReactStyle } from './utils';
import { useTeaAttrsContext } from '@saucerjs/editor';
import { useCurrentTeaId } from '@saucerjs/core';

/**
 * 样式编辑器
 */
export const CSSEditor: React.FC = React.memo(() => {
  const [dom, setDom] = useState<HTMLDivElement | null>(null);
  const { currentTeaAttrs, setCurrentTeaAttrs } = useTeaAttrsContext();
  const currentTeaId = useCurrentTeaId();
  const styleAttr = currentTeaAttrs['style'] ?? {};

  const handleChange = useCallback(
    (state: EditorListChangeState) => {
      const cssString = _get(state, ['cssValue', '', 'css', 'default']);
      const styleObj = parseStyleStringToReactStyle(cssString);

      setCurrentTeaAttrs({
        style: styleObj,
      });
    },
    [setCurrentTeaAttrs]
  );

  const handleRef = (ref: HTMLDivElement) => {
    if (_isNil(ref)) {
      return;
    }
    for (const attr in styleAttr) {
      const val = styleAttr[attr];
      ref.style.setProperty(attr, val);
    }
    setDom(ref);
  };

  return (
    <div key={currentTeaId}>
      <div ref={handleRef}></div>

      {dom && (
        <EditorList
          editorElem={dom}
          onChange={handleChange}
          useClassName={false}
          cssToDom={false}
        />
      )}
    </div>
  );
});
CSSEditor.displayName = 'CSSEditor';
