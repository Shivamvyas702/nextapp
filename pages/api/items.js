import dbConnect from '../../lib/dbConnect';
import Item from '../../pages/api/model/Item';

export default async function handler(req, res) {
  const { method } = req;

  // Connect to the database
  await dbConnect();

  switch (method) {
    // Get all items or search/filter items
    case 'GET':
      try {
        const { search, filter } = req.query;
        let query = {};

        // Implement search functionality
        if (search) {
          query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
        }

        // Implement filter functionality (e.g., filtering by description)
        if (filter) {
          query.description = { $regex: filter, $options: 'i' };
        }

        const items = await Item.find(query);
        res.status(200).json(items);
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    // Create a new item
    case 'POST':
      try {
        const newItem = await Item.create(req.body);
        res.status(201).json(newItem);
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    // Update an item by ID
    case 'PUT':
      try {
        const { id } = req.query;
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!updatedItem) {
          return res.status(404).json({ success: false, message: 'Item not found' });
        }

        res.status(200).json(updatedItem);
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    // Delete an item by ID
    case 'DELETE':
      try {
        const { id } = req.query;
        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem) {
          return res.status(404).json({ success: false, message: 'Item not found' });
        }

        res.status(204).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
