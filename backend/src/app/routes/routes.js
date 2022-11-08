const pool = require('../../config/app');

const router = app => {

    // users

    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    app.get('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    app.post('/users', (req, res) => {
        firstname = req.body.name,
            email = req.body.email,
            password = req.body.password,
            created_at = req.body.created_at,
            updated_at = req.body.updated_at

        let sql = 'INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?)';

        pool.query(sql, [firstname, email, password, created_at, updated_at], (error) => {
            if (!error)
                res.send("User successfully added");
            else
                console.log(error);
        });
    });

    app.put('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send('User successfuly deleted.');
        });
    });



    // auth

    app.post('/sign-in', (req, res) => {

    });
    app.post('/token', (req, res) => {

    });
}

module.exports = router;