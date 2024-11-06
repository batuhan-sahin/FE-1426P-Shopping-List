import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import IconButton from "./components/iconButton";
import Confetti from "react-confetti";
import "./App.css";

const shops = ["Migros", "Bim", "Şok", "A101"];

const categories = ["Elektronik", "Şarküteri", "Oyuncak", "Bakliyat"];

const marketsObj = shops.map((shop, index) => ({
  id: index,
  name: shop,
}));

const categoriesObj = categories.map((category, index) => ({
  id: index,
  name: category,
}));

console.log(marketsObj);
console.log(categoriesObj);

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [confetti, setConfetti] = useState(false);

  const [productName, setProductName] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredShopId, setFilteredShopId] = useState("");
  const [filteredCategoryId, setFilteredCategoryId] = useState("");
  const [filteredName, setFilteredName] = useState("");

  const addProduct = () => {
    const newProduct = {
      id: products.length,
      name: productName,
      market: selectedShop,
      category: selectedCategory,
      isBought: false,
    };
    console.log(newProduct);
    setProducts([...products, newProduct]);
    setProductName("");
    setSelectedShop("");
    setSelectedCategory("");
  };

  const handleToggleBought = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, isBought: !product.isBought } : product
    );
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);

    handleFilterShop(updatedProducts);
  };

  const handleShopComplete = () => {
    setProducts([]);
    setConfetti(true);
    setTimeout(() => {
      setConfetti(false);
    }, 5000);
  };

  const handleFilterShop = (listToFilter = products) => {
    const updatedProducts = listToFilter.filter(
      (product) =>
        (filteredShopId ? product.market === filteredShopId : true) &&
        (filteredCategoryId ? product.category === filteredCategoryId : true) &&
        (filteredName ? product.name.includes(filteredName) : true)
    );
    setFilteredProducts(updatedProducts);
  };

  useEffect(() => {
    handleFilterShop();
    if (filteredProducts.length === 0) {
      setFilteredProducts(products);
    }
  }, [filteredShopId, filteredCategoryId, filteredName, products]);

  return (
    <Container className="p-3">
      <h1 className="text-center mb-4">Ürün Ekle</h1>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Ürün Adı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ürün adını girin"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Market Seçin</Form.Label>
              <Form.Select
                value={selectedShop}
                onChange={(e) => setSelectedShop(e.target.value)}
              >
                <option value="">Seçiniz</option>
                {marketsObj.map((market) => (
                  <option key={market.id} value={market.name}>
                    {market.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Kategori Seçin</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Seçiniz</option>
                {categoriesObj.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={addProduct}>
          Ürün Ekle
        </Button>
      </Form>

      <h2 className="mt-5">Ürünler</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Market</th>
            <th>Ürün</th>
            <th>Kategori</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Select
                value={filteredShopId}
                onChange={(e) => setFilteredShopId(e.target.value)}
              >
                <option value="">Filtrele</option>
                {marketsObj.map((market) => (
                  <option key={market.id} value={market.name}>
                    {market.name}
                  </option>
                ))}
              </Form.Select>
            </td>
            <td>
              <Form.Control
                type="text"
                placeholder="Ürün adını girin"
                value={filteredName}
                onChange={(e) => setFilteredName(e.target.value)}
              />
            </td>
            <td>
              <Form.Select
                value={filteredCategoryId}
                onChange={(e) => setFilteredCategoryId(e.target.value)}
              >
                <option value="">Filtrele</option>
                {categoriesObj.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </td>
          </tr>
          {(filteredProducts.length > 0 ? filteredProducts : products).map(
            (product) => (
              <tr
                key={product.id}
                className={`${product.isBought ? "bought" : ""} pointer`}
              >
                <td onClick={() => handleToggleBought(product.id)}>
                  {product.market}
                </td>
                <td onClick={() => handleToggleBought(product.id)}>
                  {product.name}
                </td>
                <td onClick={() => handleToggleBought(product.id)}>
                  {product.category}
                </td>
                <td>
                  <IconButton onClick={() => handleDeleteProduct(product.id)} />
                </td>
              </tr>
            )
          )}
        </tbody>
        {products?.filter((p) => p.isBought === true).length > 0 && (
          <tfoot>
            <tr>
              <td colSpan={4} className="text-center px-3">
                <Button onClick={handleShopComplete} variant="success">
                  Alışverişi Tamamla
                </Button>
              </td>
            </tr>
          </tfoot>
        )}
      </Table>
      {confetti && <Confetti width={1920} height={1080} />}
    </Container>
  );
}

export default App;
