const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {

		const visitedProducts = products.filter((product) => product.category == 'visited');
		const inSaleProducts = products.filter((product) => product.category == 'in-sale');

		const viewData = {
			visiteds: visitedProducts,
			inSale: inSaleProducts,
		}

		res.render('index', viewData)
	},
	search: (req, res) => {
		return res.send({ nombre: req.session.nombre, ultimaVisita: req.session.ultimaVisita });
	},
};

module.exports = controller;
