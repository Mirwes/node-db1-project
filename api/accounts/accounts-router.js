const express = require('express');

// database access using knex
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts').then(accounts => {
        res.status(200).json(accounts);
    }).catch(err => {
        res.status(500).json({ message: 'Something went wrong.' });
    })
});


router.get('/:id', (req, res) => {
    getByID(req.params.id).then(accounts => {
        res.status(201).json(accounts[0]);
    }).catch(err => {
        res.status(500).json({ error: 'Something went wrong.' });
    });
});

router.post('/', (req, res) => {
    db('accounts').insert(req.body).then(ids => {
        getByID(ids[0]).then(accounts => {
            res.status(201).json(accounts[0]);
        }).catch(err => {
            res.status(500).json({ error: 'Something went wrong.' });
        });
    }).catch(err => {
        res.status(500).json({ message: 'Something went wrong.' });
    })
});

router.put('/:id', (req, res) => {
    db('accounts').where({ id: req.params.id }).update(req.body).then(numChanged => {
        getByID(req.params.id).then(accounts => {
            res.status(200).json(accounts[0]);
        }).catch(err => {
            res.status(500).json({ error: 'Something went wrong.' });
        });
    }).catch(err => {
        res.status(500).json({ error: 'Something went wrong.' });
    });
});

router.delete('/:id', (req, res) => {
    let deletedAccount;

    getByID(req.params.id).then(accounts => {
        deletedAccount = accounts[0];
    }).catch(err => {
        res.status(500).json({ error: 'Something went wrong.' });
    });

    db('accounts').where({ id: req.params.id }).del().then(numDeleted => {
        res.status(200).json(deletedAccount);
    }).catch(err => {
        res.status(500).json({ error: 'Something went wrong.' });
    });
});

function getByID(id) {
    return db('accounts').where({ id: id });
}

module.exports = router;




















// const router = require('express').Router()

// router.get('/', async (req, res, next) => {
//   // DO YOUR MAGIC
// })

// router.get('/:id', (req, res, next) => {
//   // DO YOUR MAGIC
// })

// router.post('/', (req, res, next) => {
//   // DO YOUR MAGIC
// })

// router.put('/:id', (req, res, next) => {
//   // DO YOUR MAGIC
// });

// router.delete('/:id', (req, res, next) => {
//   // DO YOUR MAGIC
// })

// router.use((err, req, res, next) => { // eslint-disable-line
//   // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
//   res.status(500).json({
//     message: 'something went wrong inside the accounts router',
//     errMessage: err.message,
//   })
// })

// module.exports = router;



















