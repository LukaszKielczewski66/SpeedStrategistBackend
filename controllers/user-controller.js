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

        try {
            const savedb = await user.save();
            res.send('zarejestrowano')
        } catch (e) {
            console.log(e);
            if (e.status === 409) {
                res.status(409).json({ message: 'Konflikt danych', errors: e.errors });
            }
            else if (e.errors.email.message) {
                res.status(408).json({ message: 'Walidacja email', errors: e.errors.email.message })
            }
            else {
                res.send(e);
            }
        }
    }

    async login(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                throw new Error('user not found');
            }
            
            console.log(`Req body pass: ${req.body.password}`);
            const isValidPassword = user.comparePassword(req.body.password);
            if (!isValidPassword) {
                throw new Error('Password not valid');
            }

            res.status(200).json({ apiToken: user.apiToken })
        } catch (e) {
            console.log(e);
            res.status(403);
        }
    }
}

module.exports = new UserController();