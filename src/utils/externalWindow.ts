const EXTERNAL_WINDOW_PREFIX = 'external_link_';
const externalWindows = new Map<string, Window | null>();

const buildExternalWindowTarget = (url: string) =>
  `${EXTERNAL_WINDOW_PREFIX}${url.replace(/[^a-zA-Z0-9]/g, '_')}`.slice(0, 120);

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
