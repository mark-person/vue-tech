import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

var hljs = require('highlight.js');
import python from 'highlight.js/lib/languages/python';
// import 'highlight.js/styles/monokai-sublime.css'
import 'highlight.js/styles/idea.css'
import 'github-markdown-css'



var marked = require('marked');

marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
          // return code;
          return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    }
);


// 使用md文件
Vue.prototype.md2html = (md)=> {
  // let converter = new showdown.Converter();
  let text = md.toString();

  // console.log("marked text...:" + text)
  let html = marked(text);
  // console.log("marked html...:" + html)
  return html
};



