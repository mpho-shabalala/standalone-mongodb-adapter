
# 🧩 MongoDB Application Layer Adapter

This is a **modular, backend-agnostic MongoDB adapter** that handles database connection, models, and reusable logic—so you can plug it into any Node.js backend with minimal friction.

---

## 📦 Prerequisites

- Node.js (v14+)
- MongoDB Atlas account *(or local MongoDB installed)*
- A Node.js backend (e.g. Express/Fastify) that will consume this adapter

---

## 🧠 Architecture & Control Flow

This adapter cleanly separates **data logic from business logic**, offering a plug-and-play system for:
- Schemas & Models
- Pre/Post Save Hooks
- Populate Strategies (like joins)
- DB Services per model (CRUD wrappers)
- Optional Reusable Utils (e.g., pagination, soft delete)

```
Your Backend      ⟶    MongoDB Adapter       ⟶     MongoDB
(app.js, routes)        (models/services)           (Atlas/local)

Controllers      ⟶     userService         ⟶     Mongoose Model
                        populateStrategies
                        validation hooks
```

---

## 📁 Folder Structure

```
db-adapter/
├── config/
│   └── db.js                  # MongoDB connection logic
├── dbServices/
│   └── user.service.js        # User-specific CRUD logic
├── dbUtils/
│   ├── hooks.js               # Mongoose pre/post logic
│   ├── modelMethods.js        # Reusable instance/static methods
│   └── populateStrategies.js  # Populate config strategies
├── models/
│   └── user.js                # User schema definition
├── loadModels.js              # Auto-load all models on startup
├── index.js                   # Entry point (exports all functionality)
├── .env.example               # Sample environment file
└── README.md
```

---

## ⚙️ How to Integrate Into a Backend

1. **Install Dependencies**

```bash
npm install mongoose dotenv
```

2. **Use the Adapter in Your Backend**

```js
// server.js
require('dotenv').config();
const { connectDB, loadModels } = require('./db-adapter');
const app = require('./app');

const startServer = async () => {
  await connectDB(process.env.MONGODB_URI);
  loadModels();

  app.listen(process.env.PORT || 5000, () => {
    console.log(`✅ Server running...`);
  });
};

startServer();
```

3. **Call Services from Your Controllers**

```js
const { userService } = require('./db-adapter');

app.get('/users', async (req, res) => {
  const users = await userService.getAllUsers();
  res.json({ status: 'success', data: users });
});
```

---

## 🛠️ Extension Points

You can expand the adapter in the following ways:

### 🔧 Add Models
- Define new schemas in `/models/`
- Mirror with a service in `/dbServices/`

### 🔁 Populate & Join Data
- Use `populateStrategies.js` to define one-to-many/many-to-one relationships
- Reference related models using Mongoose `ref` inside schemas

### 🔍 Validation & Middleware
- Add pre-save logic in `hooks.js`
- Attach reusable validation/transform logic via `modelMethods.js`

---

## 📝 Environment Variables

Use a `.env` file in your main backend project:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<db>?retryWrites=true&w=majority
```

---

## 🚧 Future Enhancements

- [ ] Add factory utilities for pagination, filters, and soft deletes
- [ ] Schema generation CLI
- [ ] Tests & mock DB setup

---

## 🧪 Testing the Adapter

Create a quick test file in your backend to check if it's working:

```js
const { connectDB, loadModels, userService } = require('./db-adapter');

(async () => {
  await connectDB(process.env.MONGODB_URI);
  loadModels();
  const users = await userService.getAllUsers();
  console.log(users);
})();
```

---

## 🧠 Design Philosophy

This adapter was created to solve the real-world problem of tightly-coupled data access logic in backend systems. By abstracting model-level concerns away from the app, it makes your backend lighter, cleaner, and easier to test or scale.

- ✅ Low-coupling, high-cohesion
- ✅ Separation of concerns
- ✅ Extensible, not opinionated

---

## 📬 Feedback & Contributions

If you have ideas or improvements, feel free to open an issue or pull request. Built for curious engineers who value **clarity, adaptability, and structure**.
