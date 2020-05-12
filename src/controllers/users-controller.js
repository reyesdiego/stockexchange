const { UserService } = require('../services/user');

module.exports.register = async function (req, res) {
    try {
        const userService = UserService({ db: this.mongo.db });
        res.status(200).send(await userService.register(req.body));
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports.login = async function (req, res) {
    try {
        const userService = UserService({ db: this.mongo.db, jwt: this.jwt });
        res.status(200).send(await userService.login(req.body.email, req.body.password));
    } catch (err) {
        res.status(401).send(err.message);
    }
};
