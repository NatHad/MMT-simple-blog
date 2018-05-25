import { Component, OnInit, Input } from '@angular/core';
import {Blog, BlogStatus} from '../blog.model';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent implements OnInit {

  @Input() newBlog: Blog;

  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }
  getStatusText(blog): string {
    return BlogStatus[blog.status];
  }
}
