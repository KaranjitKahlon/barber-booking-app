
// format date to a string
export function toLocalDateString(d: Date): string {
    return (
        `${d.getFullYear()}-` +
        `${(d.getMonth() + 1).toString().padStart(2, "0")}-` +
        `${d.getDate().toString().padStart(2, "0")}`
    )
}
