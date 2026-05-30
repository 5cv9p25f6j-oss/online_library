import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '../../components/Modal';

export default function Authors() {
  const router = useRouter();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    genre: ''
  });

  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [isBooksModalOpen, setIsBooksModalOpen] = useState(false);

  const handleOpenBooksModal = async (author) => {
    setSelectedAuthor(author);
    setIsBooksModalOpen(true);
    setLoadingBooks(true);
    try {
      const res = await fetch('/api/books');
      const data = await res.json();
      const allBooks = Array.isArray(data) ? data : data.books || [];
      const filtered = allBooks.filter(b => b.authorName && b.authorName.toLowerCase() === author.name.toLowerCase());
      setAuthorBooks(filtered);
    } catch (e) {
      console.error(e);
      setAuthorBooks([]);
    } finally {
      setLoadingBooks(false);
    }
  };

  const handleCloseBooksModal = () => {
    setIsBooksModalOpen(false);
    setSelectedAuthor(null);
    setAuthorBooks([]);
  };

  const fetchAuthors = () => {
    setLoading(true);
    fetch('/api/authors')
      .then(res => res.json())
      .then(data => {
        setAuthors(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleOpenModal = (author = null) => {
    if (author) {
      setEditingAuthor(author);
      setFormData({
        name: author.name,
        country: author.country || '',
        genre: author.genre || ''
      });
    } else {
      setEditingAuthor(null);
      setFormData({ name: '', country: '', genre: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingAuthor ? 'PUT' : 'POST';
    const url = editingAuthor ? `/api/authors/${editingAuthor.id}` : '/api/authors';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    handleCloseModal();
    fetchAuthors();
  };

  const handleDelete = async (id) => {
    if (confirm('Համոզվա՞ծ եք, որ ցանկանում եք ջնջել այս հեղինակին:')) {
      await fetch(`/api/authors/${id}`, { method: 'DELETE' });
      fetchAuthors();
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Հեղինակներ | Առցանց Գրադարան</title>
      </Head>
      
      <div className="page-header">
        <h1 className="page-title" style={{marginBottom: 0}}>Հայտնի Հեղինակներ</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          + Ավելացնել Հեղինակ
        </button>
      </div>
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>Բեռնվում է...</p>
      ) : (
        <div className="grid">
          {authors.map(author => (
            <div key={author.id} className="card">
               <h2 className="card-title">{author.name}</h2>
               <p className="card-subtitle">Երկիր՝ {author.country}</p>
               <p className="card-content">Ժանր՝ {author.genre}</p>
              <div className="card-actions">
                <button className="btn-author-books" onClick={() => handleOpenBooksModal(author)}>Գրքեր</button>
                <button className="btn-secondary" onClick={() => handleOpenModal(author)}>Խմբագրել</button>
                <button className="btn-danger" onClick={() => handleDelete(author.id)}>Ջնջել</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingAuthor ? 'Խմբագրել Հեղինակին' : 'Ավելացնել Նոր Հեղինակ'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Անուն</label>
            <input name="name" value={formData.name} onChange={handleChange} required className="form-input" />
          </div>
           <div className="form-group">
             <label>Երկիր</label>
             <input name="country" value={formData.country} onChange={handleChange} required className="form-input" />
           </div>
           <div className="form-group">
             <label>Ժանր</label>
             <input name="genre" value={formData.genre} onChange={handleChange} required className="form-input" />
           </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={handleCloseModal}>Չեղարկել</button>
            <button type="submit" className="btn-primary">Պահպանել</button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={isBooksModalOpen} 
        onClose={handleCloseBooksModal} 
        title={selectedAuthor ? `${selectedAuthor.name}-ի գրքերը` : 'Հեղինակի գրքերը'}
      >
        {loadingBooks ? (
          <p style={{ textAlign: 'center', padding: '1rem' }}>Բեռնվում է...</p>
        ) : authorBooks.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '1rem', color: '#666' }}>Այս հեղինակի ոչ մի գիրք չի գտնվել համակարգում:</p>
        ) : (
          <ul className="author-books-list">
            {authorBooks.map(book => (
              <li key={book.id} className="author-book-item" onClick={() => router.push(`/books?highlight=${book.id}`)}>
                <span className="book-item-title">{book.title}</span>
                <span className="book-item-year">{book.year} թ.</span>
              </li>
            ))}
          </ul>
        )}
        <div className="form-actions" style={{ marginTop: '1.5rem' }}>
          <button type="button" className="btn-secondary" onClick={handleCloseBooksModal}>Փակել</button>
        </div>
      </Modal>
    </div>
  );
}
