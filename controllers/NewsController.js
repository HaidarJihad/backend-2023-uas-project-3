// import Model News
const News = require("../models/News");

// buat class NewsController
class NewsController {
  index(req, res) {
    // memanggil method static all
    const news = News.all();

    const data = {
      message: "Menampilkan semua news",
      data: news,
    };

    res.json(data);
  }

  index(req, res) {
    //memanggil method static all.
    //mengirim callback di parameter.
    News.all(function (news) {
      const data = {
        message: "Menampilkan semua news",
        data: news,
      };

      res.json(data);
    });
  }

  // menambahkan keyword async memberitahu proses asynchronous
  async index(req, res) {
    // memanggil method static all dengan async await.
    const news = await News.all();

    const data = {
      message: "Menampilkan semua news",
      data: news,
    };

    res.json(data);
  }
  
  async store(req, res) {
    /**
     * TODO 2: memanggil method create.
     * Method create mengembalikan data yang baru diinsert.
     * Mengembalikan response dalam bentuk json.
     */
    const news = await News.create(req.body);

    const data = {
      message: "Menambahkan data news",
      data: {
        id: req,body,id,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        url: req.body.url,
        url_image: req.body.url_image,
        published_at: req.body.published_at,
        category: req.body.category,
        timestamp: req.body.timestamp,
      },
    };

    res.json(data);
  }

  update(req, res) {
    const { id } = req.params;
    const { title } = req.body;

    const data = {
      message: 'Mengedit news id ${id}, title ${title}',
      data: [],
    };

    res.json(data);
  }

  destroy(req, res) {
    const { id } = req.params;

    const data = {
      message: 'Menghapus news id ${id}',
      data: [],
    };

    res.json(data);
  }

  async index(req, res) {
    //memanggil method static all dengan async await.
    const news = await News.all();

    if (news.length > 0) {
      const data = {
        message: "Menampilkan semua news",
        data: news,
      };

      return res.status(200),json(data);
    } else {
      const data = {
        message: "news is empty",
      };

      return res.status(404).json(data);
    }
  }

  async store(req, res) {
    // destructuring object req.body
    const { id, title, author, content, url, url_image, published_at, category, timestamp } = req.body;

    if (!id || !title || !author || !content || !url || !url_image || !published_at || !category || !timestamp) {
      const data = {
        message: "Semua field harus diisi",
      };

      return res.status(422).json(data);
    } else {
      const news = await News.create(req.body);

      const data = {
        message: "Menambahkan news baru",
        data: news,
      };

      return res.status(201).json(data);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const news = await News.find(id);

    if (news) {
      const news = await News.update(req.body, id);
      const data = {
        message: 'Mengedit news id ${id}',
        data: news,
      };

      return res.status(200).json(data);
    } else {
      const data = {
        message: 'Data news id ${id} tidak ditemukan',
      };

      return res.status(404).json(data);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const news = await News.find(id);

    if (news) {
      await News.delete(id);
      const data = {
        message: 'Menghapus news id ${id}',
        data: news,
      };

      return res.status(200).json(data);
    } else {
      const data = {
        message: 'Data news id ${id} tidak ditemukan', 
      };

      return res.status(404).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const news = await News.find(id);

    if (news) {
      const data = {
        message: 'Menampilkan news id ${id}',
        data: news,
      };

      return res.status(200).json(data);
    } else {
      const data = {
        message: 'Data news id ${id} tidak ditemukan',
      };
      return res.status(404).json(data);
    }
  }
}

// membuat object NewsController
const object = new NewsController();

// export object NewsController
module.exports = object;
