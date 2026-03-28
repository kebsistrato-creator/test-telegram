# NestJS Project

### Features to Implement

- **Swagger Documentation**: Set up Swagger for API documentation.
- **Authentication**:
  - Use JWT for authentication mechanism.
  - Create login and registration endpoints.
  - Allow user roles: `Admin`, `Client`.
  - Restrict most endpoints to `Admin`, except:
    - `GET /me` for connected user.
    - `POST /login` and `POST /register` are open for unauthenticated access.
- **Database**:
  - Use SQLite as the database.
  - Implement user model.
- **User Management**:
  - Create CRUD endpoints for users in a separate module.

### Tasks

1. **Swagger Integration**:
   - Install dependencies.
   - Configure main.ts to enable Swagger.
2. **Auth Module**:
   - Create auth controller and service.
   - Add login and register endpoints.
   - Use JWT-based authentication.
3. **User Module**:
   - Set up SQLite for user data.
   - Add roles to user model.
   - Create CRUD operations.

### Access Control

- Only `GET /me`, `POST /login`, and `POST /register` can be accessed by any authenticated user.
- Other endpoints are restricted to `Admin` role. 

---
Will follow by implementing these features in this project.
