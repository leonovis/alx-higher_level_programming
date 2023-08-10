#!/usr/bin/node

const request = require('request');

const apiUrl = process.argv[2];

request.get(apiUrl, { json: true }, (error, response, tasksData) => {
  if (error) {
    console.error(error);
    return;
  }

  // Initialize an object to keep track of completed tasks for each user ID
  const completedTasksByUserId = {};

  // Loop through each task to count completed tasks for each user ID
  tasksData.forEach((task) => {
    if (task.completed) {
      if (!completedTasksByUserId[task.userId]) {
        completedTasksByUserId[task.userId] = 1;
      } else {
        completedTasksByUserId[task.userId]++;
      }
    }
  });

  console.log(completedTasksByUserId);
});
