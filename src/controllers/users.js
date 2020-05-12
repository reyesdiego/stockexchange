
class User {

    // users;
    constructor() {
        this.users = [];
    }

    async login(req, res) {
        try {

            // search in database for user with email and password
            // if exists creates the token

            const token = this.jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 120,
                email: req.body.email
            });
            res.send({ authorization: `Bearer ${token}` });
        } catch (err) {
            res.status(401).send('Unauthorized');
        }
    }
}
module.exports = new User();
