In this assignment, you'll enhance an existing application by integrating social authentication using Google and GitHub providers. The backend is built with Express.js, utilizing JWT for authentication, and MongoDB with Mongoose for data management. The frontend is developed with Next.js, styled using Tailwind CSS, and employs NextAuth.js v5 for authentication.

**Assignment Objectives:**

1.  **Set Up MongoDB Atlas:**

    -   **Create an Atlas Account:** Sign up for a free MongoDB Atlas account.
    -   **Deploy a Cluster:** Create a new project and deploy a free-tier cluster.
    -   **Configure Access:** Set up a database user with appropriate permissions and configure IP access to allow your development environment to connect.
    -   **Connect to the Cluster:** Obtain the connection string and integrate it into your backend application.

    *Reference:* [MongoDB Atlas Getting Started](https://www.mongodb.com/docs/atlas/getting-started/)

2.  **Backend Integration (Express.js):**

    -   **Install Dependencies:** Add necessary packages such as `passport`, `passport-google-oauth20`, and `passport-github2` to your Express.js application.
    -   **Configure Passport Strategies:**
        -   **Google Strategy:** Set up the Google OAuth strategy with your client ID and secret.
        -   **GitHub Strategy:** Set up the GitHub OAuth strategy similarly.
    -   **Define Routes:**
        -   **Auth Routes:** Create routes to handle authentication requests and callbacks for both Google and GitHub.
        -   **JWT Generation:** Upon successful authentication, generate a JWT for the user.
    -   **User Persistence:** Ensure that authenticated users are stored in your MongoDB database using Mongoose models.
3.  **Frontend Integration (Next.js with NextAuth.js v5):**

    -   **Install NextAuth.js:** Add `next-auth@beta` to your Next.js project.
    -   **Configure NextAuth.js:**
        -   **Providers:** Set up Google and GitHub providers with the respective client IDs and secrets.
        -   **Callbacks:** Handle JWT callbacks to include necessary user information.
    -   **Create Auth Pages:**
        -   **Sign-In Page:** Design a sign-in page that allows users to choose between Google and GitHub for authentication.
        -   **Protected Routes:** Implement middleware to protect routes and ensure only authenticated users can access certain pages.

    *Reference:* [Next.js Authentication with NextAuth.js v5](https://nextjs.org/learn/dashboard-app/adding-authentication)

4.  **Testing and Validation:**

    -   **End-to-End Testing:** Verify that users can authenticate using both Google and GitHub on the frontend and that the backend correctly processes these authentications.
    -   **JWT Verification:** Ensure that JWTs are properly generated, sent to the client, and verified on protected backend routes.
    -   **Database Consistency:** Confirm that user data is accurately stored and retrieved from your MongoDB Atlas cluster.

**Submission Requirements:**

-   **Code Repository:** Provide a link to a Git repository containing your updated backend and frontend code.
-   **Documentation:** Include a README file with setup instructions, detailing how to run both the backend and frontend applications, and any environment variables that need to be configured.
-   **Demo:** (Optional) Record a short video demonstrating the social authentication flow from the frontend to the backend, highlighting successful sign-ins with both Google and GitHub.

By completing this assignment, you'll gain practical experience in integrating third-party authentication providers into a full-stack application, managing user sessions with JWTs, and ensuring secure and efficient communication between the frontend and backend services.