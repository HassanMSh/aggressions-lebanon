import { readFileSync } from "node:fs";

const DATE_PATTERN = /^\d{4}\/\d{2}\/\d{2}$/;

/**
 * Check the dataset the site loads (public/events.json by default).
 *
 * Fails (exit code 1) when the file is not valid JSON, is not an array,
 * has an event without `id`, `date` or `text`, or has duplicate `id` values.
 * Events whose `date` is not `YYYY/MM/DD` are reported as warnings only,
 * because the site hides them instead of crashing.
 *
 * @param {string} path Path to the events JSON file.
 * @returns {number} Exit code: 0 when valid, 1 when errors were found.
 */
function checkEvents(path) {
  const errors = [];
  let events;

  try {
    events = JSON.parse(readFileSync(path, "utf-8"));
  } catch (err) {
    console.error(`::error file=${path}::Cannot read or parse JSON: ${err.message}`);
    return 1;
  }

  if (!Array.isArray(events)) {
    console.error(`::error file=${path}::Top level value must be an array`);
    return 1;
  }

  const seenIds = new Set();
  let badDates = 0;

  events.forEach((event, index) => {
    for (const field of ["id", "date", "text"]) {
      if (event[field] === undefined || event[field] === null || event[field] === "") {
        errors.push(`Event at index ${index} is missing "${field}"`);
      }
    }

    if (seenIds.has(event.id)) {
      errors.push(`Duplicate id ${event.id} at index ${index}`);
    }
    seenIds.add(event.id);

    if (typeof event.date === "string" && !DATE_PATTERN.test(event.date)) {
      badDates += 1;
      console.warn(`::warning file=${path}::Event id ${event.id} has a malformed date and is hidden on the site`);
    }
  });

  errors.forEach((msg) => console.error(`::error file=${path}::${msg}`));
  console.log(`Checked ${events.length} events: ${errors.length} errors, ${badDates} malformed dates.`);

  return errors.length > 0 ? 1 : 0;
}

process.exit(checkEvents(process.argv[2] ?? "public/events.json"));
