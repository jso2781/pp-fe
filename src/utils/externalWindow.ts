const EXTERNAL_WINDOW_PREFIX = 'external_link_';
const externalWindows = new Map<string, Window | null>();

const buildExternalWindowTarget = (url: string) =>
  `${EXTERNAL_WINDOW_PREFIX}${url.replace(/[^a-zA-Z0-9]/g, '_')}`.slice(0, 120);

type NamedPopupOptions = {
  anchorElement: HTMLElement;
  height: number;
  targetName: string;
  width: number;
};

// 팝업 위치 조정
// X 값을 키우면 팝업이 더 왼쪽으로 이동한다.
// Y 값은 음수면 위로, 양수면 아래로 이동한다.
const POPUP_OFFSET_X = 50;
const POPUP_OFFSET_Y = 300;

const getPopupFeaturesNearElement = (
  { anchorElement, width, height }: Omit<NamedPopupOptions, 'targetName'>,
) => {
  // anchorElement 왼쪽에 팝업을 띄운다.
  const rect = anchorElement.getBoundingClientRect();
  const left = window.screenX + rect.left - width - POPUP_OFFSET_X;
  const top = window.screenY + rect.bottom - height + POPUP_OFFSET_Y;

  return [
    'popup=yes',
    'resizable=yes',
    'scrollbars=yes',
    `width=${width}`,
    `height=${height}`,
    `left=${Math.round(left)}`,
    `top=${Math.round(top)}`,
  ].join(',');
};

export const openExternalInNamedWindow = (url: string) => {
  const targetName = buildExternalWindowTarget(url);
  const existingWindow = externalWindows.get(targetName);

  if (existingWindow && !existingWindow.closed) {
    existingWindow.location.href = url;
    existingWindow.focus();
    return existingWindow;
  }

  const openedWindow = window.open(url, targetName);
  externalWindows.set(targetName, openedWindow);

  openedWindow?.focus();
  return openedWindow;
};

export const openUrlInNamedPopupNearElement = (
  url: string,
  { anchorElement, targetName, width, height }: NamedPopupOptions,
) => {
  const existingWindow = externalWindows.get(targetName);

  if (existingWindow && !existingWindow.closed) {
    existingWindow.location.href = url;
    existingWindow.focus();
    return existingWindow;
  }

  const openedWindow = window.open(
    url,
    targetName,
    getPopupFeaturesNearElement({ anchorElement, width, height }),
  );

  externalWindows.set(targetName, openedWindow);
  openedWindow?.focus();

  return openedWindow;
};
