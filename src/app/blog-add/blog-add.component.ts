import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Blog, BlogStatus } from '../blog.model';
import { NgForm } from '@angular/forms';
import BLOGS from '../blog-mock-data';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {
  blogs = BLOGS;
  @Input() post = new Blog(undefined, undefined, undefined, undefined, undefined, undefined, undefined)
  @Output() postEdited = new EventEmitter<Blog>();
  editedPost: Blog;


  isActive = true;

  @ViewChild('form') form: NgForm;

  constructor() { }

  ngOnInit() {
    this.reset();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.post) {
      this.post = new Blog(undefined, undefined, undefined, undefined, undefined, undefined, undefined)
      this.reset();
    }
    if (changes['post'].currentValue !== changes['post'].previousValue) {
      this.reset();
    }
  }

  onSubmit() {
    this.postEdited.emit({ ...this.editedPost});
    this.blogs.push(this.editedPost);

  }

  reset() {
    this.editedPost = { ...this.post };
    this.form.resetForm(this.editedPost);
  }
}
