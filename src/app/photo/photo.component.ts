import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'photo-selector',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  /* Buradaki 'photo' değişkeni diğer bir component olan app.component tarafından buraya gönderilecek.
  Dolayısıyla burada bu değişkeni @Input() belirteçini koyarak tanımladım. */
  @Input()
  photo: WebcamImage;

  // JavaScript'teki document.getElementById() yapısının Angular'daki karşılığı ViewChild yapısı.
  @ViewChild('myImg') myImg;

  // Bu array kaydedilmiş fotoğrafları tutacak.
  savedPhotos: Array<any>;

  // EventEmitter yardımıyla savedPhotos array'ini app component'a göndereceğim.
  @Output() savedPhotosEvent = new EventEmitter<Array<any>>();

  // Bu değişken rotate işleminde bana yardımcı olacak.
  rotationCounter: number = 1;

  // Bu iki değişken bilgisayara indirilen ekran görüntüsünün sıralı bir şekilde isimlendirilmesinde kullanılacak.
  fileName: string;
  fileCounter: number = 1;  

  constructor() {
    this.savedPhotos = [];
  }

  ngOnInit(): void {
  }

  saveImg(): void {
    this.savedPhotos.push(this.photo);  // Kaydedilen fotoğrafı 'savedPhotos' isimli array'e push ettim.
    this.savedPhotosEvent.emit(this.savedPhotos); // EventEmitter aracılığıyla photo component içindeki savedPhotos array'ini app component'a yolladım.
    this.photo = null; // Ekran görüntüsü kaydedildikten sonra ekranın sağındaki card'ın kaybolmasını sağlayacak. 
  }

  /* 'counter' değişkeninin kaç olduğuna bağlı olarak fotoğrafın o an ki açısı hakkında bilgi sahibi olmuş oluyorum.
  Daha sonra da o açıya göre döndürme işlemini yapıyorum. */
  rotateImg(): void {
    if (this.rotationCounter == 1) {
      this.myImg.nativeElement.style.transform = "rotate(90deg)";
      this.rotationCounter++;
    }
    else if (this.rotationCounter == 2) {
      this.myImg.nativeElement.style.transform = "rotate(180deg)";
      this.rotationCounter++;
    }
    else if (this.rotationCounter == 3) {
      this.myImg.nativeElement.style.transform = "rotate(270deg)";
      this.rotationCounter++;
    }
    else if (this.rotationCounter == 4) {
      this.myImg.nativeElement.style.transform = "rotate(0deg)";
      this.rotationCounter = 1;
    }
  }

  // Bu metot bilgisayara indirilen ekran görüntülerini sıralı bir şekilde isimlendirecek.
  changeName(): void {
    this.fileName = "ekran-goruntusu-"+this.fileCounter+".jpg";
    this.fileCounter++;
  }
}
