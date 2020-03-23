
const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password) {
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {   //loginEmail is from returning
			return trx('users')  //trx object instead of DB
				.returning('*')
				.insert({
					email: loginEmail[0], //since returning always give array
					name: name,
					joined: new Date(),
				})
				.then(user => {
					res.json(user[0]);
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)

	})
		.catch(err => res.status(400).json("unable to register"))
}

module.exports = {
	handleRegister: handleRegister
}
