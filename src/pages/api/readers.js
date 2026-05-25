import db from '../../db/models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const readers = await db.Reader.findAll({ order: [['id', 'ASC']] });
      res.status(200).json(readers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch readers' });
    }
  } else if (req.method === 'POST') {
    try {
      const newReader = await db.Reader.create(req.body);
      res.status(201).json(newReader);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create reader' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
