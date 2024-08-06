## CampLife
Clone of [Hipcamp](https://www.hipcamp.com/en-US).

## Render Live Link
[CampLife](https://camplife-1879b310f9cb.herokuapp.com/)

## Visuals

![image](https://user-images.githubusercontent.com/88516795/169902042-98a7079a-fba9-4297-889e-3a5f4321769f.png)
![image](https://user-images.githubusercontent.com/88516795/169902102-2ce95f86-5c58-417d-8646-d079b16a0c61.png)
![image](https://user-images.githubusercontent.com/88516795/169902151-bbe1a672-5813-40d0-b3ae-15b53ffeb8ed.png)
![image](https://user-images.githubusercontent.com/88516795/169902206-9c0718fb-2e64-4af1-8acb-6c88d801e2a4.png)
![image](https://user-images.githubusercontent.com/88516795/169902288-534febb1-dd6f-4ca0-bcb8-00c6bc934201.png)



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
   - Create/Read Trips
   
