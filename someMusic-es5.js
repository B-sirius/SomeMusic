'use strict';
// 丑陋的fix

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

var isPc = function isPc() {
    var u = navigator.userAgent;

    var browser = {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.Mobile./), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };

    if (browser.mobile || browser.ios || browser.android || browser.iPhone || browser.iPad) {
        return false;
    }

    return true;
};

// 生成将要被vue实例挂载的dom元素
var musicContainer = document.createElement('div');
document.body.appendChild(musicContainer);

// 从showapi获得的数据
var originalMusicList = [{
    m4a: "http://ws.stream.qqmusic.qq.com/2568874.m4a?fromtag=46",
    media_mid: "004OtwLG0fJRaN",
    songid: 2568874,
    singerid: 16779,
    albumname: "THE DAY OF SECOND IMPACT",
    downUrl: "http://dl.stream.qqmusic.qq.com/2568874.m4a?vkey=402D9F6D797FE1D6E5CA289A952888B37F6D4A7797B1BC1194161C42E8E765DBD8AF32762A09969C60AB61ED112A50906FA330E1353D056B&guid=2718671044",
    singername: "Original Soundtrack",
    songname: "Komm，susser Tod(M-10　Director’s　Edit.Version)",
    strMediaMid: "004OtwLG0fJRaN",
    albummid: "004PHqBD2cggMU",
    songmid: "004OtwLG0fJRaN",
    albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/M/U/004PHqBD2cggMU.jpg",
    albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/M/U/004PHqBD2cggMU.jpg",
    albumid: 204813
}, {
    m4a: "http://ws.stream.qqmusic.qq.com/1464920.m4a?fromtag=46",
    media_mid: "003YqQQK1UW1xe",
    songid: 1464920,
    singerid: 56056,
    albumname: "METAL GEAR SOLID PEACE WALKER ORIGINAL SOUNDTRACK",
    downUrl: "http://dl.stream.qqmusic.qq.com/1464920.m4a?vkey=12BB57629BAC9FD65810DDE6E3D531830211106AC2856586B3128AA012D0622D525306F40F4EFB9404D0BD4D842D2DFB75F0302A97F588C9&guid=2718671044",
    singername: "本田晃弘",
    songname: "HEAVENS DIVIDE",
    strMediaMid: "003YqQQK1UW1xe",
    albummid: "002xcFo81BW7jp",
    songmid: "003YqQQK1UW1xe",
    albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/j/p/002xcFo81BW7jp.jpg",
    albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/j/p/002xcFo81BW7jp.jpg",
    albumid: 118682
}, {
    m4a: "http://ws.stream.qqmusic.qq.com/4835690.m4a?fromtag=46",
    media_mid: "002yoqOS4gKufY",
    songid: 4835690,
    singerid: 16102,
    albumname: "菅野洋子-COWBOY BEBOP TANK THE BEST",
    downUrl: "http://dl.stream.qqmusic.qq.com/4835690.m4a?vkey=402D9F6D797FE1D6E5CA289A952888B37F6D4A7797B1BC1194161C42E8E765DBD8AF32762A09969C60AB61ED112A50906FA330E1353D056B&guid=2718671044",
    singername: "菅野よう子",
    songname: "Gotta knock a little harder",
    strMediaMid: "002yoqOS4gKufY",
    albummid: "00052pGI2Qbw6w",
    songmid: "002yoqOS4gKufY",
    albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/6/w/00052pGI2Qbw6w.jpg",
    albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/6/w/00052pGI2Qbw6w.jpg",
    albumid: 63090
}, {
    m4a: "http://ws.stream.qqmusic.qq.com/102703372.m4a?fromtag=46",
    media_mid: "003i6FOD3x9aWZ",
    songid: 102703372,
    singerid: 64971,
    albumname: "NEON GENESIS EVANGELION Ⅲ",
    downUrl: "http://dl.stream.qqmusic.qq.com/102703372.m4a?vkey=12BB57629BAC9FD65810DDE6E3D531830211106AC2856586B3128AA012D0622D525306F40F4EFB9404D0BD4D842D2DFB75F0302A97F588C9&guid=2718671044",
    singername: "鹭巣诗郎",
    songname: "Good, or Don't Be",
    strMediaMid: "003i6FOD3x9aWZ",
    albummid: "0034zJRW2Gnic2",
    songmid: "003i6FOD3x9aWZ",
    albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/c/2/0034zJRW2Gnic2.jpg",
    albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/c/2/0034zJRW2Gnic2.jpg",
    albumid: 140753
}];

// api返回的数据格式的适配器
var musicListAdapter = function musicListAdapter(item) {
    var id = item.songid,
        singername = item.singername,
        songname = item.songname,
        m4a = item.m4a,
        albumpic = item.albumpic_small;


    return {
        id: id,
        singername: singername,
        songname: songname,
        m4a: m4a,
        albumpic: albumpic
    };
};

