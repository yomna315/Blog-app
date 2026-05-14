# 📌 Posts App

A simple full-stack (or frontend-focused) application that allows users to register, log in, and create posts with images. Built to demonstrate CRUD operations, authentication flow, and UI structuring.

## 🚀 Features

### 🏠 Home Page

- Responsive **Navbar**
- Display a list of posts, each including:
  - 🖼️ Image
  - 📝 Title
  - 📄 Description
  - ✍️ Author name

- Header contains a link to **Login/Register**
- After login:
  - Displays: **Hi {user.name}**
  - Shows a **floating "Add Post" button**

---

### 🔐 Authentication (Login/Register)

- Users can:
  - Register a new account
  - Log in with existing credentials

- After authentication:
  - Redirect to Home Page
  - Update UI with user greeting

---

### ➕ Add Post

- Logged-in users can create posts using a form:
  - Title
  - Description
  - Image URL

---

### ✏️ Edit & 🗑️ Delete Posts

- Users can manage **their own posts only**
  - ✏️ Edit → Opens form in edit mode
  - 🗑️ Remove → Deletes the post

---

## 🧠 Tech Stack

- Frontend:
  - React.js
  - Tailwind CSS / DaisyUI (optional)

- Backend (optional):
  - JSON Server + Authentication

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/posts-app.git

# Navigate to the project folder
cd Blog-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## ⚙️ Backend Setup (Optional)

You can use a fake backend for quick development:

- Use **json-server-auth** to simulate authentication and API
- Run server:

```bash
npx json-server-auth db.json --port 3000
```

---

## 📌 Rules

- ✅ Submit **GitHub repository link only**
- ❌ Do NOT submit ZIP files
- ⏰ Deadline: **15 May (end of day)**

---

## 💡 Hints

- Focus on clean UI and user experience
- Use component-based structure
- Handle authentication state properly
- Protect routes if needed

---

## ⭐ Bonus Features (Optional)

- 📷 Use an image hosting service (instead of image URL)
  _(Note: Cloudinary is NOT allowed)_
- 🌐 Deploy the app using platforms like:
  - Vercel

- 🔗 Deploy backend separately if needed

---

## 📷 Screenshots (Optional)

_Add screenshots of your app here_

---

## 👩‍💻 Author

Yomna Ayman
GitHub: [https://github.com/yomna315]
