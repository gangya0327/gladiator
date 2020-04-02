var xtag = (function(global, factory, plug) {
  return (global[plug] = factory.call());
})(
  this,
  function() {
    var __DEFS = {
      lifecycle: {},
      methods: {}
    };
    var __C__ = {
      register: function(tagName, options) {
        console.log("tagName ", tagName);
        console.log("options ", options);

        this.__tn__ = tagName || "";
        // 写三条，保证健壮性
        this.__ops__ = options = options || __DEFS;
        options.lifecycle = options.lifecycle || __DEFS.lifecycle;
        options.methods = options.methods || __DEFS.methods;

        this.init();
      },
      init: function() {
        var that = this;
        var thatDoc = document;
        var thisDoc = document.currentScript.ownerDocument;
        var template = thisDoc.querySelector("template").content;
        var element = Object.create(HTMLElement.prototype); // 基于html元素的原型创建对象
        element.createdCallback = function() {
          var shadowRoot = this.createShadowRoot(); // 创建shadow root节点
          var clone = document.importNode(template, true);

          shadowRoot.appendChild(clone); // 添加模板克隆对象到shadow root中
          var options = that.__ops__;

          for (var method in options.methods) {
            this[method] = options.methods[method];
          }

          if (options && options.lifecycle && options.lifecycle.created) {
            options.lifecycle.created.call(this);
          }
        };
        element.attributeChangedCallback = function() {};

        document.registerElement(this.__tn__, {
          // 注册新组件
          prototype: element
        });
      }
    };
    return __C__;
  },
  "xtag"
);
