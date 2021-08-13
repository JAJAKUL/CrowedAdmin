import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { UnderconstructionComponent } from './views/error/underconstruction.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    data: {
      title: 'Forgot Page'
    }
  },

  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule),
    data: {
      title: 'Reset Page'
    }
  },
  {
    path: 'header',
    component: DefaultLayoutComponent,
    data: {
      title: 'Header'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'admin-profile',
        loadChildren: () => import('./admin-profile/admin-profile.module').then(m => m.AdminProfileModule),
        data: {
          title: 'Admin Profile'
        }
      },

      {
        path: 'manage-cms',
        loadChildren: () => import('./mange-cms/mange-cms.module').then(m => m.MangeCmsModule),
        data: {
          title: 'manage cms web site content'
        }
      },
      {
        path: 'page-underconstruction',
        component: UnderconstructionComponent,
        data: {
          title: 'Under Construction'
        }
      },


      {
        path: 'contact-us',
        loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule),
        data: {
          title: 'contact-us'
        }
      },
      {
        path: 'about-us',
        loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule),
        data: {
          title: 'about-us'
        }
      },
      {
        path: 'privacy-policy',
        loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule),
        data: {
          title: 'privacy-policy'
        }
      },
      {
        path: 'terms-condition',
        loadChildren: () => import('./terms-condition/terms-condition.module').then(m => m.TermsConditionModule),
        data: {
          title: 'terms-condition'
        }
      },
      {
        path: 'faq-content',
        loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule),
        data: {
          title: 'Faq'
        }
      },
      {
        path: 'manage-user',
        loadChildren: () => import('./layouts/user-manage/user-manage.module').then(m => m.UserManageModule),
        data: {
          title: 'User'
        }
      },
      {
        path: 'event-manage',
        loadChildren: () => import('./layouts/event-manage/event-manage.module').then(m => m.EventManageModule),
        data: {
          title: 'Event'
        }
      },
      {
        path: 'coupon-manage',
        loadChildren: () => import('./layouts/coupon-manage/coupon-manage.module').then(m => m.CouponManageModule),
        data: {
          title: 'Coupon'
        }
      },
      {
        path: 'room-manage',
        loadChildren: () => import('./layouts/room-manage/room-manage.module').then(m => m.RoomManageModule),
        data: {
          title: 'Room'
        }
      },



    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
