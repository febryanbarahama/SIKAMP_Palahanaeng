"use client";

export function DynamicYear() {
  const currentYear = new Date().getFullYear();
  return <span>&copy; {currentYear} SIKAMP Palahanaeng.</span>;
}
