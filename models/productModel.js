import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Product = db.define(
  'product',
  {
    nama: DataTypes.STRING,
    gambarProduk: DataTypes.STRING,
    jumlahStok: DataTypes.STRING,
    harga: DataTypes.STRING,
    urlGambar: DataTypes.STRING
  },
  {
    freezeTableName: true,
  }
);

export default Product;

(async () => {
  await db.sync();
})();
