module.exports.UserService = injections => {
    // arrange
    const login = Login.bind(null, injections);
    const register = Register.bind(null, injections);

    // public functions
    return { login, register };

    // private functions
    async function Register({ db }, user) {
        try {
            const users = db.collection('users');

            const userExists = await users.
                find({ email: user.email }).
                toArray();

            if (userExists.length > 0) {
                throw new Error('User already exists');
            } else {
                const newUser = await users.
                    insert(user);

                return newUser.ops && newUser.ops[0];
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async function Login({ db, jwt }, email, password) {
        try {
            const users = db.collection('users');
            const user = await users.
                find({ email, password }).
                toArray();

            if (user.length) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 120,
                    email
                });
                return { authorization: `Bearer ${token}` };
            } else {
                throw new Error('Not Authorized');
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

};
