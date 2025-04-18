// src/mock/users.js
const users = [];

for (let i = 1; i <= 50; i++) {
  users.push({
    email: `user${i}@test.com`,
    password: "123456", // Common test password
  });
}

export default users;