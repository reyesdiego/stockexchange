module.exports.UserService = injections => {
    // arrange
    const login = Login.bind(null, injections);
    const register = Register.bind(null, injections);

    // public functions
    return { login, register };

    // private functions
    async function Register({ db, bcrypt }, user) {
        try {
            const BCRYPT_SALT_ROUNDS = 12;
            const users = db.collection('users');

            const userExists = await users.
                find({ email: user.email }).
                toArray();

            if (userExists.length > 0) {
                throw new Error('User already exists');
            } else {
                const hashedPassword = await bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS);
                const newUser = await users.
                    insert({ ...user, password: hashedPassword });

                return newUser.ops && newUser.ops[0];
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async function Login({ db, jwt, bcrypt }, email, password) {
        try {
            const users = db.collection('users');
            const user = await users.
                find({ email }).
                toArray();

            if (user.length && await bcrypt.compare(password, user[0].password)) {
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
