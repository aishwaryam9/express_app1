const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// Get all Members
router.get('/', (req, res) => res.json(members)); https://locasndjsnd/users

// Get single member
router.get('/:id', (req, res) => {
    const member = members.filter(member => member.id === parseInt(req.params.id));
    
    if (member.length == 0) {
        res.status(400).json(`Member with id of ${ req.params.id } does not exist!!`);
    } else {
        res.json(member);
    }
});

// Create a member
router.post('/', (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json('Please enter name and email');
    }

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };

    members.push(newMember);

    return res.json(members);
});

// Update member
router.put('/:id', (req, res) => {
    const updMember = req.body;
    var updated = false;

    members.forEach(member => {
        if (member.id === parseInt(req.params.id)) {
            member.name = (updMember.name) ? updMember.name : member.name;
            member.email = (updMember.email) ? updMember.email : member.email;
            updated = true;

            return res.json(member);
        }
    });

    if (!updated){
        return res.status(400).json(`Member with id of ${ req.params.id } does not exist!!`);
    }
});

// Delete single member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if (!found) {
        return res.status(400).json(`Member with id of ${ req.params.id } does not exist!!`);
    } else {
        res.json(members.filter(member => member.id !== parseInt(req.params.id)));
    }
});

module.exports = router;
