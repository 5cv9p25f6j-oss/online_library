import db from '../../db/models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const authors = await db.Author.findAll({ order: [['id', 'ASC']] });
      res.status(200).json(authors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch authors' });
    }
  } else if (req.method === 'POST') {
    try {
      const newAuthor = await db.Author.create(req.body);
      res.status(201).json(newAuthor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create author' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
