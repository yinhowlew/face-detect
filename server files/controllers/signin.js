const handleSignin = (req, res, db, bcrypt) => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).json('incorrect form submission');
	}	
	db.select('email','hash').from('login')
	.where('email', '=', req.body.email)
	.then(data => {
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
		if (isValid) {
			return db.select('*').from('users')  // remember to return
			.where('email', '=', req.body.email)
			.then(user => {
				res.json(user[0])  // pass user if success
			})
			.catch(err => res.status(400).json('unable to get users'))
		} else {
			res.status(400).json('wrong credentials')
		}
	})
	.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignin: handleSignin
}