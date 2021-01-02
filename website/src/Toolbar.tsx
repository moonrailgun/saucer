import { useAST } from '@saucerjs/core';
import React, { useCallback, useState } from 'react';
import { Button, Space } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Previewer } from '@saucerjs/editor';

export const Toolbar: React.FC = React.memo(() => {
  const [showPreview, setShowPreview] = useState(false);
  const ast = useAST();

  const handleOutputState = useCallback(() => {
    console.log(JSON.stringify(ast, null, 2));
  }, [ast]);

  const handleShowPreview = useCallback(() => {
    setShowPreview(true);
  }, []);

  const handleHidePreview = useCallback(() => {
    setShowPreview(false);
  }, []);

  return (
    <div style={{ padding: '6px 12px' }}>
      <Space>
        <Button type="primary" onClick={handleOutputState}>
          Output State in Console
        </Button>

        <Button type="primary" onClick={handleShowPreview}>
          Show Previewer
        </Button>
      </Space>

      <Modal footer={null} visible={showPreview} onCancel={handleHidePreview}>
        <Previewer />
      </Modal>
    </div>
  );
});
Toolbar.displayName = 'Toolbar';
