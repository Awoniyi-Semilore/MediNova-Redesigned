// src/components/simulation/useSimColor.js
// ─────────────────────────────────────────────────────────────────────────────
// Returns a randomised accent colour for each simulation attempt.
// Same level never repeats the same colour twice in a row,
// and no colour repeats within the last 3 picks.
// History is stored in sessionStorage so it resets on every new browser session.
// ─────────────────────────────────────────────────────────────────────────────

export const LEVEL_COLORS = {
  clerkship: {
    accents: ['#1565c0', '#0277bd', '#283593', '#00695c', '#00838f'],
    bg:      '#fdfaf6',
    paper:   '#fff',
    border:  '#e8e2d5',
  },
  junior_residency: {
    accents: ['#00b894', '#00cec9', '#0984e3', '#6c5ce7', '#00a8a8'],
    bg:      '#0a0f1a',
    paper:   '#060d16',
    border:  '#1a2d3d',
  },
  senior_residency: {
    accents: ['#2e7d32', '#388e3c', '#1b5e20', '#33691e', '#558b2f'],
    bg:      '#e8ede8',
    paper:   '#fff',
    border:  '#c0cfc0',
  },
  fellowship: {
    accents: ['#7e57c2', '#6a1b9a', '#9c27b0', '#512da8', '#4527a0'],
    bg:      '#f4f0ff',
    paper:   '#fff',
    border:  '#c0b0e0',
  },
  board_certification: {
    accents: ['#8b6914', '#c49a1a', '#a07820', '#7a5c10', '#d4a843'],
    bg:      '#0c0a08',
    paper:   '#100c08',
    border:  '#2a1f14',
  },
}

// Fallback pool used only if level is unrecognised
const FALLBACK_POOL = ['#1565c0', '#2e7d32', '#c62828', '#7e57c2', '#00695c']

export function getSimColor(level, classId) {
  // Resolve the correct colour pool
  const pool = LEVEL_COLORS[level]?.accents || FALLBACK_POOL

  // Key history by level so different levels don't interfere
  const storageKey = `mn_simcolor_${level || 'default'}`

  let history = []
  try {
    history = JSON.parse(sessionStorage.getItem(storageKey) || '[]')
  } catch {
    history = []
  }

  // Exclude the last 3 used colours to prevent repetition
  const recentlyUsed = history.slice(-3)
  const available    = pool.filter(c => !recentlyUsed.includes(c))
  const candidates   = available.length > 0 ? available : pool

  // Pick randomly from the available candidates
  const picked = candidates[Math.floor(Math.random() * candidates.length)]

  // Save back to history (cap at 10 entries)
  history.push(picked)
  if (history.length > 10) history = history.slice(-10)
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(history))
  } catch {
    // sessionStorage unavailable — silent fail
  }

  return picked
}

export function getLevelTheme(level) {
  return LEVEL_COLORS[level] || LEVEL_COLORS.clerkship
}