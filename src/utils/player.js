const defaultOptions = {
  el: "",
  position: "",
  buttonImgSrc: "",
  htmls: '<audio preload loop id="musicAudio" style="width:0px;"></audio>'
};
const wx = window.wx;

class Player {
  constructor(options) {
    this.settings = Object.assign({}, defaultOptions, options);
    let audioDom = this.audioDomInit();
    this.audioInstant = audioDom.audioTag;
    this.audioInstantBox = audioDom.audioBox;
    this.src = options.src;
    this.handleEvent();
  }

  handleEvent() {
    let that = this;
    this.audioInstantBox.state = true;
    // if (that.settings.src) {
    //   that.play(that.settings.src);
    // } else {
    //   console.error("无音乐资源启动失败，请添加音乐资源 src");
    //   return;
    // }
    let _device = /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    let clickEvtName = _device ? "touchstart" : "mousedown";
    //给按钮绑定事件
    this.audioInstantBox.addEventListener(clickEvtName, function(e) {
      //判断播放状态
      if (this.state) {
        this.state = false;
        that.stop();

        document.getElementById("mainMp3").pause();
      } else {
        this.state = true;
        that.play();

        document.getElementById("mainMp3").play();
      }
    });
    //判断是否是微信
    // if (navigator.userAgent.toLowerCase().match(/micromessenger/i)) {
    //   document.addEventListener(
    //     "WeixinJSBridgeReady",
    //     function onBridgeReady() {
    //       document.getElementById("musicAudio").play();
    //     }
    //   );
    // }
    // wx.ready(function() {
    //   document.getElementById("musicAudio").play();
    // });

    this.audioInstantBox.style.cssText +=
      ";animation: " + this.settings.animaClass + " .8s linear infinite;";
  }

  get audio() {
    return this.audioInstant;
  }

  get src() {
    return this.settings.src;
  }

  set src(value) {
    this.audioInstant.src = value;
    this.settings.src = value;
  }

  autoPlay(url, isFirst = false) {
    if (document.getElementById("mainMp3").paused && !isFirst) {
      return false;
    } else {
      if (document.getElementById("mainMp3").src == url) {
        return false;
      }

      if (url) {
        document.getElementById("mainMp3").src = url;
      }
      if (wx) {
        document.getElementById("mainMp3").play();
        wx.ready(function() {
          document.getElementById("mainMp3").play();
        });
      } else {
        document.getElementById("mainMp3").play();
      }
    }
  }
  play(url) {
    // if (url) {
    //   this.audioInstant.src = url;
    // }
    // wx.ready(() => {
    //   document.getElementById("musicAudio").src = url;
    //   document.getElementById("musicAudio").play();
    // });
    // this.audioInstant.play();
    this.audioInstantBox.style.backgroundImage = this.audioInstantBox.style.backgroundImage;
    this.audioInstantBox.style.cssText =
      this.audioInstantBox.style.cssText + this.settings.position;
    this.audioInstantBox.style.cssText +=
      ";animation: " + this.settings.animaClass + " .8s linear infinite;";
    console.log(this.audioInstant.style.cssText);

    if (url) {
      document.getElementById("mainMp3").src = url;
    }
    if (wx) {
      document.getElementById("mainMp3").play();
      wx.ready(function() {
        document.getElementById("mainMp3").play();
      });
    } else {
      document.getElementById("mainMp3").play();
    }
  }
  stop() {
    // this.audioInstant.pause();
    this.audioInstantBox.style.backgroundImage = this.audioInstantBox.style.backgroundImage;
    this.audioInstantBox.style.cssText =
      this.audioInstantBox.style.cssText + this.settings.position;
    this.audioInstantBox.style.animation = "";
  }

  destroy() {
    var box = document.getElementById("musicControl");
    box.parentNode.removeChild(box);
    document.getElementById("mainMp3").pause();
    document.getElementById("mainMp3").currentTime = 0;
  }

