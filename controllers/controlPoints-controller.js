const ControlPoints = require('../db/models/controlPoints');

class ControlPointsController {
    async addControlPoints(req, res) {
        const controlPoints = new ControlPoints({
            email: req.body.email,
            routeName: req.body.routeName,
            controls: req.body.controls,
            times: req.body.times
        })
        try {
            const saveControls = controlPoints.save();
            if (saveControls) {
                res.send('Dodano punkty kontrolne');
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'server error' });
        }
    }

    async getControlPoints(req, res) {
        try {
            const { email, routeName } = req.body;
            console.log('email, routeName: ', email, routeName);

            const controlPoints = await ControlPoints.findOne({ email: email, routeName: routeName });
            if (controlPoints) {
                res.json(controlPoints);
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'server error' });
        }
    }
}

module.exports = new ControlPointsController()