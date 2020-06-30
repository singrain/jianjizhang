//获取应用实例
var util = require('../../utils/util.js');

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    barstatus:"block",
    testdata:[],
    pageIndex: 0,
    // list是正式要请求的数据，应该是json格式。然后日期、每日收支和明细是相关联的
    list: [{date:'2020-5-10',dayin:'88',dayout:'1'}],
    yearmonth: util.formatYearMonth(new Date),
    yearmonthstr: util.formatDate(new Date),
    jieyu: "0.00",
    sumin: "0.00",
    sumout: "0.00",
    scrollHeight: 0,
    topHeight: 0,
    homeimg: 'data:image/png;base64,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',
    homecolor: '#fff',
    reload: "none",
    xljt: "none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("页面初始化");
    var obj = this;

    //设置主题样式（弃用）
    // var _systhemes = wx.getStorageSync('systhemes');
    // if (_systhemes) {
    //   obj.setData({
    //     homeimg: _systhemes.homeimg,
    //     homecolor: _systhemes.color
    //   });
    // }

    //调用函数，获取记账的测试数据，并存入testdata
    obj.gettestdata()

    

    wx.getSystemInfo({
      success: function(res) {
        var _topHeight = res.windowHeight * 0.28;
        obj.setData({
          scrollHeight: res.windowHeight - _topHeight,
          topHeight: _topHeight,
        });
      }
    });

    if (app.globalData.openid != "") {
      obj.getPageRequset();
    } else {
      app.openidCallback = openid => {
        obj.getPageRequset();
      }
    }

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#f6c142',
    });

  },

  // 【正式】加载数据
  getPageRequset: function() {
    var obj = this;
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    console.log("加载默认数据");

    wx.request({
      url: app.siteInfo.apiurl + '/mbook/GetMoneyWater', //仅为示例，并非真实的接口地址
      data: {
        user: app.globalData.openid,
        yearmonth: obj.data.yearmonth,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        obj.setData({
          reload: "none",
        });
        if (res.data.message.length == 0) {
          obj.setData({
            xljt: "block",
          });
        }else{
          obj.setData({
            xljt: "none",
          });
        }
        obj.setData({
          list: res.data.message,
          jieyu: res.data.jieyu,
          sumin: res.data.sumin,
          sumout: res.data.sumout,
        });
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
      },
      fail: function(res) {
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        obj.setData({
          reload: "block",
        });
      }
    });

  },

  // 选择日期
  sltyearmonth: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail);
    this.setData({
      yearmonth: util.formatYearMonth(new Date(e.detail.value))
    });
    this.getPageRequset();
  },

  // 添加
  addwater: function() {
    if(app.globalData.userInfo)
    {
      wx.navigateTo({
        url: '/pages/mbook/addwater'
      })
    }else{
      console.log('未授权用户信息')
      wx.navigateTo({
        url: '/pages/mbook/addwater'
      })
    }
  },

  // 详情
  waterdetail: function(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/mbook/mdetail?id=' + e.currentTarget.dataset.id
    });
  },

  // 重新加载数据
  reloaddata: function(e) {
    var obj = this;
    if (app.globalData.openid != "") {
      obj.getPageRequset();
    } else {
      app.openidCallback = openid => {
        obj.getPageRequset();
      }
    }
  },

  //设置主题样式（弃用）
  // setclick: function(e) {
  //   var obj = this;
  //   // 显示顶部刷新图标  
  //   wx.showNavigationBarLoading();
  //   // 加载主题
  //   wx.request({
  //     url: app.siteInfo.apiurl + 'MBook/Getthemes',
  //     data: {
  //       model: 1
  //     },
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function(res) {
  //       console.log(res.data);
  //       obj.setData({
  //         homeimg: res.data.message.homeimg,
  //         homecolor: res.data.message.color
  //       });
  //       wx.setStorage({
  //         key: "systhemes",
  //         data: res.data.message,
  //         success: function(res) {
  //           console.log('缓存(themes)成功');
  //         }
  //       });
  //       // 隐藏导航栏加载框  
  //       wx.hideNavigationBarLoading();
  //     }
  //   });

  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    // wx.showToast({
    //   title: 'loading...',
    //   icon: 'success_no_circle'
    // })
    console.log("下拉");
    var obj = this;
    obj.getPageRequset();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(e) {
    var obj = this;
    this.setData({
      pageIndex: obj.data.pageIndex + 1
    });
    console.log(obj.data.pageIndex);
  },

  //滚动到底部触发事件  
  searchScrollLower: function() {
    console.log("到底了!!!");
  },

  //滚动到顶部/左边，会触发 scrolltoupper 事件
  bindscrolltoupper: function() {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    // wx.showToast({
    //   title: 'loading...',
    //   icon: 'success_no_circle'
    // })
    console.log("滚动到顶部");
    var obj = this;
    obj.getPageRequset();
  },

  onShareAppMessage: function(res) {
    return {
      title: '简记账，自律的人生从记账开始！',
      path: '/pages/mbook/mbook',
      imageUrl:'/imges/share.png'
    }
  },

  //【测试用】获取缓存的测试数据，并存入testdata
  gettestdata(){
    wx.getStorage({
      key: "inputtestdata",
      success:res => {
        console.log('获取测试数据成功');
        var getinputtestdata = res.data
        var testdata = this.data.testdata
        testdata.push(getinputtestdata)
        this.setData({testdata:testdata})
        console.log(this.data.testdata)
        wx.setStorage({
          data: testdata,
          key: 'testdata',
          success:res=>{
            console.log('缓存测试数据成功')
            //如果有缓存的记账数据，隐藏noticebar（这个正式环境不能这么用，要判断用户是否收藏了）
            this.setData({barstatus:"none"})
          }
        })
      }
    })
  },

  //获取用户信息
  ongotuserinfo(e){
    var userinfo = e.detail.userInfo;
    app.globalData.userInfo = userinfo;
  },
})