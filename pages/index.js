import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-200 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md bg-rose-200">
        <h1 className="text-3xl font-bold text-center mb-8 p-4 text-gray-800 rounded-lg shadow-md">Item Manager</h1>

        {/* Form Section */}
        <div className="mb-8">
          <ItemForm />
        </div>

        {/* List Section */}
        <div>
          <ItemList />
        </div>
      </div>
    </div>
  );
}