// 创建构造器
var Player = Vue.extend({
    template: '\n    <div class="someMusic-wrapper fixed">\n        <a class="someMusic-active-btn" href="javascript:">\n            <div class="equalizer" :class="{active: isActive}">\n                <div class="bar left"></div>\n                <div class="bar center"></div>\n                <div class="bar right"></div>\n            </div>\n        </a>\n        <div class="someMusic-cover" :style="{backgroundImage: \'url(\' + currAlbumSrc + \')\'}"></div>\n        <div class="someMusic-info-wrapper">\n            <p class="title-wrapper">\n                <span>{{currSong.songname}}</span>\n                -\n                <span>{{currSong.singername}}</span>\n            </p>\n            <div class="progress_bar">\n                <div class="progress" :style="{width: progressPercent + \'%\'}"></div>\n            </div>\n            <div class="controller-wrapper">\n                <a class="controller skip_previous" href="javascript:" @click="previousSong"></a>\n                <a class="controller" :class="stateClass" href="javascript:" @click="toggleSongState"></a>\n                <a class="controller skip_next" href="javascript:" @click="nextSong"></a>\n            </div>\n        </div>\n        <audio ref="audio" :src="currSong.m4a"></audio>\n    </div>\n    ',
    data: function data() {
        return {
            musicList: [],
            currIndex: 0,
            currAlbumSrc: 'http://7xrkxs.com1.z0.glb.clouddn.com/someMusic/annoyingdog_128px.jpg',
            defaultAlbumSrc: 'http://7xrkxs.com1.z0.glb.clouddn.com/someMusic/annoyingdog_128px.jpg',
            songState: 'pause',
            stateHandler: {
                pause: function pause() {
                    var _this = this;

                    this.songState = 'play';
                    this.progressIntervalId = setInterval(function () {
                        _this._updateProgress();
                    }, 1000);
                },
                play: function play() {
                    this.songState = 'pause';
                    clearInterval(this.progressIntervalId);
                    this.progressIntervalId = null;
                }
            },
            progressIntervalId: null,
            progressPercent: 0
        };
    },
    methods: {
        _updateMusicList: function _updateMusicList(originList) {
            var newList = originList.map(function (item) {
                return musicListAdapter(item);
            });

            this.musicList = [].concat(_toConsumableArray(this.musicList), _toConsumableArray(newList));
        },
        _updateAudioState: function _updateAudioState() {
            if (this.songState === 'pause') {
                this.$refs.audio.pause();
            } else if (this.songState === 'play') {
                this.$refs.audio.play();
            }
        },
        _updateAlbumPic: function _updateAlbumPic() {
            var _this2 = this;

            var img = new Image();
            img.src = this.currSong.albumpic;

            var setAlbumSrc = new Promise(function (resolve, reject) {
                img.onload = function () {
                    return resolve();
                };
                img.onerror = function () {
                    return reject();
                };
            });

            setAlbumSrc.then(function () {
                _this2.currAlbumSrc = img.src;
            }, function () {
                _this2.currAlbumSrc = _this2.defaultAlbumSrc;
            });
        },
        _updateProgress: function _updateProgress() {
            var percent = this.$refs.audio.currentTime / this.$refs.audio.duration;
            this.progressPercent = Math.round(percent * 100);

            if (percent === 1) {
                this.nextSong();
            }
        },
        toggleSongState: function toggleSongState() {
            this.stateHandler[this.songState].call(this);
        },
        nextSong: function nextSong() {
            this.currIndex = this.currIndex + 1 < this.musicList.length ? this.currIndex + 1 : 0;
        },
        previousSong: function previousSong() {
            this.currIndex = this.currIndex - 1 >= 0 ? this.currIndex - 1 : this.musicList.length - 1;
        }
    },
    created: function created() {
        this._updateMusicList(originalMusicList);
        this._updateAlbumPic();
    },

    computed: {
        currSong: function currSong() {
            return this.musicList[this.currIndex];
        },
        stateClass: function stateClass() {
            if (this.songState === 'pause') {
                return 'play';
            } else if (this.songState === 'play') {
                return 'pause';
            }
        },
        isActive: function isActive() {
            if (this.songState === 'pause') {
                return false;
            } else if (this.songState === 'play') {
                return true;
            }
        }
    },
    watch: {
        // 播放状态改变，需要更新音频播放状态
        songState: function songState() {
            this._updateAudioState();
        },

        // 歌曲改变，需要在audio实例改编后更新播放状态
        currSong: function currSong() {
            var _this3 = this;

            this.$nextTick().then(function () {
                _this3._updateAudioState();
                _this3._updateProgress();
                _this3._updateAlbumPic();
            });
        }
    }
});

if (isPc()) {
    // 创建 music 实例，并挂载到元素上。
    new Player().$mount(musicContainer);
}