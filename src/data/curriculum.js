// curriculum.js - Main index file combining all level modules
import { CLERKSHIP } from './clerkship.js'
import { JUNIOR_RESIDENCY } from './junior_residency.js'
import { SENIOR_RESIDENCY } from './senior_residency.js'
import { FELLOWSHIP } from './fellowship.js'
import { BOARD_CERTIFICATION } from './board_certification.js'

// ═══════════════════════════════════════════════════════════════════════════════
// LEVEL DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const LEVELS = [
  {
    id: "clerkship",
    label: "Clerkship",
    classRange: [1, 4],
    tagline: "You just walked onto the ward. Learn to see before you act.",
    simulationDesign: "clipboard",
    colorPool: ["#1565c0", "#0277bd", "#283593", "#00695c"],
  },
  {
    id: "junior_residency",
    label: "Junior Residency",
    classRange: [5, 9],
    tagline: "Common presentations. Independent management. The clock has started.",
    simulationDesign: "monitor",
    colorPool: ["#2e7d32", "#388e3c", "#1b5e20", "#33691e"],
  },
  {
    id: "senior_residency",
    label: "Senior Residency",
    classRange: [10, 14],
    tagline: "High acuity. Competing priorities. Hesitation is not an option.",
    simulationDesign: "whiteboard",
    colorPool: ["#e65100", "#bf360c", "#ff6f00", "#e64a19"],
  },
  {
    id: "fellowship",
    label: "Fellowship",
    classRange: [15, 18],
    tagline: "Sub-specialty mastery. You are directing a team now.",
    simulationDesign: "command_centre",
    colorPool: ["#6a1b9a", "#4a148c", "#880e4f", "#ad1457"],
  },
  {
    id: "board_certification",
    label: "Board Certification",
    classRange: [19, 20],
    tagline: "No hints. No guidance. Just a patient and everything you know.",
    simulationDesign: "blank_slate",
    colorPool: ["#b71c1c", "#7f0000", "#c62828"],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// COMBINED CURRICULUM
// ═══════════════════════════════════════════════════════════════════════════════

export const CURRICULUM = [
  ...CLERKSHIP,
  ...JUNIOR_RESIDENCY,
  ...SENIOR_RESIDENCY,
  ...FELLOWSHIP,
  ...BOARD_CERTIFICATION
]

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export function getLevelById(id) {
  return LEVELS.find(l => l.id === id)
}

export function getClassesByLevel(levelId) {
  return CURRICULUM.filter(c => c.level === levelId)
}

export function getClassById(id) {
  return CURRICULUM.find(c => c.id === id)
}

export function getTotalClassCount() {
  return CURRICULUM.length
}

export function getClassesByTrack(track) {
  return CURRICULUM.filter(c => c[track] && c[track].sims && c[track].sims.length > 0)
};