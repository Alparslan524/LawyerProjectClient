import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client-service.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent extends BaseComponent {

  constructor(private httpClientService: HttpClientService, private alertifyService: AlertifyService, private dialog: MatDialog,
    private dialogService: DialogService, spinner: NgxSpinnerService) {
    super(spinner)
  }

  @Input() options: Partial<FileUploadOptions>;

  public files: NgxFileDropEntry[];

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        {
          this.showSpinner(SpinnerType.SquareJellyBox);
          this.httpClientService.post({
            controller: this.options.controller,
            action: this.options.action,
            queryString: this.options.queryString,
            headers: new HttpHeaders({ "responseType": "blob" })
          }, fileData).subscribe(data => {
            this.hideSpinner(SpinnerType.SquareJellyBox);
            this.alertifyService.message("Dosyalar Başarıyla Yüklendi", {
              messageType: MessageType.Success,
              position: Position.TopRight
            })
          }, (errorResponse: HttpErrorResponse) => {
            this.hideSpinner(SpinnerType.SquareJellyBox);
            this.alertifyService.message("Beklenmedik Hata!", {
              messageType: MessageType.Error,
              position: Position.TopRight
            })
          });
        }
      }
    })
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
}