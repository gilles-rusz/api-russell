const Catway = require('../models/catway');

exports.getById = async (req, res, next) => {
    const id = req.params.id 

    try {
        let catway = await Catway.findById(id);

        if (catway) {
            return res.render('catwayInfo', { title: "Info sur l'embarquadaire", catway: catway});
        }

        return res.status(404).json('catway-not-found');
    } catch (e) {
        return res.status(501).json(e);
    }
}

exports.add = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const temp = ({
        catwayNumber: req.body.catwayNumber,
        type: req.body.type,
        catwayState: req.body.catwayState
    })

    try {
        await Catway.create(temp);

        return res.redirect('/tableau-de-bord');
    } catch (e) {
        return res.status(501).json(e);
    }
}

exports.update =  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const temp = ({
        catwayNumber: req.body.catwayNumber,
        type: req.body.type,
        catwayState: req.body.catwayState
    })

    const id = req.params.id;

    try {
        let catway = await Catway.findOne({_id : id});

        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });

            await catway.save();
            return res.status(201).json(catway);
        }

        return res.status(404).json("catway_not_found");
    } catch (e) {
        return res.status(501).json(e);
    }
}
exports.delete = async (req, res, next) => {
    const id = req.params.id 

    try {
        await Catway.deleteOne({ _id: id });

        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error)
    }
};