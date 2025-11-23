import json
import sqlite3
from pathlib import Path

DB_PATH = Path("../database/sqlite.db")
OUTPUT_DIR = Path("export")
OUTPUT_DIR.mkdir(exist_ok=True)


def export_table(query, output_file):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute(query).fetchall()
    conn.close()

    data = [dict(row) for row in rows]
    with open(OUTPUT_DIR / output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✔ Exported {len(data)} records → {output_file}")


# Export tables
export_table("SELECT * FROM events", "events.json")
export_table("SELECT * FROM ocr_results", "ocr_results.json")  # optional
