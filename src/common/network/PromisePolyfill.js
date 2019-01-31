import Promise from 'promise-polyfill';

//这里把系统的Promise替换程了promise-polyfill的版本，为了不同浏览器之间的兼容性
window.Promise = Promise;
