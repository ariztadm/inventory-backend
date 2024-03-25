import Product from '../models/productModel.js';
import path from 'path';
import FileSystem from 'fs'

export const getProduct = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductById = async (req,res) => {
  try {
    const response = await Product.findOne({
      where : {
        id: req.params.id, 
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProduct = async (req, res) => {
  if ( req.files === null)
  return res.status(400).json({msg: 'No File Uploaded'});

  const nama = req.body.nama;
  const jumlahStok = req.body.jumlahStok;
  const harga = req.body.harga;
  const file = req.file.file;
  const ext = path.extname(file.name);
  const fileName = file.md5 = ext;
  const urlGambar = `${req.protocol}://${req.get('host')}/images/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if(!allowedType.includes(ext.toLowerCase()))
  return res.status(422).json({msg:'Invalid Image'});

  file.mv(`./public/image/${fileName}`, async (err) => {
    try {
      await Product.create({
        nama: nama,
        jumlahStok: jumlahStok,
        harga: harga,
        gambarProduk: fileName,
        urlGambar: urlGambar
      });
      res.status(201).json({msg:'Product Create Succesfuly'});
    } catch (error) {
      console.log(error.message);
      res.status(500).json({msg: error.message});
    }
  });
};

export const updateProduct = async (req, res) => {
  let fileName = '';
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });
  
  if(!product)return req.status(400).json({msg :'No Data Found'});
  
  console.log('ini apa?, req.files');

  if (req.files === null) {
    fileName = product.gambarProduk;
    console.log('gambar tidak berubah');
  }else {
    const file = req.files.file;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if(!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({msg:'Invalid Image'});

    const filepath = './public/images/${product.image}';
    FileSystem.unlinkSync(filepath);

    file.mv('./public/image/${fileName}', async (err)=> {
      if (err) return res.status(500).json({msg : err.message});
    });

    console.log('gambar sudah berubah');

  }
  const nama = req.body.nama;
  const jumlahStok = req.body.jumlahStok;
  const harga = req.body.harga;
  const urlGambar = `${req.protocol}://${req.get('host')}/images/${fileName}`;
  try {
    await Product.update(
      {
        nama: nama,
        jumlahStok: jumlahStok,
        harga: harga,
        gambarProduk: fileName,
        urlGambar: urlGambar 
      },
      {
        where : {
          id: req.params.id, 
        },
      }
    );
    res.status(200).json({msg:'Product Updated'});
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  let fileName = '';
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.sttus(404).json({msg : 'No Data Found'});

  try {
    const filepath = './public/images/${product.image}';

    FileSystem.unllinkSync(filepath);

    await Produk.destroy({
      where : {
        id :req.params.id,
      },
    });
    res.status(200).json ({msg: 'Product Deleted'});
  } catch (error) {
    console.log(error.message);   
  }
}
