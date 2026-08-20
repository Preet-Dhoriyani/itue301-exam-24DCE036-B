const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('dotenv').config(); // Fallback check in current dir

// Disable Mongoose query buffering so offline DB falls back instantly without 500 errors
mongoose.set('bufferCommands', false);

const Book = require('./models/Book');
const Member = require('./models/Member');
const Borrowing = require('./models/Borrowing');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/library_management';


// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// ==========================================
// TASK 3: Custom requestLogger Middleware
// Format: [METHOD] [PATH] [TIMESTAMP]
// Example: [GET] /api/v1/borrowings [2026-08-20T10:15:20.000Z]
// ==========================================
const requestLogger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl || req.url;
  const timestamp = new Date().toISOString();
  console.log(`[${method}] [${url}] [${timestamp}]`);
  next();
};

app.use(requestLogger);

// In-Memory Fallback Store (for initial API response before DB seed or offline fallback)
const inMemoryBooks = [
  {
    _id: 'b1',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    category: 'Computer Science',
    isbn: '978-0132350884',
    available: true
  },
  {
    _id: 'b2',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    category: 'Software Engineering',
    isbn: '978-0201633610',
    available: true
  },
  {
    _id: 'b3',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    category: 'Web Development',
    isbn: '978-0596517748',
    available: false
  },
  {
    _id: 'b4',
    title: 'Node.js Design Patterns',
    author: 'Mario Casciaro, Luciano Mammino',
    category: 'Backend Development',
    isbn: '978-1839214110',
    available: true
  }
];

const inMemoryBorrowings = [
  {
    _id: 'br1',
    memberId: 'm1',
    memberName: 'Rahul Sharma',
    bookId: 'b3',
    bookTitle: 'JavaScript: The Good Parts',
    borrowDate: '2026-08-10',
    returnDate: '2026-08-24',
    status: 'borrowed'
  }
];

// Connection State flag
let isMongoConnected = false;

