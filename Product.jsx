import Rating from './Rating';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Product({ product }) {
  return (
    <tr>
      <td>{product.id}</td>
      <td className="fw-bold">{product.title}</td>
      <td className="text-success">{product.price.toFixed(2)}$</td>
      <td>{product.description.slice(0, 100)}...</td>
      <td>{product.category}</td>
      <td>
        <img
          className="img-fluid rounded"
          src={product.image}
          alt={product.title}
          style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain" }}
        />
      </td>
      <td>
        <Rating rate={product.rating.rate} count={product.rating.count} />
      </td>
    </tr>
  );
}
