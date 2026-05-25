import db from '../../../db/models';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const reader = await db.Reader.findByPk(id);
      if (!reader) return res.status(404).json({ error: 'Reader not found' });
      await reader.update(req.body);
      res.status(200).json(reader);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update reader' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const reader = await db.Reader.findByPk(id);
      if (!reader) return res.status(404).json({ error: 'Reader not found' });
      await reader.destroy();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete reader' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
