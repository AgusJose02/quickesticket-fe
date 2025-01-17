import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  decodeToken(token: string | null): JwtPayload | null {
    if (!token) { token = ''}
    try {
      return jwtDecode<JwtPayload>(token)
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null
    }
  }
  
  getPayloadField(token: string | null, field: string): any {
    const payload = this.decodeToken(token);
    return payload ? (payload as any)[field] : null;
  }
}
