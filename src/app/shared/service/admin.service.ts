import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
// const token = JSON.parse(localStorage.getItem('token'));
// const httpOptions: any = {
//   headers: new HttpHeaders({
//     'authorization': 'Bearer ' + token,
//     token: token
//   })
// }
@Injectable({
    providedIn: 'root'
})
export class AdminService implements OnInit {
    apiUrl = environment.endPoint;
    // token;
    // httpOptions;
    constructor(
        private httpClient: HttpClient,
        private router: Router,
        ) {

    }

     ngOnInit() {
      console.log('token======================dsfdsg dsfg dsf ====', this.headerToken());
      }
    // tslint:disable-next-line: typedef
    error(error: HttpErrorResponse) {
        let errorMessage;
        let obj = {};
        if (error.error instanceof ErrorEvent) {
            obj = {
                message: error.error,
                status: error.status,
            };
            errorMessage = obj;
        } else {
            obj = {
                message: error.error,
                status: error.status,
            };
            errorMessage = obj;
        }
      //   if (error.status === 401) {
      //     localStorage.clear();
      //      this.router.navigate(['/login']);
      // } else {

      // }
      return throwError(errorMessage);
    }
    headerToken() {
      const token1 = JSON.parse(localStorage.getItem('token'));
      const httpOptions: any = {
        headers: new HttpHeaders({
          'authorization': 'Bearer ' + token1,
          token: token1
        })
      }

      return httpOptions;
    }

    getservice(): Observable<any> {
        const API_URL = `${this.apiUrl}/getservice`;
        return this.httpClient.get(API_URL)
        .pipe(
            map(res => {
                return res;
            }),
            retry(1),
            catchError(this.error)
            );
    }
    getserviceWithId(id): Observable<any> {
        console.log('id====', id);
        const API_URL = `${this.apiUrl}/getserviceWithId/{id}`;
        return this.httpClient.get(API_URL)
        .pipe(
            map(res => {
                return res;
            }),
            retry(1),
            catchError(this.error)
            );
    }

    login(data): Observable<any> {
        const API_URL = `${this.apiUrl}/admin_login`;
      return this.httpClient.post(API_URL, data)
        .pipe(
            map(res => {
                return res;
            }),
            retry(1),
            catchError(this.error)
            );
    }

    GetAdminDetails(): Observable<any> {
        const API_URL = `${this.apiUrl}/get_admin_detail`;
        return this.httpClient.get(API_URL, this.headerToken())
        .pipe(
            map(res => {
                return res;
            }),
            retry(1),
            catchError(this.error)
            );
    }

    profileUpdate(data): Observable<any> {
        const API_URL = `${this.apiUrl}/edit_admin_detail`;
        console.log(API_URL);
        return this.httpClient.post(API_URL, data, this.headerToken())
        .pipe(
            map(res => {
                return res;
            }),
            retry(1),
            catchError(this.error)
            );
    }
    changePassword(data): Observable<any> {
        const API_URL = `${this.apiUrl}/change_admin_password`;
        return this.httpClient.post(API_URL, data, this.headerToken())
        .pipe(
            map(res => {
                return res;
            }),
            retry(1),
            catchError(this.error)
            );
    }

    forgotPassword(data): Observable<any> {
        const API_URL = `${this.apiUrl}/admin-forgot-password`;
        return this.httpClient.post(API_URL, data)
        .pipe(
            map(res => {
                return res;
            }),
            retry(1),
            catchError(this.error)
            );
    }

    resetPassword(data): Observable<any> {
        const API_URL = `${this.apiUrl}/admin-reset-password`;
        return this.httpClient.post(API_URL, data)
        .pipe(
            map(res => {
                return res;
            }),
            retry(1),
            catchError(this.error)
            );
    }

    addCategoryName(data): Observable<any> {
      const API_URL = `${this.apiUrl}/add-category-name`;
      return this.httpClient.post(API_URL, data, this.headerToken())
      .pipe(
          map(res => {
              return res;
          }),
          retry(1),
          catchError(this.error)
          );
  }



