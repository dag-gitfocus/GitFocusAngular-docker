import { NgModule } from '@angular/core';
import { Routes, CanActivate, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { BubbleComponent } from './bubble/bubble.component';
import { CommitDetailsComponent } from './commit-details/commit-details.component';
import { UsersComponent } from './users/users.component';
import { PullDetailsComponent } from './pull-details/pull-details.component';
import { PullReviewDetailsComponent } from './pull-review-details/pull-review-details.component';
import { WorklogComponent } from './worklog/worklog.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './utils/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'worklog', component: WorklogComponent, canActivate: [AuthGuard] },
  { path: 'worklog/:unit/:team/:repo/:timeperiod/:endDate/:worklogflag', component: WorklogComponent, canActivate: [AuthGuard] },
  { path: 'projecttimeline', component: BubbleComponent, canActivate: [AuthGuard] },
  { path: 'dailyusercommitlist/:teams/:team/:timeperiod/:endDate/:user/:repo/:commitDate', component: BubbleComponent, canActivate: [AuthGuard] },
  { path: 'repositories', component: RepositoriesComponent, canActivate: [AuthGuard] },
  { path: 'commitdetails/:user/:repo/:commDate/:time/:endDate/:branch', component: CommitDetailsComponent, canActivate: [AuthGuard] },
  { path: 'userdetails', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'pullrequests', component: PullDetailsComponent, canActivate: [AuthGuard] },
  { path: 'pullrequests/:repo/:fromDate/:endDate/:flag', component: PullDetailsComponent, canActivate: [AuthGuard] },
  { path: 'pulldetails/:repo/:fromDate/:endDate', component: PullReviewDetailsComponent, canActivate: [AuthGuard] },
  { path: 'sessiontimeout', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
