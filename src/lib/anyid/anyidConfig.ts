const anyIdConfigDirByMode: Record<string, string> = {
  development: 'local',
  localout: 'local',
  stg: 'dev',
  production: 'prod',
}

function normalizeConfigDir(value: string | undefined): string | null {
  if (!value) return null
  const normalized = value.trim().toLowerCase()
  return normalized ? normalized : null
}

export function getAnyIdConfigDir(): string {
  const explicitDir = normalizeConfigDir(import.meta.env.VITE_ANYID_CONFIG_DIR)
  if (explicitDir) {
    return explicitDir
  }

  return anyIdConfigDirByMode[import.meta.env.MODE] ?? 'local'
}

export function getAnyIdConfigUrl(fileName = 'config.anyidc.json'): string {
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '/')
  return `${baseUrl}config/${getAnyIdConfigDir()}/${fileName}`
}
