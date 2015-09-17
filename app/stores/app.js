import riot from 'riot';
import firebase from 'utilities/firebase';
import values from 'lodash.values';

module.exports = function(){
    riot.observable(this);

    let app = this;
    const fb = firebase();

    app.on('init', function () {
        fb.child('messages').on('value', function (snap) {
            app.trigger('feed_messages', values(snap.val()));
        });
    });

    app.on('save_message', function (msg) {
        const newMsg = fb.child('messages').push();
        newMsg.set(msg);
    });

    return app;
};
