1. Transparency

This project used AI-assisted tools during development.
Below is a clear summary of which tools were used, for what purpose, and how they contributed.

AI Tools Used

-ChatGPT
-Cladue
-Gemini

-- What They Were Used For

Drafting initial versions of:

Task queue scheduling logic (Cloud Tasks)

Basic React Native / UI layout ideas

Debugging and narrowing down errors such as:

TypeScript type mismatches

React Native rendering problems

Firestore querying warnings

Suggesting alternative patterns or improvements for:

API structure

File organization

Error handling and logging

Generating brainstorming ideas for UX and component structure

Sample Prompts Used

"Why might the Cloud Tasks queue return status: failed? Is there a timeout?"

"Expose the gradient background for React Native."

"What does the warning in Firestore: 'Detected filter using positional arguments' mean?"

2. Reflection (5–10 sentences)

Using AI tools was especially helpful for debugging errors quickly, exploring alternate implementations, and generating initial boilerplate code. They significantly sped up repetitive tasks, such as writing validators, API schemas, or UI previews. However, many AI-generated snippets required adjustment—particularly around type definitions, async flow, Firestore behavior, and React Native component structure.
I also had to manually verify the correctness of scheduling logic for Cloud Tasks and adjust parts where AI suggested patterns that weren’t fully aligned with Google Cloud libraries.

Some areas—like production environment decisions, data modeling, rate limiting strategy, and overall architecture—were deliberately done without AI to ensure full ownership and tailored design. AI acted as a helper for ideation and error resolution, but all final decisions and implementations were reviewed, rewritten where necessary, and fully understood before committing.

3. Ownership Statement

All code submitted in this project has been fully reviewed and understood line-by-line.
AI contributed only as a drafting and debugging assistant.
I can modify, extend, and explain any part of the project on request.