import riot from 'riot';
import styles from './styles.less';
import dispatcher from 'utilities/dispatcher';

riot.tag(
    'app',

    `
        <div class="{styles.content}"
             onclick="{changeText()}">
            {currentText}

            <button onclick="{twitterAuth()}">
                {authText}
            </button>
        </div>
    `,

    function(opts){
        let app = this;

        app.styles = styles;

        app.authText = 'Sign in to twitter';

        app.changeText = function(){
            return function(event){
                return dispatcher.trigger('change_text');
            };
        };

        app.twitterAuth = function(){
            return function(event){
                let ref = new Firebase('https://web-aint-hard.firebaseio.com');

                app.authText = 'Popup is opened';

                ref.authWithOAuthPopup('twitter', function(err, authData) {
                    if (err) {
                        app.authText = 'Try again to sign in to twitter';
                    } else {
                        app.authText = 'You signed in as ' + authData.twitter.username;
                    }

                    app.update();
                });
            };
        };

        app.on('mount', function(){
            dispatcher.trigger('get_text');
        });

        dispatcher.on('change_text_finished', function(choice){
            app.currentText = choice;
            app.update();
        });

        return app;
    }
);
