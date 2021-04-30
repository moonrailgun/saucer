import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Icon as AntIcon } from '@ant-design/compatible';
import Popover from 'antd/lib/popover';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { polyfill } from 'react-lifecycles-compat';

import { getBgImageUrl, getBgImageType, defaultBgImageValue } from '../../utils';

import BackGroundPop from './BackGroundPop';

class BackGroundImage extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    locale: PropTypes.object,
    value: PropTypes.any,
    onChange: PropTypes.func,
    editorElem: PropTypes.any,
  };

  static defaultProps = {
    className: 'editor-bg-image',
  }

  static getDerivedStateFromProps(props, { prevProps, $self }){
    const nextState = {
      prevProps: props,
    };
    if (prevProps) {
      if (props.editorElem !== prevProps.editorElem) {
        $self.keys = [];
      }
    }
    return nextState;
  }

  constructor(props){
    super(props);
    this.state = {
      $self: this, // eslint-disable-line
    };
  }

  componentWillUnmount() {
    this.keys = [];
  }

  onDragEnd = result => {
    const { source, destination } = result;
    if (destination && source.index !== destination.index) {
      const { value } = this.props;
      Object.keys(value).forEach((key) => {
        const item = value[key];
        const [removed] = item.splice(source.index, 1);
        item.splice(destination.index, 0, removed);
        value[key] = item;
      });
      this.props.onChange(value);
    }
  };

  onDeleteChild = (i) => {
    const { value } = this.props;
    Object.keys(value).forEach(key => {
      const item = value[key];
      item.splice(i, 1);
      value[key] = item;
    });
    this.props.onChange(value);
  }
  onAdd = () => {
    const { value } = this.props;
    Object.keys(value).forEach(key => {
      value[key].unshift(defaultBgImageValue[key]);
    });
    this.keys.unshift(this.getRand());
    this.addNum = 0;
    this.props.onChange(value);
  }

  getRand = () => (Math.random() + Date.now()).toString(16).replace('.',
    Math.random().toFixed(6).replace('0.', ''))


  getChildrenToRender = () => {
    const { className, value: data, ...props } = this.props;
    const children = data.image.filter(c => c).map((url, i) => {
      const type = getBgImageType(url);
      const imageNameSplit = getBgImageUrl(url).split('/');
      const name = type === 'img' ? imageNameSplit[imageNameSplit.length - 1]
        : `${type}-gradient`;
      this.keys[i] = this.keys[i] || this.getRand();
      let defaultVisible;
      if (i === this.addNum) {
        defaultVisible = true;
        this.addNum = NaN;
      }
      return (
        <Draggable key={this.keys[i]} index={i} draggableId={this.keys[i]}>
          {
            (provided) => {
              return (
                <Popover
                  content={(
                    <BackGroundPop
                      {...props}
                      value={data}
                      num={i}
                    />
                  )}
                  defaultVisible={defaultVisible}
                  trigger="click"
                  overlayClassName="editor-list-popover"
                  destroyTooltipOnHide// svg defs 阴藏后不会显示渐变了。
                >
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`${className}-list`}
                  >
                    <AntIcon className={`${className}-list-bar`} type="menu" {...provided.dragHandleProps} />
                    <div style={{ backgroundImage: url }} className={`${className}-list-preview`} />

                    <a className={`${className}-list-name`}>
                      {name}
                    </a>

                    <div
                      className={`${className}-list-delete`}
                      onClick={() => {
                        this.onDeleteChild(i);
                      }}
                    >
                      <AntIcon type="delete" />
                    </div>
                  </div>
                </Popover>
              )
            }
          }
        </Draggable>
      )
    });
    return (
      <Row gutter={8}>
        <Col>
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
          >
            <Droppable key="bgImage" droppableId="bgImage">
              {
                (provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      className={`${className}-droppable`}
                    >
                      {children}
                      {provided.placeholder}
                    </div>
                  )
                }
              }
            </Droppable>
          </DragDropContext>
        </Col>
      </Row>
    )
  }

  keys = [];

  render() {
    const { locale, className } = this.props;
    const childToRender = this.getChildrenToRender()
    return (
      <div className={`${className}-wrapper`}>
        {childToRender}
        <Row gutter={8}>
          <Col span={24}>
            <a className="add-button" onClick={this.onAdd}>
              <AntIcon type="plus" />
              {' '}
              {locale.add}
            </a>
          </Col>
        </Row>
      </div>
    )
  }
}

export default polyfill(BackGroundImage);
