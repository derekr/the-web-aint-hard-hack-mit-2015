import riot from 'riot';
import styles from './styles.less';

riot.tag(
    'app',

    `
        <div class="{styles.content}">
             <feed></feed>
             <actions></actions>
        </div>
    `,

    function(opts){
        let app = this;

        app.styles = styles;

        return app;
    }
);
