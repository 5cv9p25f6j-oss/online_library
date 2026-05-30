import db from '../../../db/models';
import { saveFile, deleteFile } from '../../../utils/fileHelper';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const book = await db.Book.findByPk(id);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      
      const { bookFile, deleteFile: shouldDeleteFile, ...bookData } = req.body;
      
      if (shouldDeleteFile) {
        // Explicitly requested to delete the file
        deleteFile(book.filePath);
        bookData.filePath = null;
      } else if (bookFile) {
        // A new file was uploaded, delete the old file first
        deleteFile(book.filePath);
        const newPath = saveFile(bookFile);
        if (newPath) {
          bookData.filePath = newPath;
        }
      }

      await book.update(bookData);
      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update book' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const book = await db.Book.findByPk(id);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      
      // Delete file if it exists
      deleteFile(book.filePath);
      
      await book.destroy();
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete book' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

