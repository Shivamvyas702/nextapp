import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchItems, deleteItem } from '../store/slices/itemSlice';

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchItems(search ? `?search=${search}` : ''));
  }, [dispatch, search]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Items List</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search items"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <ul className="space-y-4">
        {items.length > 0 ? (
          items.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              <button
                onClick={() => dispatch(deleteItem(item._id))}
                className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No items found</li>
        )}
      </ul>
    </div>
  );
};

export default ItemList;
