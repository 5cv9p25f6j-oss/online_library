import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '../../components/Modal';

export default function Books() {
  const router = useRouter();
  const { highlight } = router.query;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    year: '',
    description: '',
    language: '',
    genre: '',
    bookFile: null,
    deleteFile: false
  });

  const [selectedBookText, setSelectedBookText] = useState(null);
  const [readingBook, setReadingBook] = useState(null);
  const [readerFontSize, setReaderFontSize] = useState(18);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({
        ...prev,
        deleteFile: false,
        bookFile: {
          name: file.name,
          type: file.type,
          data: reader.result.split(',')[1]
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setFormData(prev => ({
      ...prev,
      bookFile: null,
      deleteFile: true
    }));
  };

  const handleReadBook = async (book) => {
    setReadingBook(book);
    setSelectedBookText('Բեռնվում է...');
    try {
      const response = await fetch(book.filePath);
      if (!response.ok) throw new Error('Չհաջողվեց բեռնել գիրքը');
      const text = await response.text();
      setSelectedBookText(text);
    } catch (error) {
      setSelectedBookText('Չհաջողվեց բեռնել գրքի տեքստը։ Խնդրում ենք համոզվել, որ ֆայլը հասանելի է։');
    }
  };

  const handleCloseReader = () => {
    setReadingBook(null);
    setSelectedBookText(null);
  };

  const fetchBooks = () => {
    setLoading(true);
    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        // Support both array response and object with "books" field
        setBooks(Array.isArray(data) ? data : data.books || []);
        setLoading(false);
      });
  };

  const getSortedBooks = () => {
    // Ensure we always work with an array to avoid "not iterable" errors
    const sorted = Array.isArray(books) ? [...books] : [];
    if (sortBy === 'title') {
      return sorted.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'hy'));
    }
    if (sortBy === 'author') {
      return sorted.sort((a, b) => (a.authorName || '').localeCompare(b.authorName || '', 'hy'));
    }
    if (sortBy === 'year-asc') {
      return sorted.sort((a, b) => (a.year || 0) - (b.year || 0));
    }
    if (sortBy === 'year-desc') {
      return sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
    }
    return sorted;
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (highlight && !loading && books.length > 0) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`book-card-${highlight}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [highlight, loading, books]);

  const handleOpenModal = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        title: book.title,
        authorName: book.authorName,
        year: book.year,
        description: book.description,
        language: book.language || '',
        genre: book.genre || '',
        bookFile: null,
        deleteFile: false
      });
    } else {
      setEditingBook(null);
      setFormData({ 
        title: '', 
        authorName: '', 
        year: '', 
        description: '', 
        language: '',
        genre: '',
        bookFile: null,
        deleteFile: false 
      });
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
      
      <div style={{ margin: '1rem 0 2rem 0', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <label htmlFor="sortSelect" style={{ fontWeight: '600', color: '#666' }}>Սորտավորել ըստ՝</label>
        <select 
          id="sortSelect" 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="form-input" 
          style={{ width: 'auto', padding: '0.4rem 1.5rem 0.4rem 0.8rem', borderRadius: '8px', cursor: 'pointer' }}
        >
          <option value="default">Լռելյայն</option>
          <option value="title">Վերնագրի (Ա-Ֆ)</option>
          <option value="author">Հեղինակի (Ա-Ֆ)</option>
          <option value="year-asc">Տարեթվի (Աճման)</option>
          <option value="year-desc">Տարեթվի (Նվազման)</option>
        </select>
      </div>
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>Բեռնվում է...</p>
      ) : (
        <div className="grid">
          {getSortedBooks().map(book => (
            <div 
              key={book.id} 
              id={`book-card-${book.id}`}
              className={`card ${highlight && highlight.toString() === book.id.toString() ? 'highlighted-card' : ''}`}
            >
              <h2 className="card-title">{book.title}</h2>
              <p className="card-subtitle">
                {book.authorName} - {book.year} {book.language ? `| Լեզու՝ ${book.language}` : ''} {book.genre ? `| Ժանր՝ ${book.genre}` : ''}
              </p>
              <p className="card-content">{book.description}</p>
              <div className="card-actions">
                {book.filePath && (
                  book.filePath.endsWith('.txt') ? (
                    <button className="btn-read" onClick={() => handleReadBook(book)}>Կարդալ</button>
                  ) : (
                    <a href={book.filePath} download className="btn-download" target="_blank" rel="noreferrer">
                      Ներբեռնել
                    </a>
                  )
                )}
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
            <label>Լեզու</label>
            <input name="language" value={formData.language} onChange={handleChange} required className="form-input" />
          </div>
          <div className="form-group">
            <label>Ժանր</label>
            <input name="genre" value={formData.genre} onChange={handleChange} className="form-input" />
          </div>
          <div className="form-group">
            <label>Նկարագրություն</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-textarea"></textarea>
          </div>
          <div className="form-group">
            <label>Գրքի ֆայլ (նախընտրելի է .txt, կամ .pdf, .epub)</label>
            {editingBook && editingBook.filePath && !formData.deleteFile && (
              <div className="current-file-info">
                <span className="current-file-text">Ներկայիս ֆայլը՝ </span>
                <a href={editingBook.filePath} target="_blank" rel="noreferrer" className="current-file-link">
                  {editingBook.filePath.split('/').pop()}
                </a>
                <button type="button" onClick={handleRemoveFile} className="btn-remove-file" title="Ջնջել ֆայլը">
                  ✕
                </button>
              </div>
            )}
            
            {(!editingBook || !editingBook.filePath || formData.deleteFile) ? (
              formData.bookFile ? (
                <div className="selected-file-info">
                  <span className="file-icon">📄</span>
                  <span className="file-name">{formData.bookFile.name}</span>
                  <button type="button" onClick={handleRemoveFile} className="btn-remove-file" title="Չեղարկել">
                    ✕
                  </button>
                </div>
              ) : (
                <div className="file-upload-wrapper">
                  <input 
                    type="file" 
                    id="book-file-input"
                    onChange={handleFileChange} 
                    className="file-upload-input"
                    accept=".txt,.pdf,.epub"
                  />
                  <label htmlFor="book-file-input" className="file-upload-label">
                    <span className="upload-icon">📂</span>
                    <span className="upload-text">Ընտրել ֆայլ կամ քաշել այստեղ</span>
                    <span className="upload-hint">Միայն տեքստային կամ PDF ֆայլեր (ոչ պարտադիր)</span>
                  </label>
                </div>
              )
            ) : null}
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={handleCloseModal}>Չեղարկել</button>
            <button type="submit" className="btn-primary">Պահպանել</button>
          </div>
        </form>
      </Modal>

      {readingBook && selectedBookText !== null && (
        <div className="reader-overlay" onClick={handleCloseReader}>
          <div className="reader-container" onClick={e => e.stopPropagation()}>
            <div className="reader-header">
              <h2>{readingBook.title}</h2>
              <div className="reader-controls">
                <button onClick={() => setReaderFontSize(prev => Math.max(12, prev - 2))} title="Փոքրացնել տառատեսակը" className="btn-font-control">A-</button>
                <span className="reader-font-size">{readerFontSize}px</span>
                <button onClick={() => setReaderFontSize(prev => Math.min(32, prev + 2))} title="Մեծացնել տառատեսակը" className="btn-font-control">A+</button>
                <button className="btn-close-reader" onClick={handleCloseReader}>✕</button>
              </div>
            </div>
            <div className="reader-content" style={{ fontSize: `${readerFontSize}px` }}>
              {selectedBookText.split('\n').map((para, i) => (
                <p key={i} className="reader-para">{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
