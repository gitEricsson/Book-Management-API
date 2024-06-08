// const mongoose = require('mongoose');
// import { Schema, model } from 'mongoose';

export interface BookModel {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
}

// const bookSchema = new Schema<IBookSchema>(
//   {
//     title: {
//       type: String,
//       required: [true, 'Book title is required'],
//       trim: true
//     },
//     author: {
//       type: String,
//       required: [true, 'Book author is required'],
//       trim: true
//     },
//     publishedYear: {
//       type: Number,
//       required: [true, 'Year published is required'],
//       trim: true,
//       validate: {
//         validator: function(val: number) {
//           // this only points to current doc on NEW document creation
//           return val <= new Date().getFullYear();
//         },
//         message: 'The Year ({VALUE}) is not a valid year'
//       }
//     }
//   },
//   {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// const Book = model('Book', bookSchema);

// export default Book;
