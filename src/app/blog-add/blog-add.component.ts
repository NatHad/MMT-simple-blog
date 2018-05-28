import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Blog, BlogStatus } from '../blog.model';
import { NgForm } from '@angular/forms';
import { BlogsService } from '../blogs.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/internal/operators/filter';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit, OnChanges {
  @Input() post = new Blog(undefined, undefined, undefined, undefined, undefined, undefined, undefined)
  @Output() postChange = new EventEmitter<Blog>();
  editedPost: Blog;
  isNewPost = false;
  isActive = true;
blogs: Blog[];
id: number;
  @ViewChild('form') form: NgForm;

  constructor( private blogsService: BlogsService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    // this.route.params.subscribe(res => console.log(res.id));
      this.route.paramMap.pipe(
      map(parmMap => parmMap.get('id') as string),
      filter(id => !!id),
      switchMap(id => this.blogsService.getBlog(id))
    ).subscribe(
      post => {
        this.post = post || this.post,
        this.reset();
      },
    );
    this.reset();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.post || !this.post.id) {
      this.isNewPost = true;
      this.post = new Blog(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
      this.reset();
    }
    if (changes['post'].currentValue !== changes['post'].previousValue) {
      this.reset();
    }
  }
  onSubmit() {
    this.postChange.emit({ ...this.editedPost});
    if (this.post && this.post.id) {
      this.blogsService.update({...this.editedPost})
      .subscribe(
        post => {
          this.post = post;
          this.router.navigate(['/list']);
        }
      );
    } else {
      this.blogsService.create({...this.editedPost})
       .subscribe( post => {
        this.post = post;
        this.router.navigate(['/list']);
      }
      );
      }
 }
  reset() {
    this.editedPost = { ...this.post };
    this.form.resetForm(this.editedPost);
  }
}
