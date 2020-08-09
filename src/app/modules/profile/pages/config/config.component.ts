import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigService, Theme } from '@core/services/config/config.service';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private configService: ConfigService,
    private snackBar: SnackBarService) { }

  ngOnInit(): void {
    const initialFormVal: any = this.configService.getConfig();
    initialFormVal.theme = initialFormVal.theme === Theme.dark;
    this.form = this.formBuilder.group(initialFormVal);

    this.form.valueChanges
      .pipe(
        tap(e => e.theme ? e.theme = Theme.dark : e.theme = Theme.light),
        tap(_ => this.snackBar.showMessage('Config saved'))
      )
      .subscribe(e => this.configService.saveConfig(e));
  }
}
