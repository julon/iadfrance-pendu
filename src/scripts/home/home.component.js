import {title} from '../data';

/** @ngInject */
class HomeController {
    $onInit() {
        this.title = title;
    }
}

export const homeComponent = {
    templateUrl: 'build/scripts/home/home.component.html',
    controller: HomeController
};
