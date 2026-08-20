const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: [true, 'memberId is required']
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'bookId is required']
    },
    borrowDate: {
      type: Date,
      required: [true, 'borrowDate is required']
    },
    returnDate: {
      type: Date,
      required: [true, 'returnDate is required']
    },
    status: {
      type: String,
      enum: {
        values: ['borrowed', 'returned', 'overdue'],
        message: 'Status must be one of: borrowed, returned, overdue'
      },
      default: 'borrowed'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Borrowing', borrowingSchema);
