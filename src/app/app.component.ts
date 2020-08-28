import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']   
})
export class AppComponent {

   // 'photo' değişkeni çekilen fotoğrafı tutuyor olacak.
   // WebcamImage değişken tipi kullandığımız ngx-webcam component'ı sayesinde geldi.
   photo: WebcamImage = null;

   // Bu array EventEmitter aracılığıyla photo component'tan gelecek.
   savedPhotos: Array<any>;

   // Subject yapısı RxJS kütüphanesi aracılığıyla gelen bir yapı ve bir çeşit Observable olarak nitelendirilebilir.
   photoTaker: Subject<void> = new Subject<void>();

   takePhoto(): void {
      this.photoTaker.next();
   }

   // Bu metot çekilen fotoğrafı parametre olarak alıp, 'photo' değişkeninin içine atacak.
   getImage(webcamImage: WebcamImage): void {
      this.photo = webcamImage;
   }

   /* Subject yapısını kullandığımız zaman eğer o yapıyı bir metot içerisinde return edeceksek,
      'asObservable()' fonksiyonu yardımıyla bir Observable'a çevirerek return etmeliyiz. */
   public get photoTakerObservable(): Observable<void> {
      return this.photoTaker.asObservable();
   }

   // photo component'tan gelen savedPhotos bu fonksiyon içinde alınacak.
   receiveSavedPhotos($event) {
      this.savedPhotos = $event;
   }
}