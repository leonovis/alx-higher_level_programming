#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];
const url = `https://swapi.dev/api/films/${movieId}/`;

request.get(url, { json: true }, (error, response, data) => {
  if (error) {
    console.error(error);
    return;
  }

  const characters = data.characters;
  const characterNames = [];
  const characterUrls = [...characters]; // Copy the array to preserve the order

  // Function to fetch character data and push the name in the correct order
  function fetchCharacterData () {
    const characterUrl = characterUrls.shift();
    if (!characterUrl) {
      // All characters processed, print the names
      console.log(characterNames.join('\n'));
      return;
    }

    request.get(characterUrl, { json: true }, (error, response, characterData) => {
      if (error) {
        console.error(error);
      } else {
        characterNames.push(characterData.name);
      }

      // Fetch the next character's data
      fetchCharacterData();
    });
  }

  // Start fetching character data
  fetchCharacterData();
});
