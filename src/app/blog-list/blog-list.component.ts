import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import BLOGS from '../blog-mock-data';
import { Blog, BlogStatus } from '../blog.model';
import { Router } from '@angular/router';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[];
  sortedBlogs: Blog[];
  editedBlog: Blog;
  isShowing15 = false;
  isShowingActivePosts = false;
   constructor(private router: Router, private blogsService: BlogsService) { }
   getBlogs(): void {
    this.blogsService.getBlogs()
    .subscribe(
      blogs => this.blogs = blogs,
      );
    }
   ngOnInit() {
   this.getBlogs();
   this.sortedBlogs = this.blogs;
     }
  sortPostsByDate() {
    if (this.blogs) {
      this.blogs = this.blogs.sort((a, b) => {
        if (a.createdAtDate < b.createdAtDate) {
          return 1;
        } else if (a.createdAtDate > b.createdAtDate) {
          return -1;
        }
        return 0;
      });
    }
  }
  editBlog(blog: Blog) {
   this.router.navigate([ '/blog', blog.id]);

  }

  onSelect(blog) {
    this.editedBlog = blog;
  }
  deleteBlog(id: number) {
    if (confirm('You are going to delete this.post!')) {
      const index = this.blogs.findIndex(bl => bl.id === id);
      this.blogs.splice(index, 1);
    }
  }
  onChange(event: any) {
    console.log(this.isShowing15);
    this.filterPosts();
  }
  filterPosts() {
    if (!this.isShowing15 && !this.isShowingActivePosts) {
      this.sortedBlogs = this.blogs;
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
      return last.splice(0, 15);
    }
  }

  getLast15ActivePosts(): Blog[] {
    const last = this.blogs.filter(post => post.status === 'active');
    if (last.length > 15 ) {
      return last.splice(0, 15);
    }
  }

  getAllActivePosts(): Blog[] {
    const last = this.blogs.filter(post => post.status === 'active');
    console.log(last);
    return last;
  }
}
