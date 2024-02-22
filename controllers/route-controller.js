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
            console.log(req.body.email)

            const routes = await Route.find({ author: email })
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
            waypoints: req.body.waypoints,
            destination: req.body.destination,
            timesTab: req.body.timesTab,
            speed: req.body.speed,
            time: req.body.time,
            distance: req.body.distance,
            averageSpeed: req.body.averageSpeed
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
    
    async updateTimesTab(req, res) {
        try {
            const route = await Route.findOne({ title: req.body.title })
            
            route.timesTab = req.body.timesTab;
            console.log('updated times tab: ', route.timesTab)

            await route.save();
            res.status(200).json({ message: 'Pole "timesTab" zostało zaaktualizowane', route });

        } catch(error) {
            console.error(error);
            res.status(500).json({ message: 'Wystąpił błąd serwera' });
        }
    }

    async getRouteTimes(req, res) {
       try {
        const route = await Route.findOne({ title: req.body.title });

        if (route) {
            const tab = JSON.parse(route.timesTab);
            tab.sort(function(a, b) {
                return a.time - b.time;
            })

            res.send(tab);
        }
       } catch (e) {
        console.log(e)
       }
    }
}

module.exports = new RouteController();