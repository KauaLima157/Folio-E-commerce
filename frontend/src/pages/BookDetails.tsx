import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { CartDrawer } from "../components/CartDrawer";
import { CartBar } from "../components/CartBar";
import { api, getBookCoverImage, type Product } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hook/authHook";
import toast from "react-hot-toast";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import "../styles/BookDetails.css";

const getBookColor = (id: string) => {
  const colors = ["#87CEEB", "#D2B48C", "#FFA07A", "#778899", "#FFD700"];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeAngle, setActiveAngle] = useState<'front' | 'isometric' | 'back' | 'open'>('front');
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transform: 'scale(1)',
    transformOrigin: 'center'
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transform: 'scale(1.8)',
      transformOrigin: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: 'scale(1)',
      transformOrigin: 'center'
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await api.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar as informações do livro.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleOpenCart = () => setIsCartOpen(true);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Você precisa estar Logado para adicionar livros ao carrinho.");
      navigate("/auth/login");
      return;
    }
    if (!product) return;
    addToCart({
      id: product.id,
      title: product.title,
      price: Number(product.price),
    });
    setIsCartOpen(true);
  };

  if (loading) {
    return (
      <div className="book-details-loading-container">
        <Header onOpenCart={handleOpenCart} />
        <div className="book-details-loading">
          <div className="spinner"></div>
          <p>Carregando livro...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="book-details-error-container">
        <Header onOpenCart={handleOpenCart} />
        <div className="book-details-error">
          <h2>Ops!</h2>
          <p>{error || "Livro não encontrado."}</p>
          <button className="back-btn" onClick={() => navigate("/")}>
            <ArrowLeft size={16} /> Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  const bookColor = getBookColor(product.id);
  const coverImg = getBookCoverImage(product.title);
  const formattedPrice = Number(product.price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="book-details-page">
      <Header onOpenCart={handleOpenCart} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <CartBar isVisible={!isCartOpen} onOpen={() => setIsCartOpen(true)} />

      <div className="book-details-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Voltar
        </button>

        <div className="book-details-layout">
          {/* Cover Section */}
          {coverImg ? (
            <div className="book-details-gallery-container">
              <div 
                className="book-details-preview-box only-image"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="book-details-zoom-container"
                  style={zoomStyle}
                >
                  <img src={coverImg} alt={product.title} className="book-details-single-cover" />
                </div>
              </div>
            </div>
          ) : (
            <div className="book-details-gallery-container">
              <div 
                className="book-details-preview-box"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className={`book-details-zoom-container ${activeAngle}`}
                  style={zoomStyle}
                >
                  {activeAngle === 'front' && (
                    <div className="book-cover-front" style={{ backgroundColor: bookColor }}>
                      <div className="book-cover-spine"></div>
                      <span className="book-cover-title">{product.title}</span>
                      <span className="book-cover-author">{product.authors.join(", ")}</span>
                    </div>
                  )}
                  {activeAngle === 'isometric' && (
                    <div className="book-3d-scene">
                      <div className="book-cover-3d" style={{ backgroundColor: bookColor } as React.CSSProperties}>
                        {/* Front face */}
                        <div className="book-face-front" style={{ backgroundColor: bookColor }}>
                          <div className="book-cover-spine"></div>
                          <span className="book-cover-title-3d">{product.title}</span>
                          <span className="book-cover-author-3d">{product.authors[0]}</span>
                        </div>
                        {/* Spine face */}
                        <div className="book-face-spine" style={{ backgroundColor: bookColor }}>
                          <div className="book-spine-text">{product.title}</div>
                        </div>
                        {/* Pages/Thickness face */}
                        <div className="book-face-pages"></div>
                      </div>
                    </div>
                  )}
                  {activeAngle === 'back' && (
                    <div className="book-cover-back" style={{ backgroundColor: bookColor }}>
                      <div className="book-cover-spine-right"></div>
                      <div className="book-back-barcode-container">
                        <div className="book-back-barcode">
                          <span></span><span></span><span></span><span></span><span></span>
                          <span></span><span></span><span></span><span></span><span></span>
                        </div>
                        <span className="isbn-text">ISBN 978-3-16-148410-0</span>
                      </div>
                      <div className="book-back-synopsis">
                        <p>Uma obra-prima atemporal recomendada para todos os amantes de boa literatura.</p>
                      </div>
                    </div>
                  )}
                  {activeAngle === 'open' && (
                    <div className="book-cover-open">
                      <div className="book-page-left">
                        <h4 className="chapter-title">{product.title}</h4>
                        <div className="mock-lines">
                          <div className="mock-line"></div>
                          <div className="mock-line"></div>
                          <div className="mock-line"></div>
                          <div className="mock-line"></div>
                          <div className="mock-line"></div>
                        </div>
                        <span className="page-num">12</span>
                      </div>
                      <div className="book-page-fold"></div>
                      <div className="book-page-right">
                        <div className="mock-lines">
                          <div className="mock-line"></div>
                          <div className="mock-line"></div>
                          <div className="mock-line"></div>
                          <div className="mock-line"></div>
                          <div className="mock-line"></div>
                        </div>
                        <span className="page-num">13</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="book-details-thumbnails">
                <button 
                  className={`thumb-btn ${activeAngle === 'front' ? 'active' : ''}`}
                  onClick={() => setActiveAngle('front')}
                >
                  <div className="thumb-preview thumb-front" style={{ backgroundColor: bookColor }}>
                    <div className="thumb-spine"></div>
                  </div>
                  <span>Frente</span>
                </button>
                
                <button 
                  className={`thumb-btn ${activeAngle === 'isometric' ? 'active' : ''}`}
                  onClick={() => setActiveAngle('isometric')}
                >
                  <div className="thumb-preview thumb-isometric" style={{ backgroundColor: bookColor }}>
                    <div className="thumb-spine"></div>
                    <div className="thumb-pages"></div>
                  </div>
                  <span>3D</span>
                </button>

                <button 
                  className={`thumb-btn ${activeAngle === 'back' ? 'active' : ''}`}
                  onClick={() => setActiveAngle('back')}
                >
                  <div className="thumb-preview thumb-back" style={{ backgroundColor: bookColor }}>
                    <div className="thumb-spine-right"></div>
                  </div>
                  <span>Verso</span>
                </button>

                <button 
                  className={`thumb-btn ${activeAngle === 'open' ? 'active' : ''}`}
                  onClick={() => setActiveAngle('open')}
                >
                  <div className="thumb-preview thumb-open">
                    <div className="thumb-fold"></div>
                  </div>
                  <span>Páginas</span>
                </button>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="book-details-info">
            <span className="book-details-genre">
              {product.genres.join(" / ").toUpperCase()}
            </span>
            <h1 className="book-details-title">{product.title}</h1>
            <p className="book-details-author">
              por <span className="author-name">{product.authors.join(", ")}</span>
            </p>



            <hr className="divider" />

            <div className="book-details-price-row">
              <span className="price-label">Preço:</span>
              <span className="price-val">{formattedPrice}</span>
            </div>

            <div className="book-details-desc-box">
              <h3>Descrição</h3>
              <p className="book-details-description">
                {product.description || "Este livro não possui uma descrição cadastrada no momento."}
              </p>
            </div>
          </div>

          {/* Buying Box Section (Amazon style) */}
          <div className="book-details-buy-box">
            <div className="buy-box-price">{formattedPrice}</div>



            <div className="buy-box-stock">
              {product.stock > 0 ? (
                <span className="stock-in">Em estoque</span>
              ) : (
                <span className="stock-out">Indisponível no momento</span>
              )}
            </div>

            <button
              className="buy-box-add-btn"
              disabled={product.stock <= 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
              Adicionar ao carrinho
            </button>


          </div>
        </div>
      </div>
    </div>
  );
}
