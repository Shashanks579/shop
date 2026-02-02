🖥️ RUIX - Full-Stack PC Builder Platform
RUIX is a modern, full-stack e-commerce application designed for tech enthusiasts to build their dream PCs. The platform features a high-end glassmorphism UI, a dynamic product catalog, a persistent shopping cart system, and a secure administrative backend for managing support requests and user registrations.

🚀 Live Demo
Frontend (Netlify): https://ruixpc.netlify.app

Backend (Render): https://brain-8evh.onrender.com

🛠️ Tech Stack
Frontend
HTML5 & CSS3: Custom styles featuring Glassmorphism and responsive layouts.

JavaScript (ES6+): Dynamic DOM manipulation for product rendering and cart management.

Local Storage: Persistent cart state management across page reloads.

Backend
Node.js & Express.js: RESTful API for handling form submissions and administrative data.

MongoDB Atlas: Multi-database cloud storage using Mongoose for data modeling.

CORS: Implemented for secure cross-origin communication between Netlify and Render.

✨ Key Features
🛒 Dynamic Shopping Experience
Product Catalog: Fetches and renders high-end components like the NVIDIA RTX 5090 and Intel i9-13900H dynamically.

Smart Cart: Real-time cart updates with "In Cart" button state tracking to prevent duplicate entries.

Persistence: Uses localStorage so users' selections remain even after closing the browser.

🔐 Secure Multi-Database Backend
Distributed Architecture: Implemented a two-database system in MongoDB Atlas:

RUIXDb (DB 1): Stores help requests and technical support tickets.

SIGnDb (DB 2): Manages user registration and sign-in data.

Admin Security: Protected administrative API routes using Header-based Authentication and Environment Variables (process.env) to hide sensitive Atlas credentials.

📂 Project Structure
├── brain/                # Backend (Hosted on Render)
│   ├── dataH.js          # Express server & MongoDB logic
│   ├── package.json      # Dependencies (Express, Mongoose, CORS)
│   └── .env              # Environment Variables (Local only)
├── style/                # CSS & UI Assets
├── index.html            # Home & Featured Products
├── products.html         # Full Component Catalog
├── cart.html             # Shopping Cart UI
├── help.html             # Support Request Form
├── admin.html            # Secure Admin Dashboard
└── script.js             # Frontend Logic & API Fetching

⚙️ Installation & Setup
Clone the Repository:
git clone https://github.com/Shashanka579/brain.git

Install Backend Dependencies:
cd brain
npm install

Environment Setup: Create a .env file in the brain/ directory and add your MongoDB Atlas URIs:
MONGO_URI_HELP=your_mongodb_atlas_uri_1
MONGO_URI_SIGN=your_mongodb_atlas_uri_2
ADMIN_PASSWORD=your_secret_admin_key

Run the Server:
node dataH.js
