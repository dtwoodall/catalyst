const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');
const path = require('path');
const bodyParser = require('body-parser');

const sequelize = new Sequelize('postgres://postgres:Pg11235!@localhost:5432/scheduler');

const formats = {
  COLOR: {
    is: /^#([0-9A-F]{3}|[0-9A-F]{6})$/
  }
}

const Category = sequelize.define('category', {
  name: Sequelize.STRING,
  color: {
    type: Sequelize.STRING,
    validate: formats.COLOR
  }
});

const Task = sequelize.define('task', {
  summary: Sequelize.STRING,
  description: Sequelize.TEXT
});

Task.belongsTo(Category);
Category.hasMany(Task);

Task.belongsTo(Task, {as: 'parent'});
Task.hasMany(Task, {as: 'subtasks', foreignKey: 'parentId'});

sequelize.sync();

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.log(`Unable to connect to the database:  ${err}`);
});

const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.options('*', cors());

app.get('/tasks', (req, res) => {

  Task.findAll({
    attributes: ['id', 'summary', 'description', 'parentId'],
    include: [{
      model: Category,
      attributes: ['id', 'name', 'color']
    }]
  }).then(tasks => res.json(tasks));

});

app.get('/tasks/:taskId', (req, res) => {

  Task.findOne({
    attributes: ['id', 'summary', 'description', 'parentId'],
    where: {
      id: req.params.taskId
    },
    include: [
      {
        model: Category,
        attributes: ['id', 'name', 'color']
      }, {
        model: Task,
        as: 'subtasks',
        attributes: ['id', 'summary', 'description', 'parentId']
      }
    ]
  }).then(task => res.json(task));

});

app.post('/tasks', (req, res) => {

  const {summary, description, parentId} = req.body;

  Task.create({summary, description, parentId}).then(newTask => {
    return res.json(newTask);
  }).catch(err => console.log(err));

});

app.post('/tasks/:taskId', (req, res) => {

  const {summary, description} = req.body;

  return Task.findOne({
    attributes: ['id', 'summary', 'description', 'parentId'],
    where: {
      id: req.params.taskId
    },
    include: [
      {
        model: Category,
        attributes: ['id', 'name', 'color']
      }, {
        model: Task,
        as: 'subtasks',
        attributes: ['id', 'summary', 'description', 'parentId']
      }
    ]
  }).then(task => {
    return task.update({summary, description}).then(updatedTask => {
      return res.json(updatedTask);
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));

});

app.get('/categories', (req, res) => {

  Category.findAll({
    attributes: ['id', 'name', 'color']
  }).then(categories => res.json(categories));

});

app.get('/categories/:categoryId', (req, res) => {

  Category.findOne({
    attributes: ['id', 'name', 'color'],
    where: {
      id: req.params.categoryId
    },
    include: [
      {
        model: Task,
        attributes: ['id', 'summary', 'description'],
        where: {
          parentId: null
        }
      }
    ]
  }).then(task => res.json(task));

});

app.post('/categories', (req, res) => {

  const {name, color} = req.body;

  Category.create({name, color}).then(newCategory => {
    return res.json(newCategory);
  }).catch(err => console.log(err));

});

app.get('/*', (req, res) => {
  return res.send('Content not found! Check your url.');
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Scheduler listening on ${port}`);