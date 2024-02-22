const DriverProfile = require('../db/models/driverProfile')

class DriverProfileController {
    async getDriverProfile(req, res) {
        try {
            const driverProfile = await DriverProfile.findOne({ email: req.body.email })
            if (driverProfile) {
                res.status(200).json({ driverProfile })
            }
        } catch(e) {
            console.log(e)
        }
    }

    async addDriverProfile(req, res) {
        const driverProfile = new DriverProfile({
            userEmail: req.body.userEmail,
            allRoutes: req.body.allRoutes,
            firstPlaces: req.body.firstPlaces,
            secondPlaces: req.body.secondPlaces,
            thirdPlaces: req.body.thirdPlaces,
            lastRide: req.body.lastRide,
            lastPlace: req.body.lastPlace
        })

        try {
            const saveDriverProfile = await driverProfile.save();
            if (saveDriverProfile) {
                res.send('Zapisano profil kierowcy');
            }
        } catch(e) {
            console.log(e)
            res.status(500).json({ message: 'Wystąpił błąd serwera' });
        }
    }

    async updateProperties(req, res) {
        try {
            const driverProfile = await DriverProfile.findOne({ userEmail: req.body.userEmail })
            console.log(req.body)
            if (req.body.propsToUpdate === 'allRoutes') {
                driverProfile.allRoutes++;
            }
            else if (req.body.propsToUpdate === 'firstPlaces') {
                driverProfile.firstPlaces++;
            }
            else if (req.body.propsToUpdate === 'secondPlaces') {
                driverProfile.secondPlaces++;
            }
            else if (req.body.propsToUpdate === 'thirdPlaces') {
                driverProfile.thirdPlaces++;
            }

            await driverProfile.save();

            res.status(200).json({ message: 'Zaktualizowano liczbę tras'});

        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Wystąpił błąd serwera' });
        }
    }

    async updateLastRide(req, res) {
        try {
             const driverProfile = await DriverProfile.findOne({ userEmail: req.body.userEmail })

             driverProfile.lastRide = req.body.lastRide;
             driverProfile.lastPlace = req.body.lastPlace;

             driverProfile.save();
             res.status(200).json({ message: 'Zapisano'})
        } catch(e) {
            console.log(e)
            res.status(500).json({ message: 'Wystąpił błąd serwera' });
        }
    }
}

module.exports = new DriverProfileController();