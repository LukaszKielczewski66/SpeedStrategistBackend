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
                res.status(406).json("User not found");
                throw new Error('user not found');
            }
            
            const isValidPassword = user.comparePassword(req.body.password);
            if (!isValidPassword) {
                res.status(405).json("Password not valid");
                throw new Error('Password not valid');
            }

            res.status(200).json({ apiToken: user.apiToken })
        } catch (e) {
            console.log(e);
            res.status(403);
        }
    }

    async getUserData(req, res) {
        try {
            const apiToken = req.header('Authorization').replace('Bearer ', '');
            const user = await User.findOne({ apiToken });
            console.log('apiToken: ', req.header('Authorization'));

            if (!user) {
                res.status(401).json({ error: "Invalid apiToken" });
            }

            res.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName,
                icon: user.icon,
                car: user.car,
                model: user.model,
                name: user.name
            })

        } catch (e) {
            console.log(e);
            // res.status(500).json({ error: 'Server error' });
        }
    }

    async updateUserData(req, res) {
        const apiToken = req.header('Authorization').replace('Bearer ', '');
            const user = await User.findOne({ apiToken });
            console.log('apiToken: ', req.header('Authorization'));

            if (!user) {
                res.status(401).json({ error: "Invalid apiToken" });
            }

            try {
                const updateFields = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    car: req.body.car,
                    model: req.body.model,
                    name: req.body.name,
                  };

                  const result = await User.updateOne({ apiToken }, { $set: updateFields })
                  
                  console.log(`result.modifiedCount: ${result.modifiedCount}`)

                  if (result.modifiedCount === 1) {
                    res.status(200).json('Zapisano ustawienia');
                  } else {
                    res.status(200).json('Brak zmian do zapisania!');
                  }

            } catch (e) {
                console.log(e);
            }
    }

    async changeUserPassword(req, res) {
       try {
        const apiToken = req.header('Authorization').replace('Bearer ', '');
        const user = await User.findOne({ apiToken });
        console.log('apiToken: ', req.header('Authorization'));

         if (!user) {
            res.status(401).json({ error: "Invalid apiToken" });
        }
        console.log('REQ BODY', req.body.oldPassword)
        const isValidPassword = user.comparePassword(req.body.oldPassword);
            
        if (!isValidPassword) {
            res.status(405).json("Password not valid");
            throw new Error('Password not valid');
        }

        const newPassword = req.body.newPassword;
        user.password = newPassword;

        const result = await user.save();

        if (result) {
            res.status(200).json('Password change successfully')
        }
       } catch (e) {
             console.log(e)
       }
    }

    async getUserIcon(req, res) {
        try {
            const apiToken = req.header('Authorization').replace('Bearer ', '');
            const user = await User.findOne({ apiToken });

            if (!user) {
                res.status(401).json({ error: "Invalid apiToken" });
            }

            const icon = user.icon;
            console.log(icon);
            res.status(200).json({ icon });
        } catch(e) {
            console.log(e)
        }
    }

    async changeUserIcon(req, res) {
        try {
            const apiToken = req.header('Authorization').replace('Bearer ', '');
            const user = await User.findOne({ apiToken });

            if (!user) {
                res.status(401).json({ error: "Invalid apiToken" });
            }

            console.log(req.body.iconLink);

            user.icon = req.body.iconLink;
            const result = await user.save();

            if (result) {
                res.status(200).json('Ikona zmieniona pomyślnie')
            }
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new UserController();