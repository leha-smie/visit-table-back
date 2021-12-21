
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

const PORT = process.env.PORT || 80;

app.use(express.json({
	type: ['application/json', 'text/plain']
}));
app.use(cors());

app.get('/clients', (req, res) => {
	fs.readFile('db.json', 'utf-8', (err, data) => {
		if (err) {
			console.log(err);
		} else {
			res.send(data);
		}
	});
});

app.post('/addClient', (req, res) => {
	console.log("hello");
	fs.readFile('db.json', 'utf-8', (err, data) => {
		if (err) {
			console.log(err);
		} else {
			let db = JSON.parse(data);
			console.log(req.body);
			db.push(req.body);
			function indexReset() {
				for (let i = 0; i < db.length; i++) {
					db[i].id = i + 1;
				};
			}
			indexReset();
			fs.writeFile('db.json', JSON.stringify(db), (err) => {
				if (err) {
					console.log(err);
				} else {
					res.send(db);
				}
			});
		}
	});
});
app.put('/increaseTrening', (req, res) => {
	const arrId = req.body;
	const jsonData = fs.readFileSync('./db.json');
	const db = JSON.parse(jsonData);
	arrId.forEach(id => {
		const findClient = db.find(el => el.id === id);
		if (findClient.count > 1) {
			--findClient.count;
		} else {
			db.splice(db.indexOf(findClient), 1);
		}
	});
	function indexReset() {
		for (let i = 0; i < db.length; i++) {
			db[i].id = i + 1;
		};
	}
	indexReset();
	fs.writeFileSync('./db.json', (JSON.stringify(db)));
	res.send(db);
});


// app.get('/mainPageProducts', (req, res) => {
// 	fs.readFile('./db.json', 'utf-8', (err, data) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			function randomIndex(count, number) {
// 				let index = [];
// 				while (index.length < count) {
// 					let num = Math.floor(Math.random() * number);
// 					if (index.includes(num)) {
// 						continue;
// 					} else {
// 						index.push(num);
// 					}
// 				}
// 				return index;
// 			}
// 			const products = JSON.parse(data).products;
// 			let filtredProducts = [];
// 			const categoryes = {
// 				lady: products.filter(
// 					(prod) => prod.category === "женские"
// 				),
// 				man: products.filter(
// 					(prod) => prod.category === "мужские"
// 				),
// 				baby: products.filter(
// 					(prod) => prod.category === "детские"
// 				),
// 			};
// 			for (let key in categoryes) {
// 				if (key === "lady") {
// 					let indexes = randomIndex(4, categoryes[key].length);
// 					for (let index of indexes) {
// 						filtredProducts.push(categoryes[key][index]);
// 					}
// 				} else {
// 					let indexes = randomIndex(2, categoryes[key].length);
// 					for (let index of indexes) {
// 						filtredProducts.push(categoryes[key][index]);
// 					}
// 				}
// 			}
// 			res.send(JSON.stringify(filtredProducts));
// 		}
// 	});
// });
// app.get('/allProducts', (req, res) => {
// 	fs.readFile('./db.json', 'utf-8', (err, data) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			let db = JSON.parse(data);
// 			res.send(JSON.stringify(db.products));
// 		}
// 	});
// });

// app.get('/articles', (req, res) => {
// 	fs.readFile('./db.json', 'utf-8', (err, data) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			let db = JSON.parse(data);
// 			res.send(JSON.stringify(db.articles));
// 		}
// 	})
// });

// app.post('/cart', (req, res) => {
// 	fs.readFile('./db.json', 'utf-8', (err, data) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			const product = req.body;
// 			let db = JSON.parse(data);
// 			cartProducts = db.cart;
// 			if (cartProducts.length) {
// 				let isProductFind = true;
// 				cartProducts.forEach(element => {
// 					if (element.id === product.id) {
// 						element.quantity++;
// 						element.price += product.price;
// 						isProductFind = false;
// 					}
// 				});
// 				if (isProductFind) {
// 					product.quantity = 1;
// 					cartProducts.push(product);
// 				}
// 			} else {
// 				product.quantity = 1;
// 				cartProducts.push(product);
// 			}
// 			fs.writeFile('./db.json', JSON.stringify(db), (err) => {
// 				if (err) {
// 					res.send("ошибка");
// 				} else {
// 					res.send(JSON.stringify(cartProducts));
// 				}
// 			})

// 		}
// 	})
// });
// app.delete('/product', (req, res) => {
// 	fs.readFile('./db.json', 'utf-8', (err, data) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			const db = JSON.parse(data)
// 			const cartProducts = db.cart;
// 			cartProducts.map(el => {
// 				if (el.id === req.body.id) {
// 					cartProducts.splice(cartProducts.indexOf(el), 1);
// 				}
// 			});
// 			fs.writeFile('./db.json', JSON.stringify(db), (err) => {
// 				if (err) {
// 					console.log(err);
// 				} else {
// 					res.send(JSON.stringify(cartProducts));
// 				}
// 			});

// 		}
// 	});
// });
// app.put('/increaseProduct/:id', (req, res) => {
// 	const id = req.params.id;
// 	const jsonData = fs.readFileSync('./db.json');
// 	const db = JSON.parse(jsonData);
// 	const cartProduct = db.cart;
// 	const products = db.products;
// 	const findProductCart = cartProduct.find(el => el.id === +id);
// 	const findProduct = products.find(el => el.id === +id);
// 	findProductCart.quantity = req.body.quantity;
// 	findProductCart.price += findProduct.price;
// 	fs.writeFileSync('./db.json', (JSON.stringify(db)));
// 	res.json(findProductCart);
// });
// app.put('/decreaseProduct/:id', (req, res) => {
// 	const id = req.params.id;
// 	const jsonData = fs.readFileSync('./db.json');
// 	const db = JSON.parse(jsonData);
// 	const cartProduct = db.cart;
// 	const products = db.products;
// 	const findProductCart = cartProduct.find(el => el.id === +id);
// 	const findProduct = products.find(el => el.id === +id);
// 	findProductCart.quantity = req.body.quantity;
// 	findProductCart.price -= findProduct.price;
// 	fs.writeFileSync('./db.json', (JSON.stringify(db)));
// 	res.json(findProductCart);
// });


app.listen(3000, () => {
	console.log('Server started... ');
});