    addUser(data): Observable<any> {
        const API_URL = `${this.apiUrl}/add-user`;
        return this.httpClient.post(API_URL, data, this.headerToken())
        .pipe(
            map(res => {
                return res;
            }),
            retry(1),
            catchError(this.error)
            );
    }


    userDetails(data): Observable<any> {
        const API_URL = `${this.apiUrl}/get-user-profile`;
        return this.httpClient.post(API_URL, data, this.headerToken())
        .pipe(
            map(res => {
                return res;
            }),
            retry(1),
            catchError(this.error)
            );
    }
    editUser(data): Observable<any> {
        const API_URL = `${this.apiUrl}/edit-user`;
        return this.httpClient.post(API_URL, data, this.headerToken())
        .pipe(
            map(res => {
                return res;
            }),
            retry(1),
            catchError(this.error)
            );
    }
    deleteUser(data): Observable<any> {
        const API_URL = `${this.apiUrl}/delete-user`;
        return this.httpClient.post(API_URL, data, this.headerToken())
        .pipe(
            map(res => {
                return res;
            }),
            retry(1),
            catchError(this.error)
            );
    }

    DeleteMultipleUsers(data): Observable<any> {
        const API_URL = `${this.apiUrl}/delete-multiple-category`;
        return this.httpClient.post(API_URL, data,this.headerToken())
        .pipe(
            map(res => {
                return res;
            }),
            retry(1),
            catchError(this.error)
            );
    }

/* add new service */

  changeStatusCategory(data): Observable<any> {
    const API_URL = `${this.apiUrl}/status-active-inactive`;
    return this.httpClient.post(API_URL, data,this.headerToken())
    .pipe(
        map(res => {
            return res;
        }),
        retry(1),
        catchError(this.error)
        );
    }
/* end category service */

/* start content about us, privacy policy, term and condition service */
AddContent(data): Observable<any> {
  const API_URL = `${this.apiUrl}/create-content`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }

UpdateContent(data): Observable<any> {
  const API_URL = `${this.apiUrl}/save-update-content`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
    map(res => {
      return res;
    }),
    retry(1),
    catchError(this.error)
    );
  }

GetAllContent(): Observable<any> {
  const API_URL = `${this.apiUrl}/get-allcontent`;
  return this.httpClient.get(API_URL, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );

    }

/* end content about us, privacy policy, term and condition service */

/* start FAQ's service */
AddFAQ(data): Observable<any> {
  const API_URL = `${this.apiUrl}/add-faq`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }

GetFAQListData(data): Observable<any> {
  const API_URL = `${this.apiUrl}/get-faq-list`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
    map(res => {
      return res;
    }),
    retry(1),
    catchError(this.error)
    );
  }

EditFAQ(data): Observable<any> {
  const API_URL = `${this.apiUrl}/edit-faq`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
    }

DeleteFAQ(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-faq`;
  return this.httpClient.post(API_URL, data,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }

DeleteMultipleFAQ(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-multiple-faq`;
  return this.httpClient.post(API_URL, data,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }

/* end FAQ's service */

/* start Contact Us service */
AddContactUs(data): Observable<any> {
  const API_URL = `${this.apiUrl}/add-contact-us`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }

GetContactUsListData(data): Observable<any> {
  const API_URL = `${this.apiUrl}/get-contactus-list`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
    map(res => {
      return res;
    }),
    retry(1),
    catchError(this.error)
    );
  }

