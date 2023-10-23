import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client-service.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService, private alertifyService: AlertifyService, private dialog:MatDialog) {

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

    this.openDialog(()=>{
      this.httpClientService.post({
        controller: this.options.controller,
        action: this.options.action,
        queryString: this.options.queryString,
        headers: new HttpHeaders({ "responseType": "blob" })
      }, fileData).subscribe(data => {
        this.alertifyService.message("Dosyalar Başarıyla Yüklendi", {
          messageType: MessageType.Success,
          position: Position.TopRight
        })
      }, (errorResponse: HttpErrorResponse) => {
        this.alertifyService.message("Beklenmedik Hata!", {
          messageType: MessageType.Error,
          position: Position.TopRight
        })
      });
    })
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width: '350px',
      data: FileUploadDialogState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == FileUploadDialogState.Yes) {
        afterClosed();
      }
    });
  }


}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
}