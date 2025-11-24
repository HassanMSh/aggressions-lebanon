export function getPageNumbers(current, total) {
  if (total === 0) return [];
  const pages = [];

  const windowSize = 5; // how many pages to show in the middle
  const half = Math.floor(windowSize / 2);

  // Push page 1 always
  pages.push(1);

  // Show dots after first page
  if (current > half + 2) {
    pages.push("...");
  }

  // Sliding window range
  let start = Math.max(2, current - half);
  let end = Math.min(total - 1, current + half);

  // Adjust when near edges
  if (current <= half + 2) {
    start = 2;
    end = Math.min(windowSize + 1, total - 1);
  }

  if (current >= total - (half + 1)) {
    start = Math.max(total - windowSize, 2);
    end = total - 1;
  }

  // Add sliding pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Show dots before last page
  if (end < total - 1) {
    pages.push("...");
  }

  // Push last page always (if > 1)
  if (total > 1) {
    pages.push(total);
  }

  return pages;
}
