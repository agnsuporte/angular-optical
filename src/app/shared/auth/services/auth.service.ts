import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

import { config } from '../../../config';
import { UtilService } from '../../services/util.service';

interface UserLogged {
  id: number;
  name: string;
  username: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'OPTICAL_TOKEN';

  private loggedUser: string;

  constructor(private http: HttpClient, private util: UtilService) {}

  login(user: { email: string; password: string }): Observable<boolean> {
    return this.http
      .post<any>(`${config.apiUrl}/user/sign`, {
        userEmail: user.email,
        userPassword: user.password,
      })
      .pipe(
        tap((data) => this.doLoginUser(data)),
        mapTo(true),
        catchError((error) => {
          if (!error.signAt) {
            this.util.showMessage(
              'Credenciais incorretas. Por favor, verifique-as e tente novamente.',
              true
            );
          }
          return of(false);
        })
      );
  }

  logout(): void {
    this.doLogoutUser();
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getJwtHeardOptions(): HttpHeaders {
    let loggedToken: string;
    const logged = this.isLoggedIn();

    if (logged) {
      loggedToken = this.getJwtToken();
    } else {
      loggedToken = null;
    }

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loggedToken}`,
      }),
    };

    return options;
  }

  private doLoginUser(data: UserLogged): void {
    this.loggedUser = data.username;
    this.storeJwtToken(data.token);
  }

  private doLogoutUser(): void {
    this.loggedUser = null;
    this.removeJwtToken();
  }

  private storeJwtToken(jwt: string): void {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private removeJwtToken(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
