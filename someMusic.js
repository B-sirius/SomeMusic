'use strict';

// 生成将要被vue实例挂载的dom元素
let musicContainer = document.createElement('div');
document.body.appendChild(musicContainer);

// 从showapi获得的数据
const originalMusicList = [
    {
        m4a: "http://ws.stream.qqmusic.qq.com/3625900.m4a?fromtag=46",
        media_mid: "001UdxMS2JsEgq",
        songid: 3625900,
        singerid: 16102,
        albumname: "星际牛仔-Cowboy BeBop",
        downUrl: "http://dl.stream.qqmusic.qq.com/3625900.m4a?vkey=0103C443DAF06013491687F85A9DF4E9E32C84CE384159864FEF269DC9D59B91FAEBB876E580641C7339FCB7109778CA4D05FE1CC3E774BC&guid=2718671044",
        singername: "菅野よう子",
        songname: "Call me call me",
        strMediaMid: "001UdxMS2JsEgq",
        albummid: "000CyufG29BlsG",
        songmid: "000JnyR72WX0uV",
        albumpic_big: "http://i.gtimg.cn/music/photo/mid_album_300/s/G/000CyufG29BlsG.jpg",
        albumpic_small: "http://i.gtimg.cn/music/photo/mid_album_90/s/G/000CyufG29BlsG.jpg",
        albumid: 307672
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
    }
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

    return {id, singername, songname, m4a, albumpic};
}

// 创建构造器
let Player = Vue.extend({
    template: `
    <div class="someMusic-wrapper">
        <div class="someMusic-cover"></div>
        <div class="someMusic-info-wrapper">
            <p class="title-wrapper">
                <span>{{currSong.songname}}</span>
                -
                <span>{{currSong.singername}}</span>
            </p>
            <div class="progress_bar">
                <div class="progress" style="width: 50%"></div>
            </div>
            <div class="controller-wrapper">
                <a class="controller skip_previous" href="javascript:" @click="nextSong"></a>
                <a class="controller" :class="stateClass" href="javascript:" @click="toggleSongState"></a>
                <a class="controller skip_next" href="javascript:" @click="previousSong"></a>
            </div>
        </div>
        <audio ref="audio" :src="currSong.m4a"></audio>
    </div>
    `,
    data: function () {
        return {
            musicList: [],
            currIndex: 2,
            songState: 'pause',
            stateHandler: {
                pause() {
                    this.songState = 'play';
                },
                play() {
                    this.songState = 'pause';
                }
            }
        }
    },
    methods: {
        updateMusicList(originList) {
            let newList = originList.map((item) => {
                return musicListAdapter(item);
            });

            this.musicList = [...this.musicList, ...newList];
            console.log(this.musicList);
        },
        toggleSongState() {
            this.stateHandler[this.songState].call(this);
        },
        nextSong() {
            this.currIndex = this.currIndex + 1 < this.musicList.length ? this.currIndex + 1 : 0;
        },
        previousSong() {
            this.currIndex = this.currIndex - 1 >= 0 ? this.currIndex - 1 : this.musicList.length - 1;
        }
    },
    created() {
        this.updateMusicList(originalMusicList);
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
    },
    watch: {
        songState() {
            this.$refs.audio[this.songState]();
        }
    }
});

// 创建 music 实例，并挂载到元素上。
new Player().$mount(musicContainer);