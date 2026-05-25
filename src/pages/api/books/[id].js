import db from '../../../db/models';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const book = await db.Book.findByPk(id);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      await book.update(req.body);
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update book' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const book = await db.Book.findByPk(id);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      await book.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete book' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
