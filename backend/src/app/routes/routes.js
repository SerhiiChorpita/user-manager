const mongoose = require('mongoose');

const { UserSchema } = require('../../../models/user');

const User = mongoose.model('User', UserSchema);;

const router = app => {

    // MONGO DB

    app.get('/mon/users', (request, response) => {
        User.find({ showCustomData: false }, (error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

    app.get('/mon/users/:id', (request, response) => {
        User.findById(request.params.id)
            .then(doc => {
                if (!doc) return response.status(404).end();
                return response.status(200).json(doc);
            })
            .catch(err => console.log(err));
    });

    app.put('/mon/users/:id', (request, response) => {
        var conditions = { _id: request.params.id };
        console.log(request.body);
        console.log(conditions);
        User.updateOne(conditions, request.body)
            .then(doc => {
                if (!doc) return response.status(404).end();
                return response.status(200).json(doc);
            })
            .catch(err => console.log(err));
    })


    app.delete('/mon/users/:id', (request, response) => {
        User.findByIdAndRemove(request.params.id)
            .exec()
            .then(doc => {
                if (!doc) return response.status(404).end();
                return response.status(200).json(doc);
            })
            .catch(err => next(err));
    });

}


module.exports = router;