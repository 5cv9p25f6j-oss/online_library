import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '../components/Modal';

export default function Genres() {
  const router = useRouter();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);
  
  const [formData, setFormData] = useState({
    name: ''
  });

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreBooks, setGenreBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [isBooksModalOpen, setIsBooksModalOpen] = useState(false);

  const handleOpenBooksModal = async (genre) => {
    setSelectedGenre(genre);
    setIsBooksModalOpen(true);
    setLoadingBooks(true);
    try {
      const res = await fetch('/api/books');
      const data = await res.json();
      const allBooks = Array.isArray(data) ? data : data.books || [];
      const filtered = allBooks.filter(b => b.genre && b.genre.trim().toLowerCase() === genre.name.trim().toLowerCase());
      setGenreBooks(filtered);
    } catch (e) {
      console.error(e);
      setGenreBooks([]);
    } finally {
      setLoadingBooks(false);
    }
  };

  const handleCloseBooksModal = () => {
    setIsBooksModalOpen(false);
    setSelectedGenre(null);
    setGenreBooks([]);
  };

  const fetchGenres = () => {
    setLoading(true);
    fetch('/api/genres')
      .then(res => res.json())
      .then(data => {
        setGenres(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleOpenModal = (genre = null) => {
    if (genre) {
      setEditingGenre(genre);
      setFormData({
        name: genre.name
      });
    } else {
      setEditingGenre(null);
      setFormData({ name: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingGenre ? 'PUT' : 'POST';
    const url = editingGenre ? `/api/genres/${editingGenre.id}` : '/api/genres';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    handleCloseModal();
    fetchGenres();
  };

  const handleDelete = async (id) => {
    if (confirm('\u0540\u0561\u0574\u0578\u0566\u057e\u0561\u055e\u056e \u0565\u0584, \u0578\u0580 \u0581\u0561\u0576\u056f\u0561\u0576\u0578\u0582\u0574 \u0565\u0584 \u057b\u0576\u057b\u0565\u056c \u0561\u0575\u057d \u056a\u0561\u0576\u0580\u0568:')) {
      await fetch(`/api/genres/${id}`, { method: 'DELETE' });
      fetchGenres();
    }
  };

  return (
    <div className="container">
      <Head>
        <title>{'\u053a\u0561\u0576\u0580\u0565\u0580 | \u0531\u057c\u0581\u0561\u0576\u0581 \u0533\u0580\u0561\u0564\u0561\u0580\u0561\u0576'}</title>
      </Head>
      
      <div className="page-header">
        <h1 className="page-title" style={{marginBottom: 0}}>{'\u0533\u0580\u0561\u056f\u0561\u0576 \u053a\u0561\u0576\u0580\u0565\u0580'}</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          + {'\u0531\u057e\u0565\u056c\u0561\u0581\u0576\u0565\u056c \u053a\u0561\u0576\u0580'}
        </button>
      </div>
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>{'\u0532\u0565\u057c\u0576\u057e\u0578\u0582\u0574 \u0567...'}</p>
      ) : (
        <div className="grid">
          {genres.map(genre => (
            <div key={genre.id} className="card">
              <h2 className="card-title">{genre.name}</h2>
              <div className="card-actions">
                <button className="btn-author-books" onClick={() => handleOpenBooksModal(genre)}>{'\u0533\u0580\u0584\u0565\u0580'}</button>
                <button className="btn-secondary" onClick={() => handleOpenModal(genre)}>{'\u053d\u0574\u0562\u0561\u0563\u0580\u0565\u056c'}</button>
                <button className="btn-danger" onClick={() => handleDelete(genre.id)}>{'\u054b\u0576\u057b\u0565\u056c'}</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingGenre ? '\u053d\u0574\u0562\u0561\u0563\u0580\u0565\u056c \u053a\u0561\u0576\u0580\u0568' : '\u0531\u057e\u0565\u056c\u0561\u0581\u0576\u0565\u056c \u0546\u0578\u0580 \u053a\u0561\u0576\u0580'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{'\u0531\u0576\u0578\u0582\u0576'}</label>
            <input name="name" value={formData.name} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={handleCloseModal}>{'\u0549\u0565\u0572\u0561\u0580\u056f\u0565\u056c'}</button>
            <button type="submit" className="btn-primary">{'\u054a\u0561\u0570\u057a\u0561\u0576\u0565\u056c'}</button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={isBooksModalOpen} 
        onClose={handleCloseBooksModal} 
        title={selectedGenre ? `${selectedGenre.name} \u056a\u0561\u0576\u0580\u056b \u0563\u0580\u0584\u0565\u0580\u0568` : '\u053a\u0561\u0576\u0580\u056b \u0563\u0580\u0584\u0565\u0580\u0568'}
      >
        {loadingBooks ? (
          <p style={{ textAlign: 'center', padding: '1rem' }}>{'\u0532\u0565\u057c\u0576\u057e\u0578\u0582\u0574 \u0567...'}</p>
        ) : genreBooks.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '1rem', color: '#666' }}>{'\u0531\u0575\u057d \u056a\u0561\u0576\u0580\u056b\u0576 \u0570\u0561\u0574\u0561\u057a\u0561\u057f\u0561\u057d\u056d\u0561\u0576 \u0563\u056b\u0580\u0584 \u0579\u056b \u0563\u057f\u0576\u057e\u0565\u056c \u0570\u0561\u0574\u0561\u056f\u0561\u0580\u0563\u0578\u0582\u0574:'}</p>
        ) : (
          <ul className="author-books-list">
            {genreBooks.map(book => (
              <li key={book.id} className="author-book-item" onClick={() => router.push(`/books?highlight=${book.id}`)}>
                <span className="book-item-title">{book.title}</span>
                <span className="book-item-year">{book.year} {'\u0569.'}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="form-actions" style={{ marginTop: '1.5rem' }}>
          <button type="button" className="btn-secondary" onClick={handleCloseBooksModal}>{'\u0553\u0561\u056f\u0565\u056c'}</button>
        </div>
      </Modal>
    </div>
  );
}
