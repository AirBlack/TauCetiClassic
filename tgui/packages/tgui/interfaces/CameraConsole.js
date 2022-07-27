import { filter, sortBy } from 'common/collections';
import { flow } from 'common/fp';
import { classes } from 'common/react';
import { createSearch } from 'common/string';
import { useBackend, useLocalState } from '../backend';
import { Button, ByondUi, Flex, Input, Section, Box, NanoMap, Icon } from '../components';
import { Window } from '../layouts';

/**
 * Returns previous and next camera names relative to the currently
 * active camera.
 */
export const prevNextCamera = (cameras, activeCamera) => {
  if (!activeCamera) {
    return [];
  }
  const index = cameras.findIndex(camera => (
    camera.name === activeCamera.name
  ));
  return [
    cameras[index - 1]?.name,
    cameras[index + 1]?.name,
  ];
};

/**
 * Camera selector.
 *
 * Filters cameras, applies search terms and sorts the alphabetically.
 */
export const selectCameras = (cameras, searchText = '') => {
  const testSearch = createSearch(searchText, camera => camera.name);
  return flow([
    // Null camera filter
    filter(camera => camera?.name),
    // Optional search term
    searchText && filter(testSearch),
    // Slightly expensive, but way better than sorting in BYOND
    sortBy(camera => camera.name),
  ])(cameras);
};

export const CameraConsole = (props, context) => {
  Byond.winget("mapwindow.map", "style").then(style => {
    Byond.winset(mapRef, "style", style);
  });
  const { act, data } = useBackend(context);
  const { mapRef, activeCamera } = data;
  const cameras = selectCameras(data.cameras);
  const [
    prevCameraName,
    nextCameraName,
  ] = prevNextCamera(cameras, activeCamera);
  return (
    <Window resizable>
      <div className="CameraConsole__left">
        <Window.Content>
          <CameraConsoleContent />
        </Window.Content>
      </div>
      <div className="CameraConsole__right">
        <div className="CameraConsole__toolbar">
          <b>Camera: </b>
          {activeCamera
            && activeCamera.name
            || '—'}
        </div>
        <div className="CameraConsole__toolbarRight">
          <Button
            icon="chevron-left"
            disabled={!prevCameraName}
            onClick={() => act('switch_camera', {
              name: prevCameraName,
            })} />
          <Button
            icon="chevron-right"
            disabled={!nextCameraName}
            onClick={() => act('switch_camera', {
              name: nextCameraName,
            })} />
        </div>
        <ByondUi
          className="CameraConsole__map"
          params={{
            id: mapRef,
            type: 'map',
          }} />
      </div>
    </Window>
  );
};

export const CameraConsoleContent = (props, context) => {
  const [
    isMinimapShown,
    setMinimapShown,
  ] = useLocalState(context, 'isMinimapShown', false);

  const tabUi = minimapShown => {
    switch (minimapShown) {
      case false:
        return <CameraConsoleListContent />;
      case true:
        return <CameraMinimapContent />;
    }
  };

  const toggleMode = () => {
    setMinimapShown(!isMinimapShown);
  };

  return (
    <Flex
      direction={"column"}
      height="100%">
      <Button
        onClick={() => toggleMode()}>
        {isMinimapShown ? "Switch to List" : "Switch to Minimap"}
      </Button>

      {tabUi(isMinimapShown)}
    </Flex>
  );
};

export const CameraMinimapContent = (props, context) => {
  const { act, data, config } = useBackend(context);
  const { activeCamera } = data;
  const cameras = selectCameras(data.cameras);

  const [
    prevCameraName,
    nextCameraName,
  ] = prevNextCamera(cameras, activeCamera);

  const [zoom, setZoom] = useLocalState(context, 'zoom', 1);

  return (
    <Box height="100%" display="flex">
      <Box height="100%" flex="0 0 500px" display="flex">
        <NanoMap onZoom={v => setZoom(v)}>
          {cameras.filter(cam => cam.z === 1).map(cm => (
            <div
            key={camera.name}
            title={camera.name}
            className={classes([
              'Button',
              'Button--fluid',
              'Button--color--transparent',
              'Button--ellipsis',
              activeCamera
              && camera.name === activeCamera.name
              && 'Button--selected',
            ])}
            onClick={() => act('switch_camera', {
              name: camera.name,
            })}>
            {camera.name}
          </div>
            // <NanoMap.NanoButton
            //   activeCamera={activeCamera}
            //   key={cm.ref}
            //   x={cm.x}
            //   y={cm.y}
            //   context={context}
            //   zoom={zoom}
            //   icon="circle"
            //   tooltip={cm.name}
            //   name={cm.name}
            //   color={"blue"}
            //   status={cm.status}
            // />
          ))}
        </NanoMap>
      </Box>
    </Box>
  );
};

export const CameraConsoleListContent = (props, context) => {
  const { act, data } = useBackend(context);
  const [
    searchText,
    setSearchText,
  ] = useLocalState(context, 'searchText', '');
  const { activeCamera } = data;
  const cameras = selectCameras(data.cameras, searchText);
  return (
    <Flex
      direction={"column"}
      height="100%">
      <Flex.Item>
        <Input
          autoFocus
          fluid
          mt={1}
          placeholder="Search for a camera"
          onInput={(e, value) => setSearchText(value)} />
      </Flex.Item>
      <Flex.Item
        height="100%">
        <Section
          fill
          scrollable>
          {cameras.map(camera => (
            // We're not using the component here because performance
            // would be absolutely abysmal (50+ ms for each re-render).
            <div
              key={camera.name}
              title={camera.name}
              className={classes([
                'Button',
                'Button--fluid',
                'Button--color--transparent',
                'Button--ellipsis',
                activeCamera
                && camera.name === activeCamera.name
                && 'Button--selected',
              ])}
              onClick={() => act('switch_camera', {
                name: camera.name,
              })}>
              {camera.name}
            </div>
          ))}
        </Section>
      </Flex.Item>
    </Flex>
  );
};