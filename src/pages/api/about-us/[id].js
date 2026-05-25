import db from '../../../db/models';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const aboutUs = await db.AboutUs.findByPk(id);
      if (!aboutUs) return res.status(404).json({ error: 'About Us info not found' });
      await aboutUs.update(req.body);
      res.status(200).json(aboutUs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update about us info' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const aboutUs = await db.AboutUs.findByPk(id);
      if (!aboutUs) return res.status(404).json({ error: 'About Us info not found' });
      await aboutUs.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete about us info' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
