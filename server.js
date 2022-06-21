const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express(); //declared so we can chain on express methods
const { animals } = require("./data/animals");

function filterByQuery(query, animalsArray) {
  let personailityTraitsArray = [];
  let filteredResults = animalsArray;
  //personailtyTraits handled differently due to multiple traits per animal
  if (query.personaliyTraits) {
    if (typeof query.personaliyTraits === "string") {
      personailityTraitsArray = [query.personaliyTraits];
    } else {
      personailityTraitsArray = query.personailityTraits;
    }
    personailityTraitsArray.forEach((trait) => {
      filteredResults = filteredResults.filter(
        (animal) => animal.personailityTraits.indexOf(trait) !== -1
      );
    });
  }
  //diet, species, and name handling
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
}

//get method, 2 arguments, the route the client uses to fetch and callback function
app.get("/api/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

//listen method,2 arguments, port # and callback function
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
