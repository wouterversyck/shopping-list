import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigService } from '@core/services/config/config.service';
import { SnackBarService } from '@core/services/snack-bar/snack-bar.service';

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
    this.form = this.formBuilder.group(this.configService.getConfig());
  }

  onSubmit() {
    this.configService.saveConfig(this.form.value);
    this.snackBar.showMessage('Config saved');
  }
}
