const Route = require('../db/models/route');

class RouteController {
    async getAllRoutes(req, res) {
        try {
            const routes = await Route.find();

            if (routes) {
                res.json({ routes })
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'server error' });
        }
    }

    async getUserRoutes(req, res) {
        try {
            const email = req.body.email;

            const routes = await Route.find({ author: email})
            if (routes) {
                res.json({ routes })
            }
        } catch(e) {
            res.status(500).json({ error: 'server error' });
        }
    }

    async addUserRoute(req, res) {
        const route = new Route({
            title: req.body.title,
            author: req.body.author,
            origin: req.body.origin,
            waypoints: req.body.origin,
            destination: req.body.destination,
            speed: req.body.speed,
            time: req.body.time
        })

        try {
            const saveRoute = await route.save();
            if (saveRoute) {
                res.send('Dodano trasę')
            }
        } catch(e) {
            console.log(e);
            res.send(e);
        }
    }
}

module.exports = new RouteController();