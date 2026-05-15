# Developer Setup

## 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

---

## 2. Create Environment Variables

Create a `.env` file in the project root.

```env
PORT=5500
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Run the Server

```bash
npm run dev
```

The server will start on:

```text
http://localhost:5500
```

---

# API Testing

## Upload Job Description (JD)

### Endpoint

```http
POST /api/jd/upload
```

### cURL Example

```bash
curl --location 'http://localhost:5500/api/jd/upload' \
--form 'jd=@"/path/to/jd.pdf"'
```

### Sample Response

```json
{
  "success": true,
  "data": {
    "fileName": "jd.pdf",
    "extractedText": "Looking for an experienced Full Stack Developer..."
  }
}
```

---

## Upload Resume

### Endpoint

```http
POST /api/resume/upload
```

### cURL Example

```bash
curl --location 'http://localhost:5500/api/resume/upload' \
--form 'resume=@"/path/to/resume.pdf"'
```

### Sample Response

```json
{
  "success": true,
  "data": {
    "fileName": "resume.pdf",
    "extractedText": "Experienced Full Stack Developer with..."
  }
}
```

---

# Supported File Formats

- PDF (`.pdf`)
- Word Document (`.docx`)

---

# Notes

- Ensure the `src/uploads/` directory exists before uploading files.
- Maximum file size configuration can be added in the multer middleware.
- Uploaded files are currently stored locally.
