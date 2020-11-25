import React, { useState } from 'react';
import EditorList from 'rc-editor-list';

export const CSSEditor: React.FC = React.memo(() => {
  const [dom, setDom] = useState<HTMLDivElement | null>(null);

  return (
    <div>
      <div ref={setDom}></div>

      {/* TODO */}
      {dom && <EditorList editorElem={dom} />}
    </div>
  );
});
CSSEditor.displayName = 'CSSEditor';
