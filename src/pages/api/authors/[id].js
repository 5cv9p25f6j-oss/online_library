import db from '../../../db/models';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const author = await db.Author.findByPk(id);
      if (!author) return res.status(404).json({ error: 'Author not found' });
      await author.update(req.body);
      res.status(200).json(author);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update author' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const author = await db.Author.findByPk(id);
      if (!author) return res.status(404).json({ error: 'Author not found' });
      await author.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete author' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
