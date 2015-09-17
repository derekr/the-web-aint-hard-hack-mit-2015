import riot from 'riot';
import 'components';
import 'firebase';
import AppStore from 'stores/app';
import dispatcher from 'utilities/dispatcher';

dispatcher.addStore(new AppStore());
dispatcher.trigger('init');

riot.mount('app');
