# [mithril-guide-code] (https://github.com/eddyystop/mithril-guide-code)

Working code examples from 
[mithril.js] (https://github.com/lhorie/mithril.js) Guide and other docs.

## Installation
1. Install [Nodejs] (http://http://nodejs.org/). 
npm will automatically be installed also.
 
2. Install the server's dependencies by running ```npm install``` 
from the repo's directory.

## Start server
1. Run ```node app.js``` from the repo's directory.

2. You will get the message 
```Express server listening on port 3000 in development mode```

3. Run the sample code by pointing your browser to 
```localhost:3000/<code sample name..html```

## UI Components
- [Table - responsive] (#table-responsive) - A responsive table.


## Docs

### <a name="UI"></a>UI Components


***


### <a name="table-responsive"></a>Table responsive - mc.TableResponsive

```js
$(window).on('resize', function () {
  m.startComputation();
  m.endComputation();
});
  
var app = {
  controller: function () {
    var table = [ ['heading 1', 'heading 2', 'heading 3'], [1, 2, 3], [...] ];

    // a plain table
    this.tableScrollable1 = new mc.TableResponsive.controller(table);

    // a table responsive to viewport width
    this.tableScrollable2 = new mc.TableResponsive.controller(table, {
      isPlain: function () { return $(window).width() >= 767; }
    });
  },

  view: function (ctrl) {
    return m('div', [
      mc.TableResponsive.view(ctrl.tableScrollable1),
      mc.TableResponsive.view(ctrl.tableScrollable2)
    ]);
  }
};
  
m.module(document.body, app);
```


## License
Copyright (c) 2014 John Szwaronek (<johnsz9999@gmail.com>).
Distributed under the MIT license. See LICENSE.md for details.