import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-pdf-form',
  templateUrl: './pdf-form.component.html',
  styleUrls: ['./pdf-form.component.scss']
})
export class PdfFormComponent implements OnInit {

  headerTitle!: string;
  section1Title!: string;
  section1ImageUrl!: string;
  section1Desc!: string;
  // ... Declara aquí las demás variables para otras secciones ...

  footerText!: string;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private readonly messageService: MessagesService,
    private _storaged: SessionStorageService,
    ) { }


    ngOnInit(): void {

  }

  public async sendToAPI() {
    // Construye el contenido HTML basado en los datos del formulario
    let htmlContent = `<head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Plantilla con Secciones</title><body><header><h1>${this.headerTitle}</h1></header><section class='section-1'><h2>${this.section1Title}</h2><img src='${this.section1ImageUrl}' alt='Imagen de la Sección 1'><p>${this.section1Desc}</p></section><!-- Aquí irían las demás secciones... --><footer><p>${this.footerText}</p></footer></body>`;



    const res = await this.saveInformacion(
      '/Pdf/convert',
      { html: htmlContent }
    );
    console.log("Que hay", res);
    if (res == false) {
      this.messageService.error(
        'Error',
        'No se pudo enviar el template'
      );
      this.messageService.info(
        'Atención',
        'Revise que todos los campos requeridos o contacte con un administrador '
      );
    } else {
      this.messageService.success(
        'Template enviado',
        'Los datos serán usados para generar e formato pdf'
      );

    }
}

// private async saveInformation(service: string, document: any): Promise<any> {
//     return new Promise((resolve, reject) => {
//         this.apiService.saveInformacion(service, document).subscribe({
//             next: (v) => resolve(v),
//             error: (e) => {
//                 console.error(e);
//                 resolve(null);
//             }
//         });
//     });
// }
private async saveInformacion(
  service: string,
  document: any

): Promise<any> {
  return new Promise((resolve, reject) => {
    this.apiService.saveInformacion(service, document).subscribe({

      next: (v) => resolve(v),
      error: (e) => {
        console.info(e);
        resolve(0);
      },
    });
  });
}
}


