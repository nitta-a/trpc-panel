// Types shared across form components

export const ROOT_VALS_PROPERTY_NAME = 'vals'

// Type for the form data structure used in ProcedureForm
// Using Record allows for flexible dynamic paths while still providing type safety
export type ProcedureFormData = Record<string, unknown>
