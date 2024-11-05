import React, { memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";

const BookDetails = memo(({ books }) => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [wishlistStatus, setWishlistStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const userId = localStorage.getItem("userId");
  const book = books.find((b) => b.bookId === parseInt(bookId, 10));

  useEffect(() => {
    if (book) {
      console.log("Book object passed to BookDetails:", book);
    } else {
      console.log("No matching book found for bookId:", bookId);
    }
  }, [book, bookId]);

  const hideMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const addToWishlist = async () => {
    try {
      const response = await axios.post("https://localhost:7034/api/Wishlist", {
        userId: userId,
        bookId: book.bookId,
      });
      if (response.status === 200) {
        setWishlistStatus(true);
        setMessage("Book successfully added to your wishlist!");
        setMessageType("success");
        hideMessageAfterDelay();
      }
    } catch (error) {
      if (`error.response && error.response.status === 400`) {
        setMessage("Book is already in your wishlist.");
      } else {
        setMessage("Failed to add book to wishlist.");
      }
      setMessageType("danger");
      hideMessageAfterDelay();
    }
  };

  const handleBuyNow = () => {
    // Pass bookId in the navigation state
    console.log(bookId)
    navigate("/checkout", { state: { bookId: book.bookId, book } });
  };
  

  if (!book) {
    return <h2>Book not found or loading...</h2>;
  }

  return (
    <Container className="mt-5 mb-5">
      <Row>
        {/* Left Column with Image */}
        <Col xs={12} md={4} className="text-center">
          <img
            src={`data:image/png;base64,${book.imageBase64}`}
            alt={book.title}
            className="img-fluid mb-3"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
          <Row>
            <Col xs={12} className="text-center">
              <Button variant="primary" className="mb-2 w-50" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </Col>
          </Row>

          <Row>
            <Col xs={12} className="text-center">
              <Button
                variant={wishlistStatus ? "success" : "outline-secondary"}
                className="w-50"
                onClick={addToWishlist}
                disabled={wishlistStatus}
              >
                {wishlistStatus ? "Added to Wishlist" : "Add to Wishlist"}
              </Button>
            </Col>
          </Row>

          {message && (
            <Alert variant={messageType} className="mt-3">
              {message}
            </Alert>
          )}
        </Col>

        {/* Right Column with Table */}
        <Col xs={12} md={8} style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              flexGrow: 1, // Fill the available vertical space
              height: "100%", // Ensure full height
            }}
          >
            <div className="table-responsive" style={{ height: "100%" }}>
              <table
                className="table table-hover"
                style={{
                  width: "100%",
                  height: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid #ddd",
                  tableLayout: "fixed", // Prevent table from overflowing horizontally
                }}
              >
                <tbody>
                  {[
                    { label: "Title", value: book.title },
                    { label: "Author", value: book.author },
                    { label: "Category", value: book.category },
                    { label: "Description", value: book.descrition },
                    { label: "Price", value:` ${book.price} `},
                  ].map((row, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          padding: "0.8rem 1rem",
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "#333",
                          backgroundColor: "#f0f0f0",
                          verticalAlign: "middle",
                          width: "20%", // Make left column smaller
                          wordBreak: "break-word", // Break long words
                        }}
                      >
                        <strong>{row.label}:</strong>
                      </td>
                      <td
                        style={{
                          padding: "0.8rem 1rem",
                          textAlign: "justify",
                          color: "#555",
                          verticalAlign: "middle",
                          fontWeight: "500",
                          borderBottom: "1px solid #ddd",
                          wordBreak: "break-word", // Ensure text wraps correctly
                          width: "80%", // Give more space to the right column
                        }}
                      >
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default BookDetails;