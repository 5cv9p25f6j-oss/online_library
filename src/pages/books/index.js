import Head from 'next/head';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    year: '',
    description: ''
  });

  const fetchBooks = () => {
    setLoading(true);
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleOpenModal = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        title: book.title,
        authorName: book.authorName,
        year: book.year,
        description: book.description
      });
    } else {
      setEditingBook(null);
      setFormData({ title: '', authorName: '', year: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingBook ? 'PUT' : 'POST';
    const url = editingBook ? `/api/books/${editingBook.id}` : '/api/books';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    handleCloseModal();
    fetchBooks();
  };

  const handleDelete = async (id) => {
    if (confirm('Համոզվա՞ծ եք, որ ցանկանում եք ջնջել այս գիրքը:')) {
      await fetch(`/api/books/${id}`, { method: 'DELETE' });
      fetchBooks();
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Գրքեր | Առցանց Գրադարան</title>
      </Head>
      
      <div className="page-header">
        <h1 className="page-title" style={{marginBottom: 0}}>Մեր Գրքերը</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          + Ավելացնել Գիրք
        </button>
      </div>
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>Բեռնվում է...</p>
      ) : (
        <div className="grid">
          {books.map(book => (
            <div key={book.id} className="card">
              <h2 className="card-title">{book.title}</h2>
              <p className="card-subtitle">{book.authorName} - {book.year}</p>
              <p className="card-content">{book.description}</p>
              <div className="card-actions">
                <button className="btn-secondary" onClick={() => handleOpenModal(book)}>Խմբագրել</button>
                <button className="btn-danger" onClick={() => handleDelete(book.id)}>Ջնջել</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingBook ? 'Խմբագրել Գիրքը' : 'Ավելացնել Նոր Գիրք'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Վերնագիր</label>
            <input name="title" value={formData.title} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label>Հեղինակ</label>
            <input name="authorName" value={formData.authorName} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label>Տարեթիվ</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label>Նկարագրություն</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-textarea"></textarea>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={handleCloseModal}>Չեղարկել</button>
            <button type="submit" className="btn-primary">Պահպանել</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
