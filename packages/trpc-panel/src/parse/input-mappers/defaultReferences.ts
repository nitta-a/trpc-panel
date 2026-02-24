import type { ParseReferences } from '../parseNodeTypes'

export function defaultReferences(): ParseReferences {
  return {
    path: [],
    options: {},
    addDataFunctions: {
      addDescriptionIfExists: () => {},
    },
  }
}
