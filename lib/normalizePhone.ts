

export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "")
  return digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits // remove the leading 1 from phone number
}

export function formatPhone(digits: string | null): string { //formats phone number
  if (!digits || digits.length !== 10) return ""
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}
