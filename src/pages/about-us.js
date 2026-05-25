import Head from 'next/head';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';

export default function AboutUs() {
  const [aboutUsInfo, setAboutUsInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInfo, setEditingInfo] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const fetchAboutUs = () => {
    setLoading(true);
    fetch('/api/about-us')
      .then(res => res.json())
      .then(data => {
        setAboutUsInfo(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  const handleOpenModal = (info = null) => {
    if (info) {
      setEditingInfo(info);
      setFormData({
        title: info.title,
        content: info.content
      });
    } else {
      setEditingInfo(null);
      setFormData({ title: '', content: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingInfo ? 'PUT' : 'POST';
    const url = editingInfo ? `/api/about-us/${editingInfo.id}` : '/api/about-us';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    handleCloseModal();
    fetchAboutUs();
  };

  const handleDelete = async (id) => {
    if (confirm('Համոզվա՞ծ եք, որ ցանկանում եք ջնջել այս տեղեկատվությունը:')) {
      await fetch(`/api/about-us/${id}`, { method: 'DELETE' });
      fetchAboutUs();
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Մեր մասին | Առցանց Գրադարան</title>
      </Head>
      
      <div className="page-header">
        <h1 className="page-title" style={{marginBottom: 0}}>Մեր մասին</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          + Ավելացնել Տեղեկություն
        </button>
      </div>
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>Բեռնվում է...</p>
      ) : (
        <div className="grid">
          {aboutUsInfo.map(info => (
            <div key={info.id} className="card">
              <h2 className="card-title">{info.title}</h2>
              <p className="card-content">{info.content}</p>
              <div className="card-actions">
                <button className="btn-secondary" onClick={() => handleOpenModal(info)}>Խմբագրել</button>
                <button className="btn-danger" onClick={() => handleDelete(info.id)}>Ջնջել</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingInfo ? 'Խմբագրել' : 'Ավելացնել Տեղեկություն'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Վերնագիր</label>
            <input name="title" value={formData.title} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label>Բովանդակություն</label>
            <textarea name="content" value={formData.content} onChange={handleChange} required className="form-textarea"></textarea>
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
