export const CONFIG = {
  loadingDuration: 3000,
  walkingDelay: 400,
  walkingDuration: 1000,
  doorOpenDuration: 800,
  particleCount: 60,
  transitionDuration: 500,
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
