export const CONFIG = {
  loadingDuration: 3000,
  walkingDelay: 800,
  walkingDuration: 2000,
  doorOpenDuration: 1500,
  particleCount: 60,
  transitionDuration: 2000,
}

export const PHASE_LABELS = {
  walking: 'APPROACHING',
  entering: 'DOORS OPENING',
  inside: 'ENTERING LAB',
}

export const LOADING_MESSAGES = [
  'Initializing environment...',
  'Loading design assets...',
  'Syncing prototypes...',
  'Calibrating holographics...',
  'Environment ready.',
]
