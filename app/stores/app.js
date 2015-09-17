import riot from 'riot';

module.exports = function(){
    riot.observable(this);

    let app = this;

    return app;
};
