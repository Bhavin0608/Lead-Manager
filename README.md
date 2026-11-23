# Lead Manager

A full-stack application for tracking sales leads, built for Meru Technosoft’s Full Stack Developer screening assignment. A salesperson can capture an enquiry, find the contact later, and update the lead’s status after a conversation.

## Run locally

You’ll need Node.js with npm and a running MongoDB instance (local or Atlas). Clone this repository and open two terminals at the repository root.

**1. Start the API.** In the first terminal, install the server dependencies.

```sh
cd server
npm install
```

Create a file named `.env` inside `server/`. For a local MongoDB instance, use:

```dotenv
MONGO_URI = 'mongodb://localhost:27017/lead_manager'
```

For Atlas, use your database connection string as the value of `MONGODB_URI`. Keep credentials in your local environment and exclude `.env` from Git. Start the API from the same terminal:

```sh
node index.js
```

Open `http://localhost:5000/api/leads` to check the connection. A fresh database should return an empty JSON array.

**2. Start the frontend.** In the second terminal, run:

```sh
cd client
npm install
npm run dev
```

Open the local URL printed by Vite. During development, the frontend sends requests to `/api/leads` through the Vite proxy. If you change the API port, update the proxy target in the client’s Vite configuration as well.

## Features

- **Capture a lead.** Enter name, email, phone, company, source, and status. Source options are Website, Referral, Social Media, and Other. New leads start as **New**, and the user can choose another status.
- **Review and search.** The All Leads table displays contact details and a labeled status badge. Partial name search is case-insensitive and works together with the status dropdown.
- **Edit a lead.** Open a row to load its saved values, change the details or status, and save the update. The available statuses are New, Contacted, Qualified, and Lost.
- **Delete with confirmation.** The confirmation names the selected lead. After the API confirms deletion, the table removes that row.
- **Validate input.** Required fields and email inputs provide feedback in the browser. The API validates lead data before saving it. The list distinguishes loading, an empty database, and a search with no matches.

## Technology choices

| Technology | Role and rationale |
|---|---|
| React, React Router, and Vite | React manages form and filter state. Separate routes let the user open the list, add form, or a specific lead’s edit page directly. Vite runs the development frontend. |
| Node.js and Express | A small REST API handles lead operations and keeps the client and server in JavaScript. |
| MongoDB and Mongoose | Each lead fits in one document. A schema groups the field definitions and validation rules, and the document ID identifies the correct record during edits and deletions. |
| Plain CSS | Shared styles keep the add and edit forms consistent. On smaller screens the fields stack and the table scrolls horizontally inside its card. |

## API

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/leads` | List all leads |
| POST | `/api/leads` | Create a lead |
| GET | `/api/leads/:id` | Fetch one lead to prefill the edit form |
| PATCH | `/api/leads/:id` | Update the selected lead |
| DELETE | `/api/leads/:id` | Delete the selected lead |

## Assumptions and trade-offs

- The assignment models one salesperson working with a shared lead list.
- Phone numbers are text so a country code such as `+91` is preserved.
- The list is small enough to fetch once and filter in the browser. Typing a name or changing a status updates the table immediately.
- Status is chosen manually. A salesperson can correct it or move a lead directly to any of the four stages.

## Try the workflow

1. Add a sample lead named **Riya Shah** with status **New**, then add **Riya Patel** with status **Contacted**.
2. Open **All leads**, search for `RIY`, and select **Contacted**. Only Riya Patel should appear. Clear both filters to see both leads.
3. Edit Riya Shah’s status to **Qualified**, save, and refresh. Check that the same contact now shows **Qualified**.
4. Click **Delete** on a sample lead and cancel. The row should remain. Confirm deletion on a second attempt and refresh to verify the result.
5. To check server-side validation independently, submit a POST request in Postman with an invalid email. Verify that the API rejects it and the list gains no record.

## What I found tricky

Getting name search and status filtering to work together took care. I keep one list of leads and derive the visible rows from both filters, so selecting a status preserves the search and deleting a lead updates the filtered view immediately.

## What I would improve with more time

I would add API regression tests for invalid input and missing records, then introduce server-side filtering and pagination as the dataset grows. For a team deployment, I would add authentication and enforce lead ownership on each API operation.
