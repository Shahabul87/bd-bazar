import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Data = Record<string, string | number | boolean | null>

/**
 * Converts an array of data objects to a CSV file and triggers download
 * @param data Array of data objects to convert to CSV
 * @param filename Name of the file without extension
 */
export function downloadToCSV(data: Data[], filename: string) {
  if (!data.length) return;

  // Get headers from the first data object
  const headers = Object.keys(data[0]);
  
  // Create CSV rows
  const csvRows = [
    // Headers row
    headers.join(','),
    
    // Data rows
    ...data.map(row => {
      return headers.map(header => {
        // Handle values that may contain commas by wrapping in quotes
        const cell = row[header] === null ? '' : String(row[header]);
        return cell.includes(',') ? `"${cell}"` : cell;
      }).join(',');
    })
  ];

  // Combine rows into a single string
  const csvString = csvRows.join('\n');
  
  // Create blob and URL
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Create temporary link and trigger download
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