  audioDomInit() {
    console.log(this.settings);
    let audioDom = this.settings.el
      ? document.getElementById(this.settings.el)
      : document.body;
    if (!audioDom) audioDom = document.body;

    let isHaveAudioBox = document.getElementById("musicControl");

    let audioBox = null;

    if (isHaveAudioBox) {
      audioBox = isHaveAudioBox;
    } else {
      audioBox = document.createElement("div");
      audioBox.id = "musicControl";
      let boxDefaultStyle =
        "overflow:hidden;position:fixed;top:.1rem;right:.2rem;z-index:22999;background-size: contain;background-repeat: no-repeat;width:30px;height:30px;";
      audioBox.style.cssText = boxDefaultStyle + this.settings.position;
      audioBox.innerHTML = this.settings.htmls;
      //插入节点
      audioDom.appendChild(audioBox);
    }

    let audioTag = audioBox.querySelectorAll("audio")[0];
    if (!this.settings.buttonImgSrc) {
      audioBox.style.backgroundImage = `url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NPHN2ZyB2ZXJzaW9uPSIxLjEiIGJhc2VQcm9maWxlPSJmdWxsIg0geG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0geG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDSB4bWxuczpldj0iaHR0cDovL3d3dy53My5vcmcvMjAwMS94bWwtZXZlbnRzIiANICBoZWlnaHQ9IjYwcHgiIA0gIHdpZHRoPSI2MHB4IiANPg08cGF0aCBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgb3BhY2l0eT0iMC41MDIiIGZpbGw9InJnYiggMCwgMCwgMCApIg0gZD0iTTMwLDEgQzQ2LjAxNiwxIDU5LDEzLjk4NCA1OSwzMCBDNTksNDYuMDE2IDQ2LjAxNiw1OSAzMCw1OSBDMTMuOTg0LDU5IDEsNDYuMDE2IDEsMzAgQzEsMTMuOTg0IDEzLjk4NCwxIDMwLDEgWiAiLz4NPHBhdGggc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIGZpbGw9InJnYiggMjU1LCAyNTUsIDI1NSApIg0gZD0iTTMwLDYwIEMxMy40MzEsNjAgMCw0Ni41NjkgMCwzMCBDMCwxMy40MzEgMTMuNDMxLDAgMzAsMCBDNDYuNTY5LDAgNjAsMTMuNDMxIDYwLDMwIEM2MCw0Ni41NjkgNDYuNTY5LDYwIDMwLDYwIFpNMzAsMyBDMTUuMDg4LDMgMywxNS4wODggMywzMCBDMyw0NC45MTIgMTUuMDg4LDU3IDMwLDU3IEM0NC45MTIsNTcgNTcsNDQuOTEyIDU3LDMwIEM1NywxNS4wODggNDQuOTEyLDMgMzAsMyBaICIvPg08cGF0aCBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZmlsbD0icmdiKCAyNTUsIDI1NSwgMjU1ICkiDSBkPSJNMzEuMDg4LDEwIEMzMS4zNywxMi4wMDEgMzEuNDEsMTQuNTI0IDMzLjUwNiwxNy4wNDcgQzM1LjExNywxOC45NjkgMzYuOTMxLDIwLjY5IDM4LjE4LDIyLjI1MiBDMzkuODMyLDI0LjI5NCA0MSwyNi44NTcgNDEsMjkuNDYgQzQxLDMzLjYyNCAzOC45ODYsMzcuNzQ3IDM3LjYxNSw0MC4wMyBDMzcuNjE1LDQwLjAzIDM2Ljk3MSw0MC4wMyAzNi45NzEsNDAuMDMgQzM3LjkzOCwzNy44NjggMzkuODcyLDM0LjMwNCAzOS43MSwzMC41MDEgQzM5LjYzLDI4LjM3OCAzOC44MjQsMjYuMDk2IDM3LjQ1NSwyNC40MTUgQzM1LjkyMywyMi40NTIgMzMuMzQ0LDIwLjg5MSAzMS4wODgsMjAuNzMxIEMzMS4wODgsMjAuNzMxIDMxLjA4OCw0My40MzMgMzEuMDg4LDQzLjQzMyBDMzEuMDg4LDQ1LjIzNSAzMCw0Ni44NzcgMjguNDI5LDQ4LjA3OCBDMjYuODk4LDQ5LjI3OSAyNC44ODMsNTAgMjMuMTEsNTAgQzIxLjk4Miw1MCAyMC45MzQsNDkuNjQgMjAuMjA5LDQ5LjAzOSBDMTkuNDQzLDQ4LjQzOCAxOSw0Ny41NTggMTksNDYuNTE3IEMxOSw0NC44NzUgMjAuMTI4LDQzLjIzMyAyMS42NTksNDIuMDMyIEMyMy4xOTEsNDAuNzkxIDI1LjEyNCwzOS45OSAyNi43MzYsMzkuOTkgQzI4LjE0NywzOS45OSAyOS4zNTUsNDAuMTkgMzAuMDgxLDQwLjg3MSBDMzAuMDgxLDQwLjg3MSAzMC4wODEsMTAgMzAuMDgxLDEwIEMzMC4wODEsMTAgMzEuMDg4LDEwIDMxLjA4OCwxMCBaICIvPg08L3N2Zz4N')`;
    } else {
      audioBox.style.backgroundImage =
        "url(" + this.settings.buttonImgSrc + ")";
    }
    if (!this.settings.buttonImgSrc) {
      audioBox.style.backgroundImage = `url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NPHN2ZyB2ZXJzaW9uPSIxLjEiIGJhc2VQcm9maWxlPSJmdWxsIg0geG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0geG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDSB4bWxuczpldj0iaHR0cDovL3d3dy53My5vcmcvMjAwMS94bWwtZXZlbnRzIiANICBoZWlnaHQ9IjYwcHgiIA0gIHdpZHRoPSI2MHB4IiANPg08cGF0aCBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgb3BhY2l0eT0iMC41MDIiIGZpbGw9InJnYiggMCwgMCwgMCApIg0gZD0iTTMwLDEgQzQ2LjAxNiwxIDU5LDEzLjk4NCA1OSwzMCBDNTksNDYuMDE2IDQ2LjAxNiw1OSAzMCw1OSBDMTMuOTg0LDU5IDEsNDYuMDE2IDEsMzAgQzEsMTMuOTg0IDEzLjk4NCwxIDMwLDEgWiAiLz4NPHBhdGggc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIGZpbGw9InJnYiggMjU1LCAyNTUsIDI1NSApIg0gZD0iTTMwLDYwIEMxMy40MzEsNjAgMCw0Ni41NjkgMCwzMCBDMCwxMy40MzEgMTMuNDMxLDAgMzAsMCBDNDYuNTY5LDAgNjAsMTMuNDMxIDYwLDMwIEM2MCw0Ni41NjkgNDYuNTY5LDYwIDMwLDYwIFpNMzAsMyBDMTUuMDg4LDMgMywxNS4wODggMywzMCBDMyw0NC45MTIgMTUuMDg4LDU3IDMwLDU3IEM0NC45MTIsNTcgNTcsNDQuOTEyIDU3LDMwIEM1NywxNS4wODggNDQuOTEyLDMgMzAsMyBaICIvPg08cGF0aCBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZmlsbD0icmdiKCAyNTUsIDI1NSwgMjU1ICkiDSBkPSJNMzEuMDg4LDEwIEMzMS4zNywxMi4wMDEgMzEuNDEsMTQuNTI0IDMzLjUwNiwxNy4wNDcgQzM1LjExNywxOC45NjkgMzYuOTMxLDIwLjY5IDM4LjE4LDIyLjI1MiBDMzkuODMyLDI0LjI5NCA0MSwyNi44NTcgNDEsMjkuNDYgQzQxLDMzLjYyNCAzOC45ODYsMzcuNzQ3IDM3LjYxNSw0MC4wMyBDMzcuNjE1LDQwLjAzIDM2Ljk3MSw0MC4wMyAzNi45NzEsNDAuMDMgQzM3LjkzOCwzNy44NjggMzkuODcyLDM0LjMwNCAzOS43MSwzMC41MDEgQzM5LjYzLDI4LjM3OCAzOC44MjQsMjYuMDk2IDM3LjQ1NSwyNC40MTUgQzM1LjkyMywyMi40NTIgMzMuMzQ0LDIwLjg5MSAzMS4wODgsMjAuNzMxIEMzMS4wODgsMjAuNzMxIDMxLjA4OCw0My40MzMgMzEuMDg4LDQzLjQzMyBDMzEuMDg4LDQ1LjIzNSAzMCw0Ni44NzcgMjguNDI5LDQ4LjA3OCBDMjYuODk4LDQ5LjI3OSAyNC44ODMsNTAgMjMuMTEsNTAgQzIxLjk4Miw1MCAyMC45MzQsNDkuNjQgMjAuMjA5LDQ5LjAzOSBDMTkuNDQzLDQ4LjQzOCAxOSw0Ny41NTggMTksNDYuNTE3IEMxOSw0NC44NzUgMjAuMTI4LDQzLjIzMyAyMS42NTksNDIuMDMyIEMyMy4xOTEsNDAuNzkxIDI1LjEyNCwzOS45OSAyNi43MzYsMzkuOTkgQzI4LjE0NywzOS45OSAyOS4zNTUsNDAuMTkgMzAuMDgxLDQwLjg3MSBDMzAuMDgxLDQwLjg3MSAzMC4wODEsMTAgMzAuMDgxLDEwIEMzMC4wODEsMTAgMzEuMDg4LDEwIDMxLjA4OCwxMCBaICIvPg08L3N2Zz4N')`;
    } else {
      audioBox.style.backgroundImage =
        "url(" + this.settings.buttonImgSrc + ")";
    }

    // if (this.settings.src) {
    //   audioTag.src = this.settings.src;
    // }

    return {
      audioTag,
      audioBox
    };
  }
}

export default Player;
