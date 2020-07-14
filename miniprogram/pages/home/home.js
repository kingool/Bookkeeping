// miniprogram/pages/home/home.js
Page({
  onReady: function(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audio1Ctx = wx.createAudioContext('myAudio1')
    this.audio2Ctx = wx.createAudioContext('myAudio2')
  },
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    audio1src: "",
    audio2src: "",
    uk: '',
    us: '',
    paraphrase: [],
    sentence: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    // this.Interpret()
  },

  //播放按钮
  audio1Play: function() {
    this.audio1Ctx.play()
  },

  audio2Play: function() {
    this.audio2Ctx.play()
  },

  Interpret: function(word) {
    var _this = this
    // console.log(q)
    wx.request({
      // url:"https://dict.youdao.com/suggest?q=love&le=eng&num=10&ver=&doctype=json",  //联想
      // url:"https://fanyi.youdao.com/translate?doctype=json",
      url: "https://dict.youdao.com/jsonapi?xmlVersion=5.1&network=5g&jsonversion=2",
      data: {
        "q": word
      },
      method: "GET",
      success: function(res) {
        console.log(res)

        var src = "https://dict.youdao.com/dictvoice?audio="
        var obj = []
        for (var a in res.data.ec.word[0].trs) {
          obj[a] = res.data.ec.word[0].trs[a].tr[0].l.i[0]
        }

        // var arr = []
        var arr1 = [[],[],[]]

        for (let b in res.data.blng_sents_part['sentence-pair']) {
          arr1[b][0] = res.data.blng_sents_part['sentence-pair'][b].sentence
          arr1[b][1] = res.data.blng_sents_part['sentence-pair'][b]['sentence-translation']
          arr1[b][2] = res.data.blng_sents_part['sentence-pair'][b].source
        }
        // console.log(arr1)


        _this.setData({
          show: true,
          paraphrase: obj,
          audio1src: src + res.data.ec.word[0].ukspeech,
          audio2src: src + res.data.ec.word[0].usspeech,
          uk: res.data.ec.word[0].ukphone,
          us: res.data.ec.word[0].usphone,
          sentence: arr1
        })
        console.log(_this.data.sentence)
      }
    })
  },
  getword: function(e) {
    console.log(e.detail.value)
    if (e.detail.value.lenght != 0) {
      this.Interpret(e.detail.value)
    }
  }
})