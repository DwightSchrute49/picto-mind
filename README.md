# PictoMind

PictoMind is a SaaS AI image generator built with **React (Vite)** for the frontend and **Node.js (Express)** for the backend. It uses the ClipDrop API for generating images from text prompts and stores generated images in MongoDB.

---

## Features

- Generate AI images from text prompts
- View generated images
- Responsive React frontend
- Node.js/Express backend API
- MongoDB for image storage
- Secure API key management

---

## Project Structure

```
pictomind/
│
├── server/           # Node.js/Express backend
│   ├── index.js      # Main server file
│   ├── models/       # Mongoose models
│   └── ...           # Other backend files
│
├── src/              # React frontend source
│   ├── components/   # React components
│   ├── App.jsx       # Main React app
│   └── ...           # Other frontend files
│
├── .gitignore
├── package.json      # Frontend dependencies
├── README.md
└── ...
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud)
- [ClipDrop API Key](https://clipdrop.co/apis/text-to-image)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/DwightSchrute49/picto-mind.git
cd picto-mind
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```
MONGODB_URI=your_mongodb_connection_string
CLIPDROP_API_KEY=your_clipdrop_api_key
```

### 3. Frontend Setup

```bash
cd ..
npm install
```

### 4. Running the Application

#### Start the Backend Server

```bash
cd server
npm start
```
By default, the backend runs on [http://localhost:5000](http://localhost:5000).

#### Start the Frontend (React/Vite)

```bash
cd ..
npm run dev
```
By default, the frontend runs on [http://localhost:3000](http://localhost:3000).

---

## Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Enter a text prompt and generate an image.
3. View and manage generated images.

---

## Environment Variables

**Never commit your `.env` file or API keys to GitHub.**  
Your `.env` file should be listed in `.gitignore`.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License.

---
