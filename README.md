## CampLife
Clone of [Hipcamp](https://www.hipcamp.com/en-US).

## Heroku Live Link
[CampLife](https://camplife1.herokuapp.com/)

## Visuals

![image](https://user-images.githubusercontent.com/88516795/158239709-9f44b699-7a4f-45f5-b862-84bbabf8fbc5.png)
![image](https://user-images.githubusercontent.com/88516795/158239772-dfaeb9e8-0b85-431f-868f-2c37a4142e13.png)
![image](https://user-images.githubusercontent.com/88516795/158239811-cb2fcc28-d6ed-4570-a686-ffaf105af8d7.png)


### Index
| [MVP Features List](https://github.com/annvilla1998/campLife/wiki/MVP-List) | [Database Schema](https://github.com/annvilla1998/campLife/wiki/DataBase-Schema) | [API Documentation](https://github.com/annvilla1998/campLife/wiki/Backend-API-Routes) | [Frontend Routes](https://github.com/annvilla1998/campLife/wiki/Frontend-Routes)

### Technologies Used
- Javascript
- React
- Redux
- Node
- Express
- Postgres
- VS Code
- CSS
- HTML

### Getting Started
1. Clone this repo. 
    - `git clone https://github.com/annvilla1998/campLife.git`
2. Install dependencies from the root directory.
    - npm install
3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL
    - CREATE USER <name> WITH CREATEDB PASSWORD <'password'>
4. Create a .env file in the backend directory based on the .env.example.
5. Enter your username and password information into the .env file and replace fillers with database name, desired JWT_SECRET, and desired PORT.
6. Add a proxy to your package.json file within frontend directory with desired port from .env file:
    - `"proxy": "https://localhost:5000"`
7. Create database, migrate, and seed by running the following commands:
    - `npx dotenv sequelize db:create`
    - `npx dotenv sequelize db:migrate`
    - `npx dotenv sequelize db:seed:all`
8. Run the application by running "npm start" in both backend and frontend directories.
  
  
### Features
  Logged in users can:
   - Create/Read/Update/Delete Campsites
   - Create/Read/Update/Delete Reviews
