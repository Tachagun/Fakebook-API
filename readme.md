# ` CC20-Fakebook-API `

### `env guide`

```
PORT=8899
DATABASE_URL=***
JWT_SECRET=***
```
---

### `service`

| 📍 **Path**            | 🔁 **Method** | 🔒 **Auth** | 🧩 **Params** | 🔎 **Query** | 📨 **Body**                                                   |
|:-----------------------|:-------------|:-----------:|:--------------|:-------------|:--------------------------------------------------------------|
| `/api/auth/login`      | POST         | –           | –             | –            | `{ identity, password }`                                      |
| `/api/auth/register`   | POST         | –           | –             | –            | `{ identity, firstName, lastName, password, confirmPassword }` |
| `/api/auth/me`         | GET          | ✅          | –             | –            | –                                                              |
| `/api/post`            | GET          | ✅          | –             | –            | –                                                              |
| `/api/post`            | POST         | ✅          | –             | –            | `{ message, image(file) }`                                    |
| `/api/post`            | PUT          | ✅          | `:id`         | –            | `{ message, image(file) }`                                    |
| `/api/post`            | DELETE       | ✅          | `:id`         | –            | –                                                              |
| `/api/comment`         | POST         | ✅          | –             | –            | `{ message, postId }`                                         |
| `/api/like`            | POST         | ✅          | –             | –            | `{ postId }`                                                  |
| `/api/like`            | DELETE       | ✅          | `:id`         | –            | –                                                              |

---

### `Notes`