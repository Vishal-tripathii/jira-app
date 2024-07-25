import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  @Input() searchTerm: string = '';
  @Input() searchRoute: string = 'search';

  constructor(private _router: Router) { }

  ngOnInit(): void { }

  search(term: string): void {
    if (term) {
      this._router.navigate([`/${this.searchRoute}`, term]);
    }
  }

}
