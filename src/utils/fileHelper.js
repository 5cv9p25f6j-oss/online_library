import fs from 'fs';
import path from 'path';

/**
 * Saves a base64 encoded file to the public/uploads directory.
 * @param {Object} bookFile - The file object from request { name, type, data }
 * @returns {string|null} The relative URL of the saved file, or null
 */
export function saveFile(bookFile) {
  if (!bookFile || !bookFile.data || !bookFile.name) {
    return null;
  }

  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate unique name
    const timestamp = Date.now();
    const cleanName = bookFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `${timestamp}-${cleanName}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    // Write file from base64
    const buffer = Buffer.from(bookFile.data, 'base64');
    fs.writeFileSync(filePath, buffer);

    return `/uploads/${uniqueFileName}`;
  } catch (error) {
    console.error('Error saving file:', error);
    throw new Error('Failed to save file');
  }
}

/**
 * Deletes a file from the public/uploads directory.
 * @param {string} relativePath - The relative URL of the file (e.g. /uploads/filename)
 */
export function deleteFile(relativePath) {
  if (!relativePath || !relativePath.startsWith('/uploads/')) {
    return;
  }

  try {
    const absolutePath = path.join(process.cwd(), 'public', relativePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}
