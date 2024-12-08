import { useEffect, useState } from "react";
import Product from './Product';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
export default function ProductList() {
    const [productList, setProductList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchInput, setSearchInput] = useState('');

    // Fetch all products and categories once when the component mounts
    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const productResponse = await fetch('https://fakestoreapi.com/products');
                const products = await productResponse.json();
                setProductList(products);
                setFilteredProducts(products); // Initially show all products

                const categoryResponse = await fetch('https://fakestoreapi.com/products/categories');
                const categories = await categoryResponse.json();
                setCategories(['All', ...categories]); // Include "All" category
            } catch (error) {
                console.error("Error fetching products or categories:", error);
            }
        };

        fetchProductsAndCategories();
    }, []);

    // Filter products by category and search input whenever relevant states change
    useEffect(() => {
        let filtered = productList;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        if (searchInput.trim()) {
            const search = searchInput.toLowerCase();
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search) ||
                product.category.toLowerCase().includes(search) ||
                product.id.toString().includes(search)
            );
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, searchInput, productList]);

    // Handle category selection
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    // Handle search input change
    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    // Render categories as buttons
    const displayCategories = () => {
        return categories.map((category, index) => (
            <button
                key={index}
                className={`btn btn-${selectedCategory === category ? 'primary' : 'secondary'} mx-1 my-1`}
                onClick={() => handleCategoryClick(category)}
            >
                {category}
            </button>
        ));
    };

    // Render filtered products
    const displayProducts = () => {
        if (filteredProducts.length > 0) {
            return filteredProducts.map((product) => (
                <Product product={product} key={product.id} />
            ));
        } else {
            return (
                <tr>
                    <td colSpan={7} className="text-center">No Items Found</td>
                </tr>
            );
        }
    };

    return (
        <div className="container my-4 main-container">
            <div className="row">
                <div className="col-12 col-lg-6 mb-3">
                    <h2 className="text-center text-lg-start">Nador Store</h2>
                </div>
                <div className="col-12 col-lg-6 text-center text-lg-end">
                    <input
                        type="text"
                        id="search"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        className="form-control w-100 w-lg-50 search-input"
                        placeholder="Search by title, description, category, or ID"
                    />
                </div>
            </div>

            <div className="my-4">
                <h4 className="text-center">Categories</h4>
                <div className="d-flex flex-wrap justify-content-center category-buttons">
                    {displayCategories()}
                </div>
            </div>

            <div className="mt-5">
                <h4 className="text-center">Products</h4>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered custom-table">
                        <thead className="table-dark">
                            <tr>
                                <th>#ID</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayProducts()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
