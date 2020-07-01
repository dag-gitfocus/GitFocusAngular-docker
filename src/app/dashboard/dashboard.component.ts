import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { GitserviceModule } from '../gitservice/gitservice.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'ng2-charts';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Commitcount: any;
  userName: string;
  Commitcount_data: any;
  userlist: any;
  BarChart: any;
  barChartOptions: any;
  today :any;
  user: string;
  time: string;
  repo: string;
  repoList: any;
  result: any;
  barChartLabels: any[];
  barChartType: string;
  barChartLegend: boolean;

  flag: string;
  bubbleflag: string;
  commDate: string;
  selectedValue: string;
  @ViewChild('mychart', { static: true }) mychart;
  branch:string='';
  map=new Map<String, String[]>();
  branchList:any;
  userList:any;

  
  public barChartData: any[] = [
    { data: [], label: "Commit" },
    { data: [], label: "Pull Request" },
  ]
  
  public barChartColors: Color[] = [
    { backgroundColor: 'red' },
    { backgroundColor: 'blue' }
  ]

  barflag: any;
  endDate: string;
  constructor(private gitService: GitserviceModule, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
     

    this.gitService.getRepoList().subscribe((repodata) => {
      this.repoList = repodata;    
      // console.log("repo",this.repoList);
    });

    this.flag = this.route.snapshot.paramMap.get('flag');
    if (this.flag != null) {
      
      this.repo=this.route.snapshot.paramMap.get('repo');     
      this.getUserList();
      this.getBranchListSpecificToRepo();

    }

    this.bubbleflag = this.route.snapshot.paramMap.get('bubbleflag');
    if (this.bubbleflag != null) {
      this.user = this.route.snapshot.paramMap.get('user');
      this.repo = this.route.snapshot.paramMap.get('repo');
      this.getUserList();
      this.getBranchListSpecificToRepo();
      this.commDate = this.route.snapshot.paramMap.get('commDate');
      this.endDate = this.route.snapshot.paramMap.get('endDate');
      this.time = this.route.snapshot.paramMap.get('time');
      this.branch = this.route.snapshot.paramMap.get('branch');
      this.getCommitCountDetailsWeek();
    }
    

  }
  
  getToday(): string {
    return new Date().toISOString().split('T')[0]
    }
  
  getUserList() {
    this.gitService.getUserList(this.repo).subscribe((res) => {
      this.userlist = res;
    });
  }

  setRepo(selectedrepo: string) {
    this.repo = selectedrepo;
    this.getUserList();  
    this.getBranchListSpecificToRepo();
  }

  getBranchListSpecificToRepo(){
    this.gitService.getBranchListSpecificToRepo(this.repo).subscribe((output)=>{
      this.map = output;
      this.branchList=this.map[this.repo];
    });
  }
 

  showDailyActivity() {
    this.commDate = this.result[this.selectedValue].day;
    this.router.navigate(['dailyusercommitlist', this.user, this.repo, this.commDate, this.time,this.endDate,this.branch]);

  } 
  

  getCommitCountDetailsWeek()  {
    var Dates = [];
    var userlabel = '';
    var commitCounts = [];
    var pullCounts = [];
    this.barChartLabels = Dates;
    this.barChartType = 'bar';
    this.barChartLegend = true;

    this.barChartOptions = {
      scales: {
        yAxes: [{           
          ticks: {
            stepSize: 1,
            beginAtZero: true,
          },

        }]
      },
      scaleShowVerticalLines: false,
      responsive: true,

    
      onClick: (event, item) => {
        if (item.length == 0)
          return;
 
          let indexValue = item[0]["_index"];          
          this.selectedValue = indexValue;
          this.showDailyActivity();
        
    
        }
    
    }

    
    this.gitService.getCommitCountByEndDate(this.repo,this.user,this.time,this.endDate,this.branch).subscribe((res)=>{
      this.result = res;
      
      if(res!=null || res!=undefined){
  
      for(let response of res)
      {
        Dates.push(response.day);
        userlabel = this.user;
        commitCounts.push(response.count);
        }
      }
      this.barChartData[0].data = commitCounts;     
      
    });

    this.gitService.getPullCount(this.repo,this.user,this.time,this.endDate,this.branch).subscribe((pull)=>{      this.result = pull;
      
      if(pull!=null || pull!=undefined){       
      for(let response of pull)
      {      
        userlabel = this.user;
        pullCounts.push(response.count)
        }
      }
      this.barChartData[1].data = pullCounts;     
      
    });

  }

}