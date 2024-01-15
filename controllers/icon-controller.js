const Icon = require('../db/models/icon')

class IconController {
    async getIcons(req, res) {
        try {
            const icons = await Icon.find();

            console.log(icons);
            res.json({ icons })
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'server error' });
        }
    }
    async saveIcon(req, res) {
        const icon = new Icon({
            iconName: req.body.iconName,
            iconLink: req.body.iconLink
        })

        try {
            const saveDb = await icon.save();
            console.log(saveDb);

            res.send('dodano ikone');
        } catch(e) {
            console.log(e)
            res.send(e)
        }
    }
}

module.exports = new IconController();