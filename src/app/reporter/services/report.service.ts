import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable()
export class ReportService {
  constructor(private http: HttpClient) {
  }

  getReports(start: string, end: string) {
    return this.http.get(environment.api + `reports/${start},${end}/`);
  }
}
