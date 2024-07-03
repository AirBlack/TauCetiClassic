
import { clamp } from 'common/math';
import { pureComponentHooks } from 'common/react';
import { Component } from 'inferno';
import { useBackend } from '../backend';
import { Box } from './Box';
import { resolveAsset } from '../assets';
import { createLogger } from '../logging';
import { addScrollableNode, removeScrollableNode } from '../events';

const logger = createLogger();

export class NanoMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragX: 0,
      dragY: 0,
      originX: null,
      originY: null,
      zoom: 1,
    };

    this.handleDragStart = e => {
      logger.log("TESTT2asss");
      this.setState(prevState => {
        const state = { ...prevState };
        state.originX = e.screenX;
        state.originY = e.screenY;
        return state;
      });
      document.addEventListener('mousemove', this.handleDragMove);
      document.addEventListener('mouseup', this.handleDragEnd);
    };

    this.handleDragMove = e => {
      this.setState(prevState => {
        const state = { ...prevState };

        const { originX, originY, dragX, dragY, zoom } = state;

        state.dragX = dragX + (e.screenX - originX) / zoom;
        state.dragY = dragY + (e.screenY - originY) / zoom;

        state.originX = e.screenX;
        state.originY = e.screenY;

        return state;
      });
    };

    this.handleDragEnd = e => {
      this.setState(prevState => {
        const state = { ...prevState };
        state.originX = null;
        state.originY = null;
        return state;
      });
      document.removeEventListener('mousemove', this.handleDragMove);
      document.removeEventListener('mouseup', this.handleDragEnd);
    };

    this.handleScroll = e => {
      const { minZoom, maxZoom, zoomSensitivity } = this.props;
      logger.log(newZoom);
      e.preventDefault();

      this.setState(prevState => {
        const state = { ...prevState };
        const { zoom, dragX, dragY } = state;

        let scaleX = e.screenX - dragX / zoom;
        let scaleY = e.screenY - dragY / zoom;

        let newZoom = clamp(zoom - e.deltaY * zoomSensitivity, minZoom, maxZoom);

        let newDragX = e.screenX - scaleY * newZoom;
        let newDragY = e.screenY - scaleX * newZoom;
        state.zoom = newZoom;
        logger.log(newZoom);
        state.dragX = newDragX;
        state.dragY = newDragY;

        return state;
      });
    };
  }

  componentDidMount(node) {
    logger.log("added wheel listener")
    addScrollableNode(node);
    window.addEventListener('wheel', this.handleScroll)
  }

  componentWillUnmount(node) {
    removeScrollableNode(node);
    window.removeEventListener('wheel', this.handleScroll)
  }

  render() {
    const { data } = useBackend(this.context);
    const { mapName } = data;
    const { dragX, dragY, zoom } = this.state;
    const { children, mapWidth, mapHeight } = this.props;

    const mapUrl = `nanomap_${mapName ?? 'exodus'}_1.png`;

    const mapStyle = {
      width: '100%',
      height: '100%',
      position: 'absolute',
      overflow: 'hidden',
      '-ms-interpolation-mode': 'nearest-neighbor', // TODO: Remove with 516
      'image-rendering': 'pixelated',
    };

    return (
      <Box
        className="NanoMap"
        width={`${mapWidth}px`}
        height={`${mapHeight}px`}
        onMouseDown={this.handleDragStart}
        onWheel={this.handleScroll}
        style={{
          'transform': `translate(${dragX}px,${dragY}px) scale(${zoom})`,
          'backgroundImage': `url(${resolveAsset('nanomapBackground.png')})`,
          'position': 'relative',
          // 'overflow': 'scroll'
        }}>
        <img src={resolveAsset(mapUrl)} style={mapStyle} />
        {children}
      </Box>
    );
  }
}

NanoMap.defaultHooks = pureComponentHooks;
NanoMap.defaultProps = {
  minZoom: 0.1,
  maxZoom: 10,
  mapWidth: 256,
  mapHeight: 256,
  zoomSensitivity: 0.25,
};
