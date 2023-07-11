/**
 * @author monkindey
 */

"use strict";

!(function () {
  var aboutMe = document.getElementById("about-me");
  var color = ["#fff", "#fff", "#fff"];
  var charactor = "";

  function getCharColor(charactor) {
    var index = parseInt(Math.random() * color.length) - 1;
    return '<span style="color:' + color[index] + '">' + charactor + "</span>";
  }

  //promise
  var Promise = function () {
    this.thens = [];
  };

  Promise.prototype.then = function (next) {
    this.thens.push(next);
    return this;
  };

  Promise.prototype.resolve = function () {
    var next = this.thens.shift();

    if (next) {
      var defer = next.call(null, arguments);
      defer instanceof Promise && (defer.thens = this.thens);
    }
  };

  var step = function (opts) {
    opts = opts || {};
    var cmd = opts.cmd || "";
    var cwd = opts.cwd || "";
    var cb = opts.cb;
    var chars = cmd.split("");

    if (cwd) {
      chars.unshift(cwd);
    }

    return function () {
      var defer = new Promise();
      var containEl = document.createElement(opts.containEl || "p");
      containEl.className = opts.cls || "line";
      aboutMe.appendChild(containEl);

      // requestAnimationFrame
      setTimeout(function type() {
        if (chars.length !== 0) {
          charactor = chars.shift();
          containEl.innerHTML += charactor;
          setTimeout(type, 30);
        } else {
          cb && cb();
          defer.resolve();
        }
      }, 30);
      return defer;
    };
  };

  var step1 = step({
    cwd: "λ /home/revv/ ",
    cmd: " whoami",
    cls: "",
  });

  var step2 = step({
    cmd: "I am a Software Engineering student, from Banjarmasin State Polytechnic",
    cls: "result line",
  });

  var step3 = step({
    cmd: "My name is Reja Revaldy F, I live in Banjarmasin now.",
    cls: "result line",
  });

  var step4 = step({
    cwd: "λ /home/revv/",
    cmd: " cd hobby",
  });

  var step5 = step({
    cwd: "λ /home/revv/hobby/ ",
    cmd: " ls",
  });

  var step6 = step({
    cmd: "music",
    cls: "result line",
  });

  var step7 = step({
    cwd: "λ /home/revv/hobby/ ",
    cmd: "cd coding",
  });

  var step8 = step({
    cwd: "λ /home/revv/hobby/coding/ ",
    cmd: "ls",
  });

  var step9 = step({
    cmd: "github",
    cls: "result line",
  });

  var step10 = step({
    cwd: "λ /home/revv/hobby/coding/ ",
    cmd: "net start github",
  });

  var step11 = step({
    cmd: "opening......",
    cb: function () {
      if (confirm("Will you take a look at my github ?")) {
        window.location.href = "https://github.com/rejarevaldy";
      }
    },
  });

  step1()
    .then(step2)
    .then(step3)
    .then(step4)
    .then(step5)
    .then(step6)
    .then(step7)
    .then(step8)
    .then(step9)
    .then(step10)
    .then(step11);
})();
