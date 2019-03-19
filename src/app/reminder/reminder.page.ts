import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {

  data = { title: '', description: '', date: '', time: '' };

  constructor(public navCtrl: NavController,
    public localNotifications: LocalNotifications,
    public platform: Platform,
    public alertCtrl: AlertController) {}

    ngOnInit() {
    }

/**Method to set notification */
submit(): any {
  const date = new Date(this.data.date + '' + this.data.time);
  this.localNotifications.schedule({
     text: 'Delayed ILocalNotification',
     trigger: { at: new Date(this.data.date + '' + this.data.time) },
     led: 'FF0000',
     sound: this.setSound(),
  });
  this.alertCall(date);
  this.data = { title: '', description: '', date: '', time: '' };
}

/**Method to call alert notitfication */
async alertCall(date) {
  const alert = await this.alertCtrl.create({
    header: 'Reminder',
    subHeader: 'Congratulation',
    message: 'Notification setup successfully at ' + date,
    buttons: ['OK']
  });
  await alert.present();
}

/** Method to set sound track for notification popup */
setSound() {
  if (this.platform.is('android')) {
    return '../../assets/sounds/Rooster.mp3';
  } else {
    return '../../assets/sounds/Rooster.caf';
  }
}


}
