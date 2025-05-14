/**
 * Formatting utilities for the application
 */

/**
 * Format a date relative to now
 * @param date Date to format
 * @param options Formatting options
 */
export function formatRelativeTime(
  date: Date | number,
  options?: { addSuffix?: boolean }
): string {
  const now = new Date();
  const diff = now.getTime() - (typeof date === 'number' ? date : date.getTime());
  
  // Convert to seconds
  const seconds = Math.floor(diff / 1000);
  
  // Less than a minute
  if (seconds < 60) {
    return options?.addSuffix ? 'just now' : 'just now';
  }
  
  // Minutes
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return options?.addSuffix ? `${minutes}m ago` : `${minutes}m`;
  }
  
  // Hours
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return options?.addSuffix ? `${hours}h ago` : `${hours}h`;
  }
  
  // Days
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return options?.addSuffix ? `${days}d ago` : `${days}d`;
  }
  
  // Months
  const months = Math.floor(days / 30);
  if (months < 12) {
    return options?.addSuffix ? `${months}mo ago` : `${months}mo`;
  }
  
  // Years
  const years = Math.floor(months / 12);
  return options?.addSuffix ? `${years}y ago` : `${years}y`;
}

/**
 * Format distance to now
 * (This is an alias for formatRelativeTime with addSuffix set to true)
 */
export function formatDistanceToNow(
  date: Date | number,
  options?: { addSuffix?: boolean }
): string {
  return formatRelativeTime(date, { ...options, addSuffix: true });
} 