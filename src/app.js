const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // const { title, url, techs } = request.query;

  // const result = { title, url, techs };

  return response.status(201).json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (findRepositoryIndex === -1) {
    return response.status(400).json({ error: 'Repositório inexistente' });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findRepositoryIndex].likes,
  };

  repositories[findRepositoryIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (findRepositoryIndex >= 0) {
    repositories.splice(findRepositoryIndex, 1);
  } else {
    return response.status(400).json({ error: 'Este repositório não existe.' });
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (findRepositoryIndex === -1) {
    return response.status(400).json({ error: 'Repositório inexistente' });
  }

  repositories[findRepositoryIndex].likes++;

  return response.json(repositories[findRepositoryIndex]);
});

module.exports = app;
