import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useForm, usePage, Head } from '@inertiajs/react'
import { Product } from '@/types'

const Edit = () => {
  const { product } = usePage().props as { product: Product }
  const { data, setData, put, processing, errors } = useForm({
    name: product.name || '',
    description: product.description || '',
    price: product.price || '',
    stock: product.stock || '',
    sku: product.sku || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(e.target.name, e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(route('products.update', product.id))
  }

  return (
    <AuthenticatedLayout>
      <Head title="Edit Product" />
      <h3 className="font-bold text-lg mb-4">Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.description && <div className="text-red-500 text-xs">{errors.description}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={data.price}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.price && <div className="text-red-500 text-xs">{errors.price}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={data.stock}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.stock && <div className="text-red-500 text-xs">{errors.stock}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={data.sku}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.sku && <div className="text-red-500 text-xs">{errors.sku}</div>}
        </div>
        <button
          type="submit"
          disabled={processing}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </AuthenticatedLayout>
  )
}

export default Edit