import riot from 'riot';
import styles from './styles.less';
import dispatcher from 'utilities/dispatcher';

riot.tag(
    'actions',

    `
        <div class="{styles.actions}">
            <div class="{styles.actions_login}"
                 if="{ !finishedAuthorization }"
                 onclick="{twitterAuthentication()}">
                {authText}
            </div>

            <div class="{styles.user_box}"
                 if="{ finishedAuthorization }">
                <img src="{twitter.profileImageURL}">
                <input class="{styles.message_input}"
                       type="text"
                       onkeyup='{sendMessage()}'
                       placeholder="Begin typing here...">
            </div>
        </div>
    `,

    function(opts){
        let actions = this;

        actions.finishedAuthorization = false;
        actions.styles = styles;
        actions.twitter = null;
        actions.authText = 'login using twitter';

        actions.twitterAuthentication = function(){
            return function(event){
                let firebaseReference = new Firebase('https://web-aint-hard.firebaseio.com');

                actions.authText = 'authorizing...';

                firebaseReference.authWithOAuthPopup('twitter', function(error, authData) {
                    if (error) {
                        return dispatcher
                            .trigger('attempting_authorization');
                    } else {
                        actions.twitter = authData.twitter;

                        return dispatcher
                            .trigger('successful_authorization', authData.twitter);
                    }
                });
            };
        };

        actions.sendMessage = function(){
            return function(event){
                if (event.keyCode === 13) {
                    dispatcher.trigger('send_message_from_input', {
                        message: event.target.value,
                        twitter: actions.twitter
                    });

                    event.target.value = null;
                }
            };
        };

        dispatcher.on('attempting_authorization', function(){
            actions.authText = 'authorizing...';
            actions.update();
        });

        dispatcher.on('successful_authorization', function(twitter){
            actions.twitter = twitter;
            actions.finishedAuthorization = true;
            actions.authText = 'Welcome ' + twitter.username + '!';
            actions.update();
        });

        return actions;
    }
);
