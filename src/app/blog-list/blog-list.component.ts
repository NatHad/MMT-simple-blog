import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import BLOGS from '../blog-mock-data';
import { Blog, BlogStatus } from '../blog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
   blogs = BLOGS;
   sortedBlogs = BLOGS;
   editedBlog: Blog;

  isShowing15 = false;
  isShowingActivePosts = false;
   constructor(private router: Router) { }
   ngOnInit() {
   this.sortPostsByDate();
  }
  sortPostsByDate() {
    this.blogs = this.blogs.sort((a, b) => {
      if (a.createdAtDate < b.createdAtDate) {
        return 1;
      } else if (a.createdAtDate > b.createdAtDate) {
        return -1;
      }
      return 0;
    });
  }
     navigateToBlog = function () {
      this.router.navigateByUrl('/blog');
};
  onSelect(blog) {
    this.editedBlog = blog;
  }
  deleteBlog(id: number) {
    if (confirm('You are going to delete this.post!')) {
      const index = this.blogs.findIndex(bl => bl.id === id);
      this.blogs.splice(index, 1);
    }
  }
  addBlog(blog: Blog): void {
    this.blogs.push(blog);
  }
  onChange(event: any) {
    this.filterPosts();
  }
  filterPosts() {
    if (!this.isShowing15 && !this.isShowingActivePosts) {
     this.sortedBlogs = this.getAllPosts();
      return;
    }

    if (this.isShowing15 && this.isShowingActivePosts) {
    this.sortedBlogs = this.getLast15ActivePosts();
    } else if (this.isShowing15 && !this.isShowingActivePosts) {
      this.sortedBlogs = this.getLast15Posts();
    } else if (!this.isShowing15 && this.isShowingActivePosts) {
      this.sortedBlogs = this.getAllActivePosts();
    }
  }
  getLast15Posts(): Blog[] {
    const last = this.blogs;
    if (last.length > 15 ) {
      last.splice(0, 15);
    }
    return last;
  }

  getLast15ActivePosts(): Blog[] {
    const last = this.blogs.filter(post => post.status === 'active');
    if (last.length > 15 ) {
      last.splice(0, 15);
    }
    return last;
  }

  getAllActivePosts(): Blog[] {
    const last = this.blogs.filter(post => post.status === 'active');
    return last;
  }

  getAllPosts(): Blog[] {
    return this.blogs;
  }
  }
