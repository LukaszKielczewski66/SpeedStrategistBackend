const User = require('../db/models/user')

class UserController {
    async register(req, res) {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: "",
            icon: "",
            car: "",
            model: "",
            name: "",
            apiToken: ""
        })
        console.log(user)

        try {
            const savedb = await user.save();
            console.log(savedb);
            res.send('zarejestrowano')
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }

    async login(req, res) {
        try {
            console.log('login method');
            res.send('logowanie');
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    }
}

module.exports = new UserController();