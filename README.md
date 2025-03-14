
# **ExpTracker – A MERN + GraphQL Expense Tracker**  

ExpTracker is a full-stack expense tracking application built using the **MERN (MongoDB, Express.js, React.js, Node.js) stack** with **Apollo GraphQL** for efficient data handling. It allows users to manage their expenses, track transactions, and analyze financial trends with seamless authentication and a modern UI.

---

## **🚀 Features & Tech Stack**  

### 🌟 **MERN Stack (MongoDB, Express.js, React.js, Node.js) + Apollo GraphQL**  
ExpTracker leverages the **MERN** stack for a seamless full-stack experience. **GraphQL with Apollo Server** ensures optimized data fetching, reducing over-fetching and under-fetching of data.  

### 📝 **GraphQL Type Definitions & Resolvers**  
- **Type Definitions**: Define the schema structure, including transaction types, user types, and relationships.  
- **Resolvers**: Handle queries and mutations, defining how data is retrieved and modified in the GraphQL API.  

### 🔄 **GraphQL Mutations & Graph Relations**  
- **Mutations** allow users to add, update, or delete expenses and transactions dynamically.  
- **GraphQL Relations** establish connections between users, transactions, and categories, ensuring a structured data model.  

### 🎃 **Authentication with Passport.js & MongoDB Session Store**  
- **User authentication** is implemented using **Passport.js**, ensuring secure login with session management.  
- **MongoDB Session Store** maintains user sessions, providing persistent authentication without requiring token storage in local storage.  

### 🚀 **Global State Management with Apollo Client**  
- **Apollo Client** handles **global state management**, caching GraphQL queries for optimized performance.  
- Reduces redundant API calls by utilizing **Apollo Cache**, making the UI more responsive.  

### 🐞 **Error Handling on Server & Client**  
- **Server-side error handling**: Ensures proper responses for failed queries and mutations.  
- **Client-side error handling**: Displays meaningful error messages to users using Apollo Client’s built-in error handling mechanisms.  

### ⭐ **Easy Deployment with Render**  
- The backend and frontend are **seamlessly deployed on Render**, making the project accessible with minimal configuration.  
- CI/CD ensures automatic deployment upon new commits.  

### 👾 **Cron Jobs for Scheduled Tasks & Automation**  
- **Automated tasks** like clearing expired sessions and running analytics reports are handled using **Node.js cron jobs**.  
- Helps keep the system optimized without manual intervention.  

### ⏳ **And Much More!**  
- Fully responsive **React.js UI** built with modern design principles.  
- **JWT-based authentication** for better security (optional).  
- **Role-based access control (RBAC)** to differentiate user permissions (future enhancement).

- DEPLOYMENT : https://expense-tracker-1ucl.onrender.com
