{
  /* <script src="./core/xtag-core.js"></script>
<template>
    <p>x-tag</p>
</template>
<script> */
}
console.log("yes xtag");

xtag.register("netease-clock", {
  lifecycle: {
    create: function() {
      console.log("created...");
      this.start();
    }
  },
  methods: {
    start: function() {
      this.update();
      this.interval = setInterval(() => {
        this.update();
      }, 1000);
    },
    stop: function() {
      this.xtag.interval = clearInterval(this.xtag.interval);
    },
    update: function() {
      console.log("this ", this);
      this.children[1].innerText = new Date().toLocaleTimeString();
    }
  }
});
// </script>
