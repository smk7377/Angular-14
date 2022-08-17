import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router,RouterStateSnapshot, UrlTree, NavigationEnd, NavigationStart } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})

export class AuthorizationGuard implements CanActivate {


    constructor(private router: Router){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const user = JSON.parse(JSON.stringify(localStorage.getItem("User")));
        if(user){
            let userdata = JSON.parse(JSON.stringify(user));
            let userRole = JSON.parse(userdata)[0].role;
            if (route.data.role && route.data.role.indexOf(userRole) === -1) {
                this.router.navigate(['/home']);
                return false;
              }            
            return true;                        
        }        
        this.router.navigate(['login']);
        return false;
    }

}