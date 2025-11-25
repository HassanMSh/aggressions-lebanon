| Field         | Type                       | Required | Description                                        |
| ------------- | -------------------------- | -------- | -------------------------------------------------- |
| `id`          | string (UUID or slug)      | yes      | Unique identifier for the event.                   |
| `date`        | string (ISO: `YYYY-MM-DD`) | yes      | Exact date of the aggression.                      |
| `description` | string                     | yes      | Full text describing the incident.                 |

Example:

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "date": "2023-05-15",
  "description": "On May 15th, 2023, an incident occurred where..."
}
```
