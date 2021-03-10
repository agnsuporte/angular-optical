import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth/services/auth.service';

interface MenuItem {
  linkTo: string;
  label: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  _isLogged: Boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this._isLogged = this.auth.isLoggedIn();
  }

  isHandset: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  menuItens: MenuItem[] = [
    { label: 'Cabos', linkTo: 'cables' },
    { label: 'Dispositivos', linkTo: 'devices' },
    { label: 'Rede', linkTo: 'networks' },
  ];

  onLogoff() {
    this.auth.logout();
    this._isLogged = false;
  }
}
