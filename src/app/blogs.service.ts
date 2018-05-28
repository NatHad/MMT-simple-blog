import {map, catchError} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BLOGS from './blog-mock-data';
import { Blog, BlogStatus } from './blog.model';
import { Observable, of } from 'rxjs';

const API_URL = `/api`;
export interface BlogsResponse {
  data: Blog[];
}
export interface BlogResponse {
  data: Blog;
}
@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor() { }
    getBlogs(): Observable<Blog[]> {
    return of(BLOGS);
  }
  getBlog(id): Observable<Blog> {
    const index = +id;
 return of(BLOGS.find(blog => blog.id === index));
  }
  create(blog: Blog): Observable<Blog> {
     BLOGS.push(blog);
     return of(blog);
  }
  update(blog: Blog): Observable<Blog> {
  const index = BLOGS.findIndex(prod => prod.id === blog.id);
  BLOGS.splice(index, 1, blog);
  return of(BLOGS.find(bl => bl.id === index));

  }
}

