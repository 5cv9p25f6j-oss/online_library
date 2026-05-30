import db from '../../db/models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const genres = await db.Genre.findAll({ order: [['id', 'ASC']] });
      res.status(200).json(genres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch genres' });
    }
  } else if (req.method === 'POST') {
    try {
      const newGenre = await db.Genre.create(req.body);
      res.status(201).json(newGenre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create genre' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
