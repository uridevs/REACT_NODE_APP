import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Books = () => {

  const  [books, setBooks] = useState([]);
  
  useEffect(() => {
    const fetchAllBooks = async ()=>{
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllBooks();
  }, []);
  return (
    <div>
      <h1>Javi Books Shop</h1>
      <div className="books">
        {books.map(book=>(
          <div className="book">
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books
