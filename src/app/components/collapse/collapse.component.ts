import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  standalone: true,
  imports: []
})
export class CollapseComponent {

  @Input() title: string = ''
}
