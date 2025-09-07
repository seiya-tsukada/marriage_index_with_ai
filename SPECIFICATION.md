# SPECIFICATION

## Concept

A service that supports people's happiness by providing a new concept called the Marriage Index

## Theme

- Web application
- Provide a form enabling simple questions and answers
  - Screen design allows one question and one answer per screen
  - Place horizontal buttons; clicking advances to the next question

## FrontEnd

- Next.js
- Tailwind

## Backend

- uv
- Python
  - FaskAPI

## DB

- sqlite

## Analytics

- DuckDB

## Platform

- AWS

## Environment

### Production
(Don't use yet)

#### MVP

- AWS
  - S3 (static hosting & SQLite backup)
  - Lambda (FastAPI backend)
  - API Gateway (frontend-backend integration)

### Development

- Local Machine
