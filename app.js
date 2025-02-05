//app.js
App({
  onLaunch: function() {
    var obj = this;
    var siteInfo = require("siteinfo.js");
    // 登录
    wx.login({
      success: res => {
        var _openid = wx.getStorageSync('openid');
        if (_openid) {
          obj.globalData.openid = _openid;
          console.log("缓存获取:" + obj.globalData.openid);
          if (obj.openidCallback) {
            obj.openidCallback(_openid);
          }
        } else {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          //调用request请求api转换登录凭证  
          var code=res.code
          console.log(code)
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx97c5812b1781db55&secret=c7e4f6cf8e85b30f35b3cbc492ca6871&js_code='+ code +'&grant_type=authorization_code',
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              obj.globalData.openid = res.data.openid; //获取openid  
              console.log("URL获取:" + obj.globalData.openid);
              if (obj.openidCallback) {
                obj.openidCallback(res.data.openid);
              }
              try {
                wx.setStorageSync('openid', obj.globalData.openid);
              } catch (e) {}
            }
          })
        }
      }
    });

    // 获取授权
    //obj.getUserInfoF();

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res.userInfo);
              this.globalData.userInfo = res.userInfo;
              //console.log(res);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log("用户没有授权 scope.userInfo");
        }
      }
    });

    //获取accesstoken
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx97c5812b1781db55&secret=c7e4f6cf8e85b30f35b3cbc492ca6871',
      success:res=>{
        obj.globalData.access_token=res.data.access_token
        console.log(obj.globalData.access_token)
      }
    });


    

    // 加载主题样式（弃用）
    // var _systhemes = wx.getStorageSync('systhemes');
    // if (!_systhemes) {
    //   wx.request({
    //     url: siteInfo.apiurl + '/MBook/Getthemes',
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success: function(res) {
    //       console.log(res.data);
    //       wx.setStorage({
    //         key: "systhemes",
    //         data: res.data.message,
    //         success: function(res) {
    //           console.log('缓存(themes)成功')
    //         }
    //       });
    //     }
    //   });
    // }
  },
  
  siteInfo: require("siteinfo.js"),
  globalData: {
    userInfo: null,
    apiurl: "http://localhost:13281/",
    openid: "",
    access_token:""
  }
})