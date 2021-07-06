const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
	},

	// Detail - Detail from one product
	detail: (req, res) => {

		const id = req.params.identificador;
		const product = products.find((prod) => prod.id == id);

		const viewData = {
			product,
			titulo: 'Hola'
		}

		return res.render('detail', viewData)
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {

		// BUSCO EL ULTIMO PRODUCTO DEL ARRAY
		// OBTENGO SU CAMPO ID 
		// LE SUMO 1 

		
		// OBTENGO EL LARGO DEL ARRAY

		// 16 
		// products[15]

		const lastProduct = products[products.length - 1]
		
		
		const productToCreate = req.body;
		productToCreate.id = lastProduct.id + 1;


		products.push(productToCreate);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))


		

		//productToCreate.id = ID DEL ULTIMO PRODUCTO + 1

		
		

		const visitedProducts = products.filter((product) => product.category == 'visited');
		const inSaleProducts = products.filter((product) => product.category == 'in-sale');

		const viewData = {
			visiteds: visitedProducts,
			inSale: inSaleProducts
		}

		res.render('index', viewData)
	},

	// Update - Form to edit
	edit: (req, res) => {
		const id = req.params.id;
		const product = products.find((prod) => prod.id == id);
		if(!product) {
			return res.send('ERROR NO HAY PRODUCTO')
		}
		const viewData = {
			producto: product
		}
		return res.render('product-edit-form', viewData)

	},
	// Update - Method to update
	update: (req, res) => {

	
		// ENCONTRAR EL INDICE DEL PRODUCTO EN EL ARRAY
		// EN BASE A SU ID
		const indiceDelProducto = products.findIndex( producto => producto.id == req.params.id);

		// products[indice encontrado] == producto en el array
		products[indiceDelProducto] = { ...products[indiceDelProducto] , ...req.body };

		// GUARDAR LA NUEVA BASE DE DATOS
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

		return res.send(products)

	
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	},

	uploadImage: (req, res) => {
		return res.send(req.file)
	}
};

module.exports = controller;