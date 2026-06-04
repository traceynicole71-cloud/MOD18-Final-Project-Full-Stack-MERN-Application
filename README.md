# Pro-Tasker: Agile Kanban Workspace Platform



## Table of contents

- [Overview](#overview)
  - [Challenge](#challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview
Pro-Tasker is a full-stack project management application designed to be used as a agile engineering workspace. Using the MERN stack (MongoDB, Express, React, and Node.js), the platform leverages a Dracula-themed dark-mode interface accented with pink and green highlights, a modular architecture, custom data-fetching hooks, and cryptographic identity protections.

### Challenge
- Architecting a clean separation of concerns by decoupling UI components from asynchronous network operations and caching
- Implementing an environment using Tailwind CSS
- Restricting access to the core dashboard metrics through strict client-side routing guards
- Securing backend RESt interfaces behind a cryptographically verified JSON Web Token authorization level

### Screenshot

<img width="1032" height="740" alt="Screenshot 2026-06-03 at 3 02 39 PM" src="https://github.com/user-attachments/assets/67453130-254a-4dc1-a11c-605ae5cf9286" />
<img width="1020" height="740" alt="Screenshot 2026-06-03 at 3 03 16 PM" src="https://github.com/user-attachments/assets/3262369a-11a8-433e-b821-bd830abda2eb" />
<img width="1033" height="728" alt="Screenshot 2026-06-03 at 3 04 27 PM" src="https://github.com/user-attachments/assets/75852d51-f206-4c06-b543-3232f9412613" />
## My process
Phase 1: Built out the database model and REST API formulation
Phase 2: Built the security and transport architecture
Phase 3: Implemented custom hooks and global state
Phase 4:  Styled and configured frontend with Tailwind CSS
### Built with

- MERN Stack Engine: MongoDb, Express, React, Node.js
- Vite.js
- Tailwind CSS
- React Router DOM
- Axios Interceptors
- JSON Web Tokens and Bcrypt hashing


### What I learned

I learned how to fully isolate oage views from state operations. By wrapping fetch mechanisms inside React's native block, I kept data arrays completely synced while preventing background loops.

I learned how to use Axios to my advantage by attaching credentials before a network call leaves the app.  This helps to eliminate duplicate code.

I learned how to create nested React states (inside my components folder) to check security tokens at the routing level, which in turn protects the lockedareas from unauthenticated guests.

### Useful resources

- [Time To Program Youtube - Build a Full-Stack MERN Task Manager] https://www.youtube.com/watch?v=fZK57PxKC-0
- [The Code Dealer Youtube - Build and Deploy a Full Stack MERN Project] https://www.youtube.com/watch?v=3YmDEF2p8_Y
- [Dave Gray Youtube - React Axios API Request] https://www.youtube.com/watch?v=ZEKBDXGnD4s



### AI Collaboration

I used Google Gemini to help debug layout issues and to help figure out missing route attachments from the front and back ends.

## Acknowledgments

As acknowledged in resources, I'm thankful for the guidance and support provided by Jeffrey Leak, Senior Software Eningeer IV.
