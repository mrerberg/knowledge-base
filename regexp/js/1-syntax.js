'use strict';

{ console.log('Do you know abc?'.match(/abc/)); }

{
    const rx = /[a-z]+a[a-z]+/g; // man, can
    console.log('A man can die but once'.match(rx));
}

{
    const rx = /\sg\w*/g; // great, greatness, greatness
    const str =
        'Some are born great, ' +
        'some achieve greatness, ' +
        'and some have greatness thrust upon them.';
    console.log(str.match(rx));
}

{
    const rx = /.u../g; // such much
    const str = '— Such much? — For whom how';
    console.log(str.match(rx));
}

{
    const rx = /[^l] /g; // g, e, f
    const str = 'Nothing will come of nothing';
    console.log(str.match(rx));
}

{
    const rx = /^\+?\d{11}$/g;
    const str = '+79160912964';
    console.log(str.match(rx));
}

{
    const rx  = /\d+ (days|hours)/g
    const str = '5 days';
    console.log(str.match(rx));
}
