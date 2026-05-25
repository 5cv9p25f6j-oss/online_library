import Head from 'next/head';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    birthYear: '',
    biography: ''
  });

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
        birthYear: author.birthYear,
        biography: author.biography
      });
    } else {
      setEditingAuthor(null);
      setFormData({ name: '', birthYear: '', biography: '' });
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
              <p className="card-subtitle">Ծննդյան թիվ: {author.birthYear}</p>
              <p className="card-content">{author.biography}</p>
              <div className="card-actions">
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
            <label>Ծննդյան թիվ</label>
            <input type="number" name="birthYear" value={formData.birthYear} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label>Կենսագրություն</label>
            <textarea name="biography" value={formData.biography} onChange={handleChange} className="form-textarea"></textarea>
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
