# ETL Pipeline

This directory contains the ETL (Extract, Transform, Load) pipeline scripts used for processing and transforming the database into a structured format suitable for querying in the website. The ETL process involves three main steps:

1. **Extract**: Retrieve data from the sqlite database.
2. **Transform**: Clean, enrich, and reshape the data to meet the requirements of the target data model.
3. **Load**: Load the transformed data into the JSON file.

The intention is to make this a github actions workflow in the future for automation. Eventually, the goal is to automatically update the DB with the new requests and regenerate the JSON file for the website to reflect the latest data.

## Future Improvements

- Automate the ETL process using GitHub Actions.
- Automate the database updates with new requests.
- Sanitize and validate data during the transformation step to ensure data quality. Preferably using an AI model to assist in data cleaning and validation.
