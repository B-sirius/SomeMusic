'use strict';
// 丑陋的fix
let isPc = () => {
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
    }

    if (browser.mobile || browser.ios || browser.android ||
        browser.iPhone || browser.iPad) {
        return false;
    }

    return true;
}

// 生成将要被vue实例挂载的dom元素
const musicContainer = document.createElement('div');
document.body.appendChild(musicContainer);

// 从showapi获得的数据
let originalMusicList = [{
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
];

// api返回的数据格式的适配器
const musicListAdapter = item => {
    let {
        songid: id,
        singername: singername,
        songname: songname,
        m4a: m4a,
        albumpic_small: albumpic,
    } = item;

    return {
        id,
        singername,
        songname,
        m4a,
        albumpic
    };
}

// 创建构造器
let Player = Vue.extend({
    template: `
    <div class="someMusic-wrapper fixed">
        <a class="someMusic-active-btn" href="javascript:">
            <div class="equalizer" :class="{active: isActive}">
                <div class="bar left"></div>
                <div class="bar center"></div>
                <div class="bar right"></div>
            </div>
        </a>
        <div class="someMusic-cover" :style="{backgroundImage: 'url(' + currAlbumSrc + ')'}"></div>
        <div class="someMusic-info-wrapper">
            <p class="title-wrapper">
                <span>{{currSong.songname}}</span>
                -
                <span>{{currSong.singername}}</span>
            </p>
            <div class="progress_bar">
                <div class="progress" :style="{width: progressPercent + '%'}"></div>
            </div>
            <div class="controller-wrapper">
                <a class="controller skip_previous" href="javascript:" @click="previousSong"></a>
                <a class="controller" :class="stateClass" href="javascript:" @click="toggleSongState"></a>
                <a class="controller skip_next" href="javascript:" @click="nextSong"></a>
            </div>
        </div>
        <audio ref="audio" :src="currSong.m4a"></audio>
    </div>
    `,
    data: function () {
        return {
            musicList: [],
            currIndex: 0,
            currAlbumSrc: 'http://7xrkxs.com1.z0.glb.clouddn.com/someMusic/annoyingdog_128px.jpg',
            defaultAlbumSrc: 'http://7xrkxs.com1.z0.glb.clouddn.com/someMusic/annoyingdog_128px.jpg',
            songState: 'pause',
            stateHandler: {
                pause() {
                    this.songState = 'play';
                    this.progressIntervalId = setInterval(() => {
                        this._updateProgress();
                    }, 1000);
                },
                play() {
                    this.songState = 'pause';
                    clearInterval(this.progressIntervalId);
                    this.progressIntervalId = null;
                }
            },
            progressIntervalId: null,
            progressPercent: 0,
        }
    },
    methods: {
        _updateMusicList(originList) {
            let newList = originList.map((item) => {
                return musicListAdapter(item);
            });

            this.musicList = [...this.musicList, ...newList];
        },
        _updateAudioState() {
            if (this.songState === 'pause') {
                this.$refs.audio.pause();
            } else if (this.songState === 'play') {
                this.$refs.audio.play();
            }
        },
        _updateAlbumPic() {
            let img = new Image();
            img.src = this.currSong.albumpic;

            let setAlbumSrc = new Promise((resolve, reject) => {
                img.onload = () => resolve();
                img.onerror = () => reject();
            });

            setAlbumSrc.then(() => {
                this.currAlbumSrc = img.src;
            }, () => {
                this.currAlbumSrc = this.defaultAlbumSrc;
            });
        },
        _updateProgress() {
            let percent = this.$refs.audio.currentTime / this.$refs.audio.duration;
            this.progressPercent = Math.round(percent * 100);

            if (percent === 1) {
                this.nextSong();
            }
        },
        toggleSongState() {
            this.stateHandler[this.songState].call(this);
        },
        nextSong() {
            this.currIndex = this.currIndex + 1 < this.musicList.length ? this.currIndex + 1 : 0;
        },
        previousSong() {
            this.currIndex = this.currIndex - 1 >= 0 ? this.currIndex - 1 : this.musicList.length - 1;
        },
    },
    created() {
        this._updateMusicList(originalMusicList);
        this._updateAlbumPic();
    },
    computed: {
        currSong() {
            return this.musicList[this.currIndex];
        },
        stateClass() {
            if (this.songState === 'pause') {
                return 'play';
            } else if (this.songState === 'play') {
                return 'pause';
            }
        },
        isActive() {
            if (this.songState === 'pause') {
                return false;
            } else if (this.songState === 'play') {
                return true;
            }
        }
    },
    watch: {
        // 播放状态改变，需要更新音频播放状态
        songState() {
            this._updateAudioState();
        },
        // 歌曲改变，需要在audio实例改编后更新播放状态
        currSong() {
            this.$nextTick().then(() => {
                this._updateAudioState();
                this._updateProgress();
                this._updateAlbumPic();
            });
        }
    }
});

if (isPc()) {
    // 创建 music 实例，并挂载到元素上。
    new Player().$mount(musicContainer);
}