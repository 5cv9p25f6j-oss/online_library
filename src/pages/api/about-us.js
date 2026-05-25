import db from '../../db/models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const aboutUsInfo = await db.AboutUs.findAll({ order: [['id', 'ASC']] });
      res.status(200).json(aboutUsInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch about us info' });
    }
  } else if (req.method === 'POST') {
    try {
      const newAboutUs = await db.AboutUs.create(req.body);
      res.status(201).json(newAboutUs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create about us info' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
