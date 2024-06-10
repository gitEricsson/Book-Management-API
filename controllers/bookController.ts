export {};

import { BookModel } from './../models/bookModel';
import { AppError } from './../utils/appError';
import { Request, Response, NextFunction } from 'express';

let Books: Array<BookModel> = [];

export class bookController {
  public static getAllBooks = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const doc: any = Books;

    if (doc.length < 1) {
      return next(new AppError('No Book found!', 400));
    }

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: { data: doc }
    });
  };

  public static getBook = (req: Request, res: Response, next: NextFunction) => {
    const book: any = Books.find(book => +book.id === +req.params.book_id);

    if (!book) {
      return next(new AppError('No Book found!', 400));
    }

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: book.length,
      data: { data: book }
    });
  };

  public static createBook = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id: Number = Date.now();

    const book: BookModel = { id: id, ...req.body };

    if (req.body.publishedYear > new Date().getFullYear())
      return next(
        new AppError(
          `The Year ${req.body.publishedYear} is not a valid year`,
          400
        )
      );

    Books.push(book);

    res.status(201).json({
      status: 'success',
      data: {
        data: book
      }
    });
  };

  public static updateBook = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let book: any = Books.find(book => +book.id === +req.params.book_id);

    if (!book) {
      return next(new AppError('No Book found with that ID', 404));
    }

    // Year Validation
    if (
      req.body.publishedYear &&
      req.body.publishedYear > new Date().getFullYear()
    )
      return next(
        new AppError(
          `The Year ${req.body.publishedYear} is not a valid year`,
          400
        )
      );

    // Delete from array
    Books.forEach((book, i) => {
      if (+req.params.book_id === book.id) {
        Books.splice(i, 1);
      }
    });

    Object.keys(req.body).forEach((key: any) => {
      console.log(book);
      book[key] = req.body[key];
    });

    Books.push(book);

    res.status(200).json({
      status: 'success',
      data: {
        data: book
      }
    });
  };

  public static deleteBook = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Books = Books.filter((book: any) => {
      return +book.id !== +req.params.book_id;
    });

    res.status(204).json({
      status: 'success',
      data: null
    });
  };
}
