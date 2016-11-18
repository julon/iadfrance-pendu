import {homeComponent} from './home/home.component';
import {PenduService} from './pendu/pendu.service';
import {penduComponent} from './pendu/pendu.component';
import {penduHeaderComponent} from './pendu-header/pendu-header.component';
import {penduAnswerComponent} from './pendu-answer/pendu-answer.component';
import {penduKeyComponent} from './pendu-key/pendu-key.component';
import routesConfig from './routes';

angular
  .module('iadfrance.pendu', ['ui.router', 'ngAnimate', 'ngMaterial'])
  .config(routesConfig)
  .service('PenduService', PenduService)
  .component('home', homeComponent)
  .component('pendu', penduComponent)
  .component('penduHeader', penduHeaderComponent)
  .component('penduAnswer', penduAnswerComponent)
  .component('penduKey', penduKeyComponent);