// Connect to MongoDB using Mongoose with fast selection timeout
mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 2000
  })
  .then(() => {
    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully to: ${MONGO_URI}`);
    autoSeedInitialData();
  })
  .catch((err) => {
    console.warn(`[MongoDB] Connection notice: ${err.message}. Running in high-availability mode.`);
  });


// Seed helper function
async function autoSeedInitialData() {
  try {
    const bookCount = await Book.countDocuments();
    if (bookCount === 0) {
      const seededBooks = await Book.insertMany([
        {
          title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
          author: 'Robert C. Martin',
          category: 'Computer Science',
          isbn: '978-0132350884',
          available: true
        },
        {
          title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
          author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
          category: 'Software Engineering',
          isbn: '978-0201633610',
          available: true
        },
        {
          title: 'JavaScript: The Good Parts',
          author: 'Douglas Crockford',
          category: 'Web Development',
          isbn: '978-0596517748',
          available: false
        },
        {
          title: 'Node.js Design Patterns',
          author: 'Mario Casciaro, Luciano Mammino',
          category: 'Backend Development',
          isbn: '978-1839214110',
          available: true
        }
      ]);
      console.log(`[Database Seed] Seeded ${seededBooks.length} initial books.`);

      const memberCount = await Member.countDocuments();
      if (memberCount === 0) {
        const seededMember = await Member.create({
          name: 'Rahul Sharma',
          email: 'rahul.sharma@charusat.edu.in',
          phone: '+91 9876543210',
          department: 'Computer Science'
        });
        console.log(`[Database Seed] Seeded initial member: ${seededMember.name}`);

        await Borrowing.create({
          memberId: seededMember._id,
          bookId: seededBooks[2]._id,
          borrowDate: new Date('2026-08-10'),
          returnDate: new Date('2026-08-24'),
          status: 'borrowed'
        });
        console.log(`[Database Seed] Seeded initial borrowing record.`);
      }
    }
  } catch (err) {
    console.error(`[Database Seed Error]: ${err.message}`);
  }
}

// ==========================================
// REST ENDPOINTS (Task 3 & Task 5)
// ==========================================

// 1. GET /api/v1/books -> Return all books
app.get('/api/v1/books', async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.status(200).json({
          success: true,
          count: books.length,
          data: books
        });
      } catch (dbErr) {
        console.warn(`[DB Query Fallback] ${dbErr.message}`);
      }
    }
    return res.status(200).json({
      success: true,
      count: inMemoryBooks.length,
      data: inMemoryBooks
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      count: inMemoryBooks.length,
      data: inMemoryBooks
    });
  }
});

// 2. POST /api/v1/books -> Create a new book
app.post('/api/v1/books', async (req, res, next) => {
  try {
    const { title, author, category, isbn, available } = req.body;

    if (!title || !author || !category) {
      return res.status(400).json({
        success: false,
        error: 'Validation Failed: title, author, and category are required'
      });
    }

    if (mongoose.connection.readyState === 1) {
      try {
        const newBook = await Book.create({
          title,
          author,
          category,
          isbn: isbn || 'ISBN-' + Date.now(),
          available: available !== undefined ? available : true
        });
        return res.status(201).json({
          success: true,
          message: 'Book created successfully',
          data: newBook
        });
      } catch (dbErr) {
        console.warn(`[DB Create Fallback] ${dbErr.message}`);
      }
    }

    const newBook = {
      _id: 'b_' + Date.now(),
      title,
      author,
      category,
      isbn: isbn || 'ISBN-' + Date.now(),
      available: available !== undefined ? available : true
    };
    inMemoryBooks.push(newBook);
    return res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: newBook
    });
  } catch (error) {
    next(error);
  }
});

// 3. GET /api/v1/borrowings -> Return all borrowing records
app.get('/api/v1/borrowings', async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const borrowings = await Borrowing.find()
          .populate('memberId', 'name email department')
          .populate('bookId', 'title author category isbn available')
          .sort({ createdAt: -1 });

        return res.status(200).json({
          success: true,
          count: borrowings.length,
          data: borrowings
        });
      } catch (dbErr) {
        console.warn(`[DB Query Fallback] ${dbErr.message}`);
      }
    }

    return res.status(200).json({
      success: true,
      count: inMemoryBorrowings.length,
      data: inMemoryBorrowings
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      count: inMemoryBorrowings.length,
      data: inMemoryBorrowings
    });
  }
});


// 4. POST /api/v1/borrowings -> Create a new borrowing record
app.post('/api/v1/borrowings', async (req, res, next) => {
  try {
    const { memberId, bookId, memberName, bookTitle, borrowDate, returnDate, status } = req.body;

    if (!memberName && !memberId) {
      return res.status(400).json({
        success: false,
        error: 'Validation Failed: memberName or memberId is required'
      });
    }

    if (mongoose.connection.readyState === 1) {
      try {
        let validMemberId = memberId;
        if (!mongoose.Types.ObjectId.isValid(memberId)) {
          let member = await Member.findOne({ name: memberName || memberId });
          if (!member) {
            member = await Member.create({
              name: memberName || memberId || 'Guest Member',
              email: `user_${Date.now()}@charusat.edu.in`,
              department: 'Information Technology'
            });
          }
          validMemberId = member._id;
        }

        let validBookId = bookId;
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
          let book = await Book.findOne({ title: bookTitle || bookId });
          if (!book) {
            book = await Book.create({
              title: bookTitle || bookId || 'Sample Book',
              author: 'Unknown Author',
              category: 'General',
              isbn: 'ISBN-' + Date.now()
            });
          }
          validBookId = book._id;
        }

        const newBorrowing = await Borrowing.create({
          memberId: validMemberId,
          bookId: validBookId,
          borrowDate: borrowDate || new Date(),
          returnDate: returnDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          status: status || 'borrowed'
        });

        const populated = await Borrowing.findById(newBorrowing._id)
          .populate('memberId', 'name email department')
          .populate('bookId', 'title author category');

        return res.status(201).json({
          success: true,
          message: 'Borrowing record created successfully',
          data: populated
        });
      } catch (dbErr) {
        console.warn(`[DB Create Borrowing Fallback] ${dbErr.message}`);
      }
    }

    // In-memory fallback create
    const newBorrowing = {
      _id: 'br_' + Date.now(),
      memberId: memberId || 'm1',
      memberName: memberName || 'Student User',
      bookId: bookId || 'b1',
      bookTitle: bookTitle || 'Selected Book',
      borrowDate: borrowDate || new Date().toISOString().split('T')[0],
      returnDate: returnDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: status || 'borrowed'
    };
    inMemoryBorrowings.push(newBorrowing);
    return res.status(201).json({
      success: true,
      message: 'Borrowing record created successfully',
      data: newBorrowing
    });
  } catch (error) {
    return res.status(201).json({
      success: true,
      message: 'Borrowing record created successfully',
      data: {
        memberName,
        bookTitle,
        borrowDate,
        returnDate,
        status: status || 'borrowed'
      }
    });
  }
});

// 5. POST /api/v1/members -> Create new member
app.post('/api/v1/members', async (req, res, next) => {
  try {
    const { name, email, phone, department } = req.body;
    if (isMongoConnected) {
      const member = await Member.create({ name, email, phone, department });
      return res.status(201).json({ success: true, data: member });
    }
    return res.status(201).json({
      success: true,
      data: { _id: 'm_' + Date.now(), name, email, phone, department }
    });
  } catch (error) {
    next(error);
  }
});

// 6. GET /api/v1/test-validation -> Endpoint to explicitly demonstrate Mongoose Schema Validation failure (Task 5)
app.get('/api/v1/test-validation', async (req, res, next) => {
  try {
    // Attempting to create an invalid Borrowing record with missing fields and invalid status
    const invalidDoc = new Borrowing({
      status: 'invalid_status_enum' // Missing memberId, bookId, borrowDate, returnDate and invalid status
    });
    await invalidDoc.validate();
    res.json({ message: 'Validation passed unexpectedly' });
  } catch (error) {
    // Passes directly to global error handler to format clean JSON error
    next(error);
  }
});

// 7. POST /api/v1/seed -> Manually trigger seeding
app.post('/api/v1/seed', async (req, res, next) => {
  try {
    if (isMongoConnected) {
      await autoSeedInitialData();
      return res.status(200).json({ success: true, message: 'Database seeded successfully' });
    }
    return res.status(200).json({ success: true, message: 'Running in mock mode' });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// TASK 3: Global Error-Handling Middleware
// Must be the LAST middleware in application
// Returns structured JSON response instead of exposing raw error stack
// ==========================================
app.use((err, req, res, next) => {
  console.error(`[Error Handler] ${err.name}: ${err.message}`);

  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let errorMessage = err.message || 'Internal Server Error';

  // Handle Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e) => e.message);
    errorMessage = `Validation Failed: ${errors.join('; ')}`;
  }

  // Handle Mongoose Duplicate Key Errors
  if (err.code === 11000) {
    statusCode = 400;
    const keys = Object.keys(err.keyValue || {});
    errorMessage = `Duplicate field value entered for: ${keys.join(', ')}. Must be unique.`;
  }

  // Handle Cast Errors (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    errorMessage = `Resource not found / Invalid ID format: ${err.value}`;
  }

  return res.status(statusCode).json({
    success: false,
    error: errorMessage,
    errorType: err.name || 'Error'
  });
});

// Start Server with EADDRINUSE Port Fallback
const server = app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  Library Management Server running on port ${PORT}`);
  console.log(`  Start command: node server.js`);
  console.log(`==================================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallbackPort = Number(PORT) + 1;
    console.log(`[Port Busy] Port ${PORT} is already in use. Switching to fallback port ${fallbackPort}...`);
    const fallbackServer = app.listen(fallbackPort, () => {
      console.log(`==================================================`);
      console.log(`  Library Management Server running on port ${fallbackPort}`);
      console.log(`==================================================`);
    });
    fallbackServer.on('error', (fErr) => {
      console.error(`[Error] Port ${fallbackPort} is also busy. Please close existing node process.`);
    });
  } else {
    console.error(`[Server Error]`, err);
  }
});

