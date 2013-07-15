
# model-firebase

  Firebase adapter for [`component/model`](https://github.com/component/model).

## Installation

    $ component install segmentio/model-firebase

## API

```js
var firebase = require('model-firebase')('https://USERNAME.firebaseio.com/people/')
  , model = require('model');

var Person = model('person')
  .use(firebase)
  .attr('name');
```

## License

  MIT
