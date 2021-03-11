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
  isLoggedIn: boolean;
  menuItens: MenuItem[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.menuItens = [
      { label: 'Cabos', linkTo: 'cables' },
      { label: 'Dispositivos', linkTo: 'devices' },
      { label: 'Rede', linkTo: 'networks' },
    ];
  }

  isHandset(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay()
    );
  }

  onLogoff(): void {
    this.auth.logout();
    this.isLoggedIn = false;
  }
}
