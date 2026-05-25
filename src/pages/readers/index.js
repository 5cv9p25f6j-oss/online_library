import Head from 'next/head';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';

export default function Readers() {
  const [readers, setReaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReader, setEditingReader] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    joinedDate: '',
    active: true
  });

  const fetchReaders = () => {
    setLoading(true);
    fetch('/api/readers')
      .then(res => res.json())
      .then(data => {
        setReaders(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReaders();
  }, []);

  const handleOpenModal = (reader = null) => {
    if (reader) {
      setEditingReader(reader);
      setFormData({
        name: reader.name,
        email: reader.email,
        joinedDate: reader.joinedDate ? new Date(reader.joinedDate).toISOString().substring(0, 10) : '',
        active: reader.active
      });
    } else {
      setEditingReader(null);
      setFormData({ name: '', email: '', joinedDate: new Date().toISOString().substring(0, 10), active: true });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingReader ? 'PUT' : 'POST';
    const url = editingReader ? `/api/readers/${editingReader.id}` : '/api/readers';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        joinedDate: new Date(formData.joinedDate)
      })
    });

    handleCloseModal();
    fetchReaders();
  };

  const handleDelete = async (id) => {
    if (confirm('Համոզվա՞ծ եք, որ ցանկանում եք ջնջել այս ընթերցողին:')) {
      await fetch(`/api/readers/${id}`, { method: 'DELETE' });
      fetchReaders();
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Ընթերցողներ | Առցանց Գրադարան</title>
      </Head>
      
      <div className="page-header">
        <h1 className="page-title" style={{marginBottom: 0}}>Մեր Ընթերցողները</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          + Ավելացնել Ընթերցող
        </button>
      </div>
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>Բեռնվում է...</p>
      ) : (
        <div className="grid">
          {readers.map(reader => (
            <div key={reader.id} className="card">
              <h2 className="card-title">{reader.name}</h2>
              <p className="card-subtitle">
                Ակտիվ: {reader.active ? 'Այո' : 'Ոչ'} | Միացել է: {new Date(reader.joinedDate).toLocaleDateString('hy-AM')}
              </p>
              <p className="card-content">Էլ. հասցե: {reader.email}</p>
              <div className="card-actions">
                <button className="btn-secondary" onClick={() => handleOpenModal(reader)}>Խմբագրել</button>
                <button className="btn-danger" onClick={() => handleDelete(reader.id)}>Ջնջել</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingReader ? 'Խմբագրել Ընթերցողին' : 'Ավելացնել Նոր Ընթերցող'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Անուն</label>
            <input name="name" value={formData.name} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label>Էլ. հասցե</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label>Միանալու Ամսաթիվ</label>
            <input type="date" name="joinedDate" value={formData.joinedDate} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} id="activeCheck" />
            <label htmlFor="activeCheck" style={{margin: 0}}>Ակտիվ</label>
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
