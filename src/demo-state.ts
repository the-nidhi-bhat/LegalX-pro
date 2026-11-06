import { accountForRole, type DemoAccount, type Role } from './rbac'

export const PROFILE_KEY = 'legalx:profile'
export const SETTINGS_KEY = 'legalx:settings'
export const AI_DRAFT_KEY = 'legalx:ai-draft'
export const NOTIFICATIONS_KEY = 'legalx:notifications'
export const INVITES_KEY = 'legalx:invites'
export const WALLET_KEY = 'legalx:wallet-connected'
export const MILESTONES_KEY = 'legalx:milestones'

export type DemoProfile = {
  name: string
  email: string
  workspaceName: string
  role: Role
  jobTitle: string
  useCase: string
}

export type DemoSettings = {
  blockCriticalMismatches: boolean
  askForSourceClauses: boolean
  requireWalletConfirmation: boolean
  emailNotifications: boolean
}

const DEFAULT_PROFILE: DemoProfile = {
  name: 'Nirvan Shah',
  email: 'owner@legalx.demo',
  workspaceName: 'Acme Digital',
  role: 'owner',
  jobTitle: 'Product & AI lead',
  useCase: 'Freelance agreements',
}

const DEFAULT_SETTINGS: DemoSettings = {
  blockCriticalMismatches: true,
  askForSourceClauses: true,
  requireWalletConfirmation: true,
  emailNotifications: true,
}

function storage(): Storage | null {
  try { return typeof window === 'undefined' ? null : window.localStorage } catch { return null }
}

function safeRead<T>(key: string, fallback: T): T {
  try {
    const value = storage()?.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch { return fallback }
}

function safeWrite<T>(key: string, value: T) {
  try { storage()?.setItem(key, JSON.stringify(value)) } catch { /* local demo state is best effort */ }
}

export function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0]?.slice(0, 2) || 'LX').toUpperCase()
}

export function readStoredProfile(): DemoProfile | null {
  const value = safeRead<Partial<DemoProfile> | null>(PROFILE_KEY, null)
  if (!value || typeof value.name !== 'string' || !value.name.trim() || typeof value.email !== 'string') return null
  const role = ['owner', 'freelancer', 'legal_reviewer', 'org_admin', 'technical_auditor'].includes(value.role || '') ? value.role as Role : 'owner'
  return { ...DEFAULT_PROFILE, ...value, role, name: value.name.trim(), email: value.email.trim() }
}

export function defaultProfile(role: Role = 'owner'): DemoProfile {
  const account = accountForRole(role)
  return { ...DEFAULT_PROFILE, role, name: account.name, email: account.email, workspaceName: account.workspaceName }
}

export function saveProfile(profile: DemoProfile): DemoProfile {
  const normalized = { ...DEFAULT_PROFILE, ...profile, name: profile.name.trim() || DEFAULT_PROFILE.name, email: profile.email.trim() || DEFAULT_PROFILE.email, workspaceName: profile.workspaceName.trim() || DEFAULT_PROFILE.workspaceName }
  safeWrite(PROFILE_KEY, normalized)
  window.dispatchEvent(new Event('legalx:state'))
  return normalized
}

export function readSettings(): DemoSettings {
  return { ...DEFAULT_SETTINGS, ...safeRead<Partial<DemoSettings>>(SETTINGS_KEY, {}) }
}

export function saveSettings(settings: DemoSettings): DemoSettings {
  const normalized = { ...DEFAULT_SETTINGS, ...settings }
  safeWrite(SETTINGS_KEY, normalized)
  window.dispatchEvent(new Event('legalx:state'))
  return normalized
}

export function effectiveAccount(role: Role): DemoAccount {
  const base = accountForRole(role)
  const profile = readStoredProfile()
  if (!profile || profile.role !== role) return base
  return { ...base, name: profile.name, email: profile.email, workspaceName: profile.workspaceName, initials: initialsFor(profile.name) }
}

export function readJson<T>(key: string, fallback: T): T { return safeRead(key, fallback) }
export function writeJson<T>(key: string, value: T): T { safeWrite(key, value); window.dispatchEvent(new Event('legalx:state')); return value }
export function readText(key: string, fallback = ''): string { try { return storage()?.getItem(key) || fallback } catch { return fallback } }
export function writeText(key: string, value: string): string { try { storage()?.setItem(key, value) } catch { /* best effort */ } window.dispatchEvent(new Event('legalx:state')); return value }
