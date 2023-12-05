class UserController {
    async register(req, res) {
        try {
            console.log('register method');
            res.send('rejestracja');
            // save to db
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