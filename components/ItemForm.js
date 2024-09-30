import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/slices/itemSlice';


const ItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && description) {
      dispatch(addItem({ name, description }));
      setName('');
      setDescription('');
    }
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="w-full mx-auto bg-white p-6 rounded-lg shadow-md mt-6"
  >
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Item</h2>

    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">
        Item Name
      </label>
      <input
        id="name"
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm 
        focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-blue-600 font-bold"
      />
    </div>

    <div className="mb-6">
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
        Description
      </label>
      <input
        id="description"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md
        text-blue-600 font-bold shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
    >
      Add Item
    </button>
  </form>
  );
};

export default ItemForm;
