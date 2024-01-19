// import database
const db = require("../config/database");

// membuat class Model News
class News {
  /**
   * Membuat method static all.
   */
  static all() {
    const query = "SELECT * from news";
    /**
     * Melakukan query menggunakan method query.
     * Menerima 2 params: query dan callback
     */
    db.query(query, (err, results) => {
      return results;
    });
  }

  static all(callback) {
    const query = "SELECT * from news";
    /**
     * Melakukan query menggunakan method query.
     * Menerima 2 params: query dan callback
     */
    db.query(query, (err, results) => {
      callback(results);
    });
  }

  static all() {
    // return Promise sebagai solusi Asynchronous
    return new Promise((resolve, reject) => {
      const query = "SELECT * from news";
      /**
       * Melakukan query menggunakan method query.
       * Menerima 2 params: query dan callback
       */
      db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }

  /**
   * TODO 1: Buat fungsi untuk insert data.
   * Method menerima parameter data yang akan diinsert.
   * Method mengembalikan data student yang baru diinsert.
   */
  static async create(data) {
    // melakukan insert data ke datbase
    data.created_at = new Date();
    data.updated_at = new Date();
    const id = await new Promise((resolve, reject) => {
      const sql = "SELECT INTO news SET ?";
      db.query(sql, data, (err, results) => {
        resolve(results.insertId);
      });
    });

    const news = this.find(id);
    return news;
  }

  // Mengupdate data news
  static async update(data, id) {
    data.updated_at = new Date();
    await new Promise((resolve, reject) => {
      const sql = "UPDATE news SET ? WHERE id =?";
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });

    const news = await News.find(id);
    return news;
  }

  // menghapus data news
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM news WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  // mencari data news derdasarkan id
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM news WHERE id = ?";
      db.query(sql, id, (err, results) => {
        // destrukture object results
        const [news] = results;
        resolve(news);
      });
    });
  }
}

// export class News
module.exports = News;
