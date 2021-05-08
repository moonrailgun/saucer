import { useASTDispatchAction, useCurrentTeaId } from '@saucerjs/core';
import React, { useCallback } from 'react';

interface RenderWrapperToolItemProps {
  name: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}
const RenderWrapperToolItem: React.FC<RenderWrapperToolItemProps> = React.memo(
  (props) => {
    return (
      <div
        className="saucer-render-wrapper__tools-item"
        onClick={props.onClick}
      >
        {props.name}
        {props.icon}
      </div>
    );
  }
);
RenderWrapperToolItem.displayName = 'RenderWrapperToolItem';

const deleteIcon = (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1637"
    width="14"
    height="14"
  >
    <path
      d="M668.8 896h-320c-48.64 0-88.32-37.76-92.8-87.68L211.2 403.2c-1.92-17.28 10.88-33.28 28.16-35.2 17.28-1.92 33.28 10.88 35.2 28.16l44.16 405.76c1.28 17.28 14.08 30.08 28.8 30.08h320c14.72 0 27.52-12.8 28.8-29.44l44.16-406.4c1.92-17.28 17.92-30.08 35.2-28.16 17.28 1.92 30.08 17.92 28.16 35.2l-44.16 405.76c-2.56 49.28-42.88 87.04-90.88 87.04zM826.24 321.28H190.72c-17.92 0-32-14.08-32-32s14.08-32 32-32h636.16c17.92 0 32 14.08 32 32s-14.72 32-32.64 32z"
      p-id="1638"
    ></path>
    <path
      d="M424.96 789.12c-16.64 0-30.72-12.8-32-29.44l-27.52-347.52c-1.28-17.92 11.52-33.28 29.44-34.56 17.92-1.28 33.28 11.52 34.56 29.44l27.52 347.52c1.28 17.92-11.52 33.28-29.44 34.56h-2.56zM580.48 789.12h-2.56c-17.92-1.28-30.72-16.64-29.44-34.56L576 407.04c1.28-17.92 16.64-30.72 34.56-29.44 17.92 1.28 30.72 16.64 29.44 34.56l-27.52 347.52c-1.92 16.64-15.36 29.44-32 29.44zM581.76 244.48c-17.92 0-32-14.08-32-32 0-23.68-19.2-43.52-43.52-43.52s-43.52 19.2-43.52 43.52c0 17.92-14.08 32-32 32s-32-14.08-32-32c0-59.52 48-107.52 107.52-107.52s107.52 48 107.52 107.52c0 17.28-14.08 32-32 32z"
      p-id="1639"
    ></path>
  </svg>
);

export const RenderWrapperTools: React.FC = React.memo(() => {
  const currentTeaId = useCurrentTeaId();
  const { dispatchRemoveNodeById } = useASTDispatchAction();
  const handleDelete = useCallback(() => {
    if (typeof currentTeaId === 'string' && currentTeaId !== 'root') {
      // 删除节点
      dispatchRemoveNodeById(currentTeaId);
    }
  }, [currentTeaId, dispatchRemoveNodeById]);

  return (
    <div className="saucer-render-wrapper__tools">
      <RenderWrapperToolItem
        name="Delete"
        icon={deleteIcon}
        onClick={handleDelete}
      />
    </div>
  );
});
RenderWrapperTools.displayName = 'RenderWrapperTools';
