📸 Social Media Web Application (Instagram Demo)

A full-stack social media web application inspired by Instagram, built with modern technologies.
This demo project allows users to share photos and videos, interact with posts, and manage their personal profiles.

🚀 Features

🔐 User registration & authentication (JWT)

📷 Photo sharing

🎥 Video sharing

❤️ Like posts

💬 Comment on posts

👥 Follow & unfollow users

👤 Update profile photo and bio

🧾 View user profiles

🗑️ Delete account

🔒 Secure password handling with bcrypt

☁️ Media storage using AWS S3

🛠️ Tech Stack
🎨 Frontend

React

Material UI

CSS

React Bits

TypeScript (partially)

React Icons

Axios

Redux

React Toastify

React Router DOM

⚙️ Backend

Node.js

Express.js

MongoDB

Mongoose

JWT (JSON Web Token)

bcrypt

AWS S3

Nodemon

🔗 API

RESTful API architecture

📂 Project Structure
SocialMedia/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/yourUsername/social-media-app.git
cd social-media-app

2️⃣ Backend setup
cd backend
npm install
npm run dev

3️⃣ Frontend setup
cd frontend
npm install
npm start

🔐 Environment Variables (.env)

Create a .env file in the backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_bucket_name

🧠 Technical Notes

Built with RESTful API architecture

Authentication & authorization handled using JWT

Media files are stored on AWS S3

Global state management implemented with Redux

Component-based and scalable frontend architecture

📌 Planned Features

🔔 Notification system

💬 Real-time messaging (Socket.io)

🌓 Dark mode

📊 Profile analytics

🔍 User search

👤 Developer

Emir Şakarcan
GitHub: https://github.com/emirsakarcan

📄 License

This project was developed for educational and demo purposes.
