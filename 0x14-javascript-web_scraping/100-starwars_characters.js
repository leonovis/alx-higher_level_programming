#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];
const url = `https://swapi.dev/api/films/${movieId}/`;

request.get(url, { json: true }, (error, response, data) => {
  if (error) {
    console.error(error);
    return;
  }

  const charactersUrls = data.characters;

  // Function to fetch character data and print their names
  function fetchCharacterName (characterUrl) {
    request.get(characterUrl, { json: true }, (error, response, characterData) => {
      if (error) {
        console.error(error);
      } else {
        console.log(characterData.name);
      }

      // Fetch the next character's name until all characters are printed
      const nextCharacterUrl = charactersUrls.shift();
      if (nextCharacterUrl) {
        fetchCharacterName(nextCharacterUrl);
      }
    });
  }

  // Start fetching character names
  fetchCharacterName(charactersUrls.shift());
});
