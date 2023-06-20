//=======[ Settings, Imports & Data ]==========================================
var PORT    = 3000;
var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));


//=======[ Main module code ]==================================================
//Obtener dispositivos
app.get('/devices/', function(req, res, next) { 
    utils.query('SELECT * FROM Devices', function(err, response, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(JSON.stringify(response)).status(200);
    });
});

//Obtener ID de dispositivos
app.get('/devices/:id', function(req, res, next) { 
    utils.query('SELECT * FROM Devices WHERE id = ?', req.params.id,
        function(err, response, field) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(JSON.stringify(response)).status(200);
        }
    );
});

//Actualizar los dispositivos
app.put('/devices/state/:id', function(req, res, next) {
    utils.query('UPDATE `Devices` SET `state` = ? WHERE `id` = ?', 
    [req.body.state, req.params.id], function(err, response, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send({'changedRows': response.changedRows}).status(200);
    });
});

//Agregar dispositivos
app.put('/devices/:id', function(req, res, next) { 
    utils.query('UPDATE `Devices` SET `name` = ?, `description` = ? , `type` = ? WHERE `id` = ?', 
    [req.body.name, req.body.description, req.body.type, req.params.id], function(err, response, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send({'changedRows': response.changedRows}).status(200);
    });
});

app.post('/devices/', function(req, res, next) {
    const { name, description, state, type, user_id } = req.body;
  
    const query = 'INSERT INTO `Devices` (`name`, `description`, `state`, `type`, `user_id`) VALUES (?, ?, ?, ?, ?)';
  
    utils.query(query, [name, description, state, type, user_id], function(err, response, field) {
      if (err) {
        res.send(err).status(400);
        return;
      }
      res.send({ 'id': response.insertId }).status(201);
    });
  });

//Borrar dispositivos
app.delete('/devices/:id', function(req, res, next) { 
    utils.query('DELETE FROM Devices WHERE id = ?',req.params.id,
        function(err, response, field) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send("deleted").status(200);
        }
    );
});

//Login
app.post('/login', (req, res, next) => {
    const { email, password } = req.body;
  
    utils.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], function(err, response, field) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        if (response.length === 0) {
            res.status(401).send('Error');
            return;
        } 
        res.status(200).send('OK');
    });
});

// Obtener user_id --- pendiente implementacion
app.get('/user_id', (req, res) => {
  const { email } = req.body;

  utils.query('SELECT id FROM Users WHERE email = ?', [email], function(err, response, field) {
    if (err) {
      res.status(400).send(err);
      return;
    }
    if (response.length === 0) {
      res.status(401).send('Error');
      return;
    }

    const user_id = response[0].id;

    res.status(200).json({ user_id });
  });
});
  

//Agregar usuario --- pendiente implementacion
app.post('/register', (req, res) => {
    const { email, password } = req.body;
  
    utils.query('INSERT INTO Users (email, password) VALUES (?, ?)', [email, password], function(err, response, field) {
      if (err) {
        res.send(err).status(400);
        return;
      }
      res.send("user registered").status(201);
    });
  });

//Borrar usuario --- pendiente implementacion
app.delete('/Users/:id', (req, res) => {
    const userId = req.params.id;
  
    utils.query('DELETE FROM Users WHERE id = ?', userId, function(err, response, field) {
      if (err) {
        res.send(err).status(400);
        return;
      }
      res.send("user deleted").status(200);
    });
  });

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});
//=======[ End of file ]================================================
