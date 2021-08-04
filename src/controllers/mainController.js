const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const encrypt = (cadenaAEncriptar) => Buffer.from(cadenaAEncriptar).toString('base64');
const decrypt = (cadenaADesencriptar) =>  Buffer.from(cadenaADesencriptar, 'base64').toString();


const controller = {
	index: (req, res) => {

		const visitedProducts = products.filter((product) => product.category == 'visited');
		const inSaleProducts = products.filter((product) => product.category == 'in-sale');

		const viewData = {
			visiteds: visitedProducts,
			inSale: inSaleProducts,
			message: ''
		}


		// Chequear si es la primera vez que ingresa

		if(req.cookies.alreadyVisited) {
			viewData.message = 'Ya ingresaste';
		} else {
		//	res.cookie('alreadyVisited', 'true');
			viewData.message = 'Bienvenido por primera vez';
		}

		if (!req.cookies.views) {
			//res.cookie('views', '1');
		} else {
		//	const lastVisits = req.cookies.views;

		//	res.cookie('views', Number(lastVisits) + 1);
		}


		if(req.cookies.hint) {
			const emailToFind = decrypt(req.cookies.hint);
			const userToLogin = users.find((user) => user.email == emailToFind);
			req.session.user = userToLogin
		}

		if(req.session.user) {
			const emailEncriptado = encrypt(req.session.user.email )
			res.cookie('hint', emailEncriptado)
			return res.send('Estas logueado con ' + req.session.user.name);
		}






		res.render('index', viewData)
	},
	search: (req, res) => {
		return res.send({ nombre: req.session.nombre, ultimaVisita: req.session.ultimaVisita });
	},
};

module.exports = controller;
