import riot from 'riot';
import styles from './styles.less';
import dispatcher from 'utilities/dispatcher';

riot.tag(
    'feed',

    `
        <div class="{styles.feed}">
            <div class="{styles.card}"
                 each='{ messages }'>
                <div class="{styles.user}">
                    <a class="{styles.avatar}"
                       href="{url}"
                       alt="{name}">
                        <img src="{avatar_url}">
                    </a>
                    <a class="{styles.name}"
                       href="{url}"
                       alt="{name}">
                        {name}
                    </a>
                    <a class="{styles.twitter}"
                       href="{url}"
                       alt="{name}">
                        {twitter}
                    </a>
                </div>
                <div class="{styles.content}">
                    {text}
                </div>
            </div>
        </div>
    `,

    function(opts){
        let feed = this;

        feed.messages = [{
            avatar_url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQbIrWkEMD97RtKdq9BPpZ71fbsmzr7lqyOAxU_L_ILGcy9Tyog',
            url: 'https://www.twitter.com/meanjim',
            name: 'The Best Tester',
            twitter: '@meanjim',
            text: 'holy shit this is a message'
        }];

        dispatcher.on('update_feed_with_message', function(){
            feed.messages.push({
                avatar_url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQbIrWkEMD97RtKdq9BPpZ71fbsmzr7lqyOAxU_L_ILGcy9Tyog',
                url: 'https://www.twitter.com/meanjim',
                name: 'The Best Tester',
                twitter: '@meanjim',
                text: 'holy shit this is a message 2'
            });

            feed.update();
        });

        dispatcher.on('send_message_from_input', function(data){
            feed.messages.push({
                avatar_url: data.twitter.profileImageURL,
                url: '//www.twitter.com/' + data.twitter.username,
                name: data.twitter.displayName,
                twitter: '@' + data.twitter.username,
                text: data.message
            });

            feed.update();
        });

        feed.styles = styles;

        return feed;
    }
);
