/* global:Immutable */

/**
 * Базовый блок хранилища состояния приложения
 * В проекте должен быть подключен Immutable.js 3.7.x
 */
BEM.decl('i-store', {

    onSetMod: {
        js: function() {
            this.__self.instance = this;
        }
    },

    setInitialState: function(state) {
        this.state = Immutable.fromJS(state);
        this.isDebugEnabled = location.href.indexOf('debugStore') !== -1;
    },

    getState: function() {
        return this.state;
    },

    triggerStoreUpdate: function() {
        this.trigger('updated', this.state);
        this.isDebugEnabled && console.log('Current state: ', this.state.toJS());
    },

    /**
     * Helper for batch add event listners
     * Also decorates actions with auto triggerStoreUpdate() and logging
     * @param {Array} actions - [[<action_name>, <handler>], ...]
     */
    setActions: function(actions) {
        var eventName,
            eventHandler;

        for (var i = 0; i < actions.length; i++) {
            eventName = actions[i][0];
            eventHandler = actions[i][1];
            this.on(eventName, this._getHandler(eventName, eventHandler), this);
        }
    },

    _getHandler: function(name, handler) {
        var isDebug = this.isDebugEnabled;

        return function() {
            isDebug && console.log('Action: ', name);

            handler.apply(this, arguments);
            this.triggerStoreUpdate();
        };
    }

}, {

    getInstance: function() {
        return this.instance;
    }

});
