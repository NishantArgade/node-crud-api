const express = require("express");
const app = express();
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 3000;

// In-memory database
let users = [];

app.use(express.json());

// GET all users
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// GET user by ID
app.get("/api/users/:userId", (req, res) => {
  const userId = req.params.userId;

  if (!isValidUUID(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
});

// POST create user
app.post("/api/user", (req, res) => {
  const { username, age, hobbies } = req.body;

  if (!username || !age) {
    return res
      .status(400)
      .json({ error: "Username and age are required fields" });
  }

  const newUser = {
    id: uuidv4(),
    username,
    age,
    hobbies: hobbies || [],
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

// PUT update user by ID
app.put("/api/users/:userId", (req, res) => {
  const userId = req.params.userId;

  if (!isValidUUID(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const { username, age, hobbies } = req.body;

  users[userIndex] = {
    ...users[userIndex],
    username: username || users[userIndex].username,
    age: age || users[userIndex].age,
    hobbies: hobbies || users[userIndex].hobbies,
  };

  res.status(200).json(users[userIndex]);
});

// DELETE user by ID
app.delete("/api/users/:userId", (req, res) => {
  const userId = req.params.userId;

  if (!isValidUUID(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1);

  res.status(204).send("User Deleted Successfully");
});

// Handle non-existing endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Handle server-side errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Helper function to validate UUID
function isValidUUID(uuid) {
  return uuid.match(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  );
}
