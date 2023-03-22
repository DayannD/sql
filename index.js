import * as mysql from "mysql2";
import { faker } from "@faker-js/faker";
import { Chambre } from "./class.js";}  

// Connect to the MySQL server
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "falsinize",
});

connection.connect((error) => {
  if (error) throw error;

  console.log("Connected to the MySQL server!");
});

const chaines_hotel = [];
for (let i = 0; i < 10; i++) {
  const id = i + 1;
  const nom = faker.company.name();
  const description = faker.lorem.paragraph();
  chaines_hotel.push([id, nom, description]);
}

// insertion des chaînes d'hôtel
let query =
  "INSERT INTO chainehotel (id_chaine_hotel,nom, description) VALUES ?";
connection.query(query, [chaines_hotel], (err, result) => {
  if (err) throw err;
});

// génération des hôtels
const string: hotels = [];
for (let i = 0; i < 100; i++) {
  const id = i + 1;
  const nom = faker.company.name();
  const description = faker.lorem.paragraph();
  const id_chaine_mere = faker.datatype.number({ min: 0, max: 6 });
  const nb_etoiles = faker.datatype.number({ min: 0, max: 6 });
  const region = faker.datatype.number({ min: 1, max: 10 });
  hotels.push([id, nom, id_chaine_mere, description, nb_etoiles, region]);
}

// insertion des hôtels
let sql =
  "INSERT INTO hotel (id_hotel,nom,id_chaine_mere, description, nb_etoile, id_region) VALUES ?";
connection.query(sql, [hotels], (err, result) => {
  if (err) throw err;
});

// Créer 100 chambres par hôtel
const  rooms = [];
hotels.forEach((hotel) => {
  for (let i = 0; i < 100; i++) {
    const room = new Room({
      number: faker.random.number(),
      description: faker.lorem.sentence(),
      price: faker.random.number({ min: 50, max: 200 }),
      hotel: hotel._id,
    });
    rooms.push(room);
  }
});

connection.end();
