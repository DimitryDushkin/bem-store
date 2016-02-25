### Пример

```javascript
// Новое хранилище всегда наследуется от базового i-store
BEM.decl({ block: 'i-my-store', baseBlock: 'i-store' }, {

   onSetMod: {
       js: function() {
           this.__base.apply(this, arguments);

           this.setInitialState({
               text: ''
           });

           this.setActions([
               ['update-text', this._onUpdateText]
           ]);
       }
   },

   _onUpdateText: function(e, text) {
       this.state = this.state.set('text', text);
   }

});

// Создадим хранилище, оно сделано по типу singleton.
BEM.create('i-my-store');

// Визуальный блок слушает событие обновления store
BEM.DOM.decl('results', {

   onSetMod: {

       js: function() {
           this.store = BEM.blocks['i-my-store'].getInstance();
           this.store.on('updated', this._onStoreUpdate, this);
           this.state = this.store.getState();
       }

   },

   _onStoreUpdate: function(e, state) {
       // Проверяем, что если поменялось предыдущее значение state.text,
       // то перерисуем представление
       if (this.state.get('text') !== state.get('text')) {
           BEM.DOM.update(this.elem('text-container', text);
       }

       // Не забываем сохранить новое состояние
       this.state = state;
   }

});
```
