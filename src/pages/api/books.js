import db from '../../db/models';
import { saveFile } from '../../utils/fileHelper';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const books = await db.Book.findAll({ order: [['id', 'ASC']] });
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch books' });
    }
  } else if (req.method === 'POST') {
    try {
      const { bookFile, ...bookData } = req.body;
      if (bookFile) {
        const filePath = saveFile(bookFile);
        if (filePath) {
          bookData.filePath = filePath;
        }
      }
      const newBook = await db.Book.create(bookData);
      res.status(201).json(newBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create book' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