DeleteContactUs(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-contact-us`;
  return this.httpClient.post(API_URL, data,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }

DeleteMultipleContactUs(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-multiple-contactus`;
  return this.httpClient.post(API_URL, data,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }

ContactUsReply(data): Observable<any> {
  const API_URL = `${this.apiUrl}/contactUs-reply`;
  return this.httpClient.post(API_URL, data,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }

/* end Contact Us service */



/* start Promo code service */
AddPromoCode(data): Observable<any> {
  const API_URL = `${this.apiUrl}/add-promo-code`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }

GetPromoCodeListData(data): Observable<any> {
  const API_URL = `${this.apiUrl}/get-promo-code-list`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
    map(res => {
      return res;
    }),
    retry(1),
    catchError(this.error)
    );
  }

EditPromoCode(data): Observable<any> {
  const API_URL = `${this.apiUrl}/edit-promo-code`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
    }

DeletePromoCode(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-promo-code`;
  return this.httpClient.post(API_URL, data,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }

DeleteMultiplePromoCode(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-multiple-promo-code`;
  return this.httpClient.post(API_URL, data,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }

/* end Promo code service */

/* end Dashboard service */
GetDashboardDataCard(): Observable<any> {
  const API_URL = `${this.apiUrl}/get-dashboard-card`;
  return this.httpClient.get(API_URL,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }

/* end Dashboard service */



/* start Menus service */
AddCMS(data): Observable<any> {
  const API_URL = `${this.apiUrl}/add-CMS`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }

GetCMSListData(data): Observable<any> {
  const API_URL = `${this.apiUrl}/get-CMS-list`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
    map(res => {
      return res;
    }),
    retry(1),
    catchError(this.error)
    );
  }

EditCMS(data): Observable<any> {
  const API_URL = `${this.apiUrl}/edit-CMS`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
    }

DeleteCMS(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-CMS`;
  return this.httpClient.post(API_URL, data,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }


/* end Menus service */


/***************************
 * Call Common Service APIs *
 ***************************/

 changeStatusAllUsers(data): Observable<any> {
  const API_URL = `${this.apiUrl}/status-active-inactive`;
  return this.httpClient.post(API_URL, data,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
  }
/***************************
 * End Common Service APIs *
 ***************************/

/***************************
 * Call User user apis *
 ***************************/

UserListData(data): Observable<any> {
  const API_URL = `${this.apiUrl}/get_user_list`;
  console.log(API_URL)
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

AddUser(data): Observable<any> {
  const API_URL = `${this.apiUrl}/register_user`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

UserDetails(data): Observable<any> {
  const API_URL = `${this.apiUrl}/edit_user`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

EditUser(data): Observable<any> {
  const API_URL = `${this.apiUrl}/edit_user`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

DeleteUser(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-user`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

DeleteMultipleUser(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-multiple-user`;
  return this.httpClient.post(API_URL, data,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

/***************************
 * end User user apis *
 ***************************/


/***************************
 * Call Service apis *
 ***************************/

 ServiceListData(data): Observable<any> {
  const API_URL = `${this.apiUrl}/get_service_list`;
  console.log(API_URL)
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

AddService(data): Observable<any> {
  const API_URL = `${this.apiUrl}/add_service`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}


EditService(data): Observable<any> {
  const API_URL = `${this.apiUrl}/edit_service`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

DeleteService(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-service`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

DeleteMultipleService(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-multiple-service`;
  return this.httpClient.post(API_URL, data,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

/***************************
 * end HomeInspect user apis *
 ***************************/

/***************************
 * Call Event apis *
 ***************************/

 EventListData(data): Observable<any> {
  const API_URL = `${this.apiUrl}/get_event_list`;
  console.log(API_URL)
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

AddEvent(data): Observable<any> {
  const API_URL = `${this.apiUrl}/add_event`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}


EditEvent(data): Observable<any> {
  const API_URL = `${this.apiUrl}/edit_event`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

DeleteEvent(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-event`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

DeleteMultipleEvent(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-multiple-event`;
  return this.httpClient.post(API_URL, data,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

/***************************
 * end Eventr apis *
 ***************************/

/***************************
 * Call Room apis *
 ***************************/

 RoomListData(data): Observable<any> {
  const API_URL = `${this.apiUrl}/get_room_list`;
  console.log(API_URL)
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

AddRoom(data): Observable<any> {
  const API_URL = `${this.apiUrl}/add_room`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}


EditRoom(data): Observable<any> {
  const API_URL = `${this.apiUrl}/edit_room`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

DeleteRoom(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-room`;
  return this.httpClient.post(API_URL, data, this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

DeleteMultipleRoom(data): Observable<any> {
  const API_URL = `${this.apiUrl}/delete-multiple-room`;
  return this.httpClient.post(API_URL, data,this.headerToken())
  .pipe(
      map(res => {
          return res;
      }),
      retry(1),
      catchError(this.error)
      );
}

/***************************
 * end Roomr apis *
 ***************************/

}
