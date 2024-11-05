import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const BookCard = ({ book, onClick }) => {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, window.innerHeight], [100, -100]);

  return (
    <motion.div
      style={{
        x,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="book-card"
      onClick={onClick}
    >
      <img
        src={`data:image/png;base64,${book.imageBase64}`}
        alt={book.title}
        className="img-fluid"
        style={{
          maxHeight: "250px",
          objectFit: "cover",
        }}
      />
      <h5 className="mt-3">{book.title}</h5>
      <p>{book.author}</p>
    </motion.div>
  );
};

const LatestBooksSection = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7034/api/Book/GetDBImageDet"
        );
        console.log(response.data);
        if (Array.isArray(response.data.result)) {
          setBooks(response.data.result);
        } else {
          console.error("Unexpected API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching latest books:", error);
      }
    };
    fetchLatestBooks();
  }, []);

  const handleBookClick = (bookId) => {
    navigate(`/book-details/${bookId}`);
  };

  return (
    <section className="latest-books py-5">
      <Container>
        <hr />
        <h2 className="text-center spicy-rice-regular-L mb-4">Latest Books</h2>
        {Array.isArray(books) && books.length > 0 ? (
          <Swiper
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay]}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              576: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              992: { slidesPerView: 4, spaceBetween: 30 },
            }}
          >
            {books.map((book, index) => (
              <SwiperSlide key={index}>
                <BookCard
                  book={book}
                  onClick={() => handleBookClick(book.bookId)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center">No books available.</p>
        )}
      </Container>
    </section>
  );
};

export default LatestBooksSection;