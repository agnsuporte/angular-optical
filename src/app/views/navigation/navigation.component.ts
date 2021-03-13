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
  isLogged: boolean;
  menuItens: MenuItem[];
  isHandset: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.setHandset();
    this.setMenuItens();
    this.isLogged = this.auth.isLoggedIn();
  }

  onLogoff(): void {
    this.auth.logout();
    this.isLogged = false;
  }

  private setMenuItens(): void {
    this.menuItens = [
      { label: 'Cabos', linkTo: 'cables' },
      { label: 'Dispositivos', linkTo: 'devices' },
      { label: 'Rede', linkTo: 'networks' },
    ];
  }

  private setHandset(): void {
    this.isHandset = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay()
    );
  }
}
