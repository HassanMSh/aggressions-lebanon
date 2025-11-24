export function getPageNumbers(current, total) {
  if (total === 0) return [];

  const pages = [];
  const windowSize = 5;
  const half = Math.floor(windowSize / 2);

  // Always include page 1
  pages.push(1);

  // Compute sliding window
  let start = Math.max(2, current - half);
  let end = Math.min(total - 1, current + half);

  // Adjust when near the start
  if (current <= half + 2) {
    start = 2;
    end = Math.min(windowSize + 1, total - 1);
  }

  // Adjust when near the end
  if (current >= total - (half + 1)) {
    start = Math.max(total - windowSize, 2);
    end = total - 1;
  }

  // Dots after page 1
  if (start > 2) {
    pages.push("...");
  }

  // Window pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Dots before last page
  if (end < total - 1) {
    pages.push("...");
  }

  // Always include last page
  if (total > 1) {
    pages.push(total);
  }

  return pages;
}
