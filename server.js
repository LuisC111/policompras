const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const session = require('express-session');
const multer = require('multer');
const Swal = require('sweetalert2');

app.use(session({
  secret: 'abcdefghijkl',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo (timestamp + nombre original)
  }
});

const upload = multer({ storage: storage });


// Configurar Express para usar EJS
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/catalog', (req, res) => {
  res.render('catalog');
});

app.get('/item', async (req, res) => {
  const productId = req.query.id;

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'dcompras'
    });

    const [rows, fields] = await connection.execute(`SELECT * FROM product WHERE id=${productId}`);
    

    if (rows.length > 0) {
      const product = rows[0]; // Tomamos el primer producto (debería ser único)

      // Calculamos el precio con descuento si aplica
      let discountedPrice = null;
      if (product.promo > 0 && product.promo <= 100) {
          discountedPrice = product.price - (product.price * (product.promo / 100));
      }
      res.render('item', {
          product,
          discountedPrice
      });
      
    } else {
        // Manejo de error si el producto no se encuentra
        res.status(404).send('Producto no encontrado');
    }

    await connection.end();
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).send('Internal Server Error');
  }
});
function requireLogin(req, res, next) {
  if (req.session.loggedin) {
    next(); // El usuario está logueado, continúa con la solicitud
  } else {
    res.redirect('/login'); // El usuario no está logueado, redirige a la página de inicio de sesión
  }
} 

app.get('/admin', requireLogin, async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'dcompras'
    });

    const [rows, fields] = await connection.execute('SELECT * FROM product');

    res.render('admin', {
      products: rows
    });

    await connection.end();
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/check_login', async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'dcompras'
    });

    const sql = `SELECT * FROM user WHERE user='${user}' AND pass='${pass}'`;

    const [rows, fields] = await connection.execute(sql);

    if (rows.length > 0) {
      req.session.loggedin = true; // Marcar al usuario como logueado
      res.send('success');
    } else {
      res.send('failure');
    }

    await connection.end();
  } catch (error) {
    console.error('Error en la verificación:', error);
    res.send('error');
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'dcompras'
    });

    const [rows, fields] = await connection.execute('SELECT * FROM product');

    res.json(rows);

    await connection.end();
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta para crear producto (mostrar formulario)
app.get('/admin/create', requireLogin, (req, res) => {
  res.render('create-product');
});

// Ruta para procesar la creación de un producto
app.post('/admin/create', requireLogin, upload.single('img'), async (req, res) => {
  const { name, description, price, quantity, promo } = req.body;
  const img = req.file.filename; // Nombre del archivo guardado


  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'dcompras'
    });

    const sql = `INSERT INTO product (name, description, price, quantity, promo, img) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [name, description, price, quantity, promo, img];

    if (!name || !description || !price || !quantity || !promo || !img) {
      console.error('Alguno de los campos está vacío:', { name, description, price, quantity, promo, img });
      return res.status(400).send('Todos los campos son requeridos.');
    } else {
      await connection.execute(sql, values);

      await connection.end();

      // Agregar SweetAlert2 a la respuesta
      res.send(`
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          Swal.fire({
            icon: 'success',
            title: 'Producto creado con éxito',
            showConfirmButton: false,
            timer: 1500
          }).then(function() {
            window.location.href = '/admin';
          });
        });
      </script>
    `);
    }
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/admin/edit/:id', requireLogin, async (req, res) => {
  const productId = req.params.id;

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'dcompras'
    });

    const sql = `SELECT * FROM product WHERE id=?`;
    const [product] = await connection.execute(sql, [productId]);

    await connection.end();

    if (product.length === 0) {
      return res.status(404).send('Producto no encontrado');
    }

    res.render('edit-product', { product: product[0] }); // Renderizar la vista de edición con los datos del producto
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/admin/edit/:id', requireLogin, async (req, res) => {
  const productId = req.params.id;
  // const { name, description, price, quantity, promo} = req.body;
  // const img = req.file ? req.file.filename : null;

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'dcompras'
    });

    let name = "test"
    let description = "test"
    let price = 1
    let quantity = 1
    let promo = 1
    let img = "1696903341198-zyro-image (1).png"

    const sql = `UPDATE product SET name=?, description=?, price=?, quantity=?, promo=?, img=? WHERE id=?`;
    const values = [name, description, price, quantity, promo, img, productId];

    await connection.execute(sql, values);

    await connection.end();

    res.redirect('/admin');
  } catch (error) {
    console.error('Error al editar el producto:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Ruta para eliminar producto
app.delete('/admin/delete/:id', requireLogin, async (req, res) => {
  const productId = req.params.id;

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'dcompras'
    });

    const sql = `DELETE FROM product WHERE id=${productId}`;

    await connection.execute(sql);

    await connection.end();

    res.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.listen(3000, () => {
  console.log('Servidor en marcha en http://localhost:3000');
});