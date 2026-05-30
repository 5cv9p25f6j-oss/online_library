import db from '../../../db/models';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const genre = await db.Genre.findByPk(id);
      if (!genre) return res.status(404).json({ error: 'Genre not found' });
      await genre.update(req.body);
      res.status(200).json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update genre' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const genre = await db.Genre.findByPk(id);
      if (!genre) return res.status(404).json({ error: 'Genre not found' });
      await genre.destroy();
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete genre' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
