// pages/mbook/addwater.js
var util = require('../../utils/util.js');

//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _openid: '',
    nav_color1: 'nav-active',
    nav_color2: '',
    nav_item: '2',
    nav_icon: 'icon-food',
    nav_name: '餐饮',
    tagid: 0,
    money: '',
    remark: '',
    iconlist: [{id:0,name:"餐饮",icon:"icon-food"},{id:1,name:"旅行",icon:"icon-travel"},{id:2,name:"衣服",icon:"icon-clothes"},{id:3,name:"电费",icon:"icon-electric"},{id:4,name:"购物",icon:"icon-shopping"},{id:5,name:"理财",icon:"icon-financing"},{id:6,name:"交通",icon:"icon-traffic"},{id:7,name:"住房",icon:"icon-housing"},{id:8,name:"水费",icon:"icon-water"},{id:9,name:"宠物",icon:"icon-pets"}],
    date: util.formatDate(new Date),
    tag_action_id: 0,
    tag_action_color: "",
    cardarray: null,
    cardindex: 0,
    id: '',//流水ID，通过时间戳+随机数方式实现
    inputtestdata:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载页面的时候就产生一个流水id的默认值
    this.generatewaterid()

    var obj = this;
    // var _model = options.model;

    //设置主题样式（弃用）
    // if (_model == 1) { // 修改初始化数据
    //   var _mdetail = JSON.parse(options.mdetail);

    //   obj.setData({
    //     id: _mdetail.id,
    //     nav_item: _mdetail._type,
    //     nav_color1: _mdetail._type == 1 ? "" : "nav-active",
    //     nav_color2: _mdetail._type == 1 ? "nav-active" : "",
    //     money: _mdetail.money,
    //     remark: _mdetail.remark,
    //     cardindex: _mdetail.cardindex
    //   });
    // }

    //获取openid
    if (app.globalData.openid && app.globalData.openid != '') {
      this.setData({
        _openid: app.globalData.openid,
      });
    } else {
      app.openidCallback = openid => {
        console.log("_11 = " + openid);

        if (openid != '') {
          obj.setData({
            _openid: openid
          });
        }
        console.log("_openid1 = " + obj.data._openid);
      }
    }

    console.log("_openid2 = " + obj.data._openid);

    //之前的写法，从服务器请求icon列表，并缓存到本地（还要比对本地和线上版本）
    // try {
    //   wx.request({
    //     url: app.siteInfo.apiurl + 'mbook/GetSystemConfig',
    //     data: { key: 'IconVersions' },
    //     header: { 'content-type': 'application/json' },
    //     success: function (res) {
    //       var _IconVersions = wx.getStorageSync('iconVersions');
    //       console.log("缓存版本:" + _IconVersions + ",线上版本:" + res.data.message);
    //       if (_IconVersions != res.data.message) {
    //         wx.removeStorage({ key: 'iconlist_out' });
    //         wx.removeStorage({ key: 'iconlist_in' });
    //         console.log("iconlist cache remove");
    //       }
    //     }
    //   });

    //   var _iconlist = obj.data.nav_item == 2 ? wx.getStorageSync('iconlist_out') : wx.getStorageSync('iconlist_in');
    //   if (_iconlist) {
    //     console.log("icon cache get");

    //     if (_model == 1) { //修改默认数据
    //       obj.setData({
    //         iconlist: _iconlist,
    //         nav_icon: _mdetail.tagimg,
    //         nav_name: _mdetail.tag,
    //         tagid: _mdetail.tagid,
    //         tag_action_id: _mdetail.tagid,
    //         tag_action_color: _mdetail.tagbg,
    //       });
    //     } else {
    //       obj.setData({
    //         iconlist: _iconlist,
    //         nav_icon: _iconlist[0].icon,
    //         nav_name: _iconlist[0].name,
    //         tagid: _iconlist[0].id,
    //         tag_action_id: _iconlist[0].id,
    //         tag_action_color: _iconlist[0].iconcolor,
    //       });
    //     }
    //   } else {
    //     console.log("icon url get");
    //     wx.request({
    //       url: app.siteInfo.apiurl + '/mbook/GetIconsByInOut', //仅为示例，并非真实的接口地址
    //       data: {
    //         user: app.globalData.openid,
    //         yearmonth: obj.data.yearmonth
    //       },
    //       header: { 'content-type': 'application/json' },
    //       success: function (res) {
    //         console.log(res.data);
    //         if (_model == 1) { //修改默认数据
    //           obj.setData({
    //             iconlist: res.data.message.iconout,
    //             nav_icon: _mdetail.tagimg,
    //             nav_name: _mdetail.tag,
    //             tagid: _mdetail.tagid,
    //             tag_action_id: _mdetail.tagid,
    //             tag_action_color: _mdetail.tagbg,
    //           });
    //         } else {
    //           obj.setData({
    //             iconlist: res.data.message.iconout,
    //             nav_icon: res.data.message.iconout[0].icon,
    //             nav_name: res.data.message.iconout[0].name,
    //             tagid: res.data.message.iconout[0].id,
    //             tag_action_id: res.data.message.iconout[0].id,
    //             tag_action_color: res.data.message.iconout[0].iconcolor,
    //           });
    //         }
    //         wx.setStorage({
    //           key: "iconVersions",
    //           data: res.data.Versions,
    //           success: function (res) {
    //             console.log('缓存(iconVersions)成功')
    //           }
    //         });

    //         wx.setStorage({
    //           key: "iconlist_out",
    //           data: res.data.message.iconout,
    //           success: function (res) {
    //             console.log('缓存(iconlist_out)成功')
    //           }
    //         });
    //         wx.setStorage({
    //           key: "iconlist_in",
    //           data: res.data.message.iconin,
    //           success: function (res) {
    //             console.log('缓存(iconlist_in)成功')
    //           }
    //         });
    //       }
    //     });
    //   }
    // } catch (e) {

    // }

  //   获取卡片详情（弃用）
  //   wx.request({
  //     url: app.siteInfo.apiurl + '/mbook/GetCardList',
  //     data: { user: app.globalData.openid },
  //     header: { 'content-type': 'application/json' },
  //     success: function (res) {
  //       var cardlist = res.data.message;
  //       //console.log(cardlist);
  //       var _cardarray = [];
  //       _cardarray.push({
  //         id: 0,
  //         value: 0,
  //         name: "选择账户"
  //       });
  //       for (var i = 0; i < cardlist.length; i++) {
  //         _cardarray.push({
  //           id: i + 1,
  //           value: cardlist[i].id,
  //           name: cardlist[i].cardname
  //         });
  //       }
  //       obj.setData({
  //         cardarray: _cardarray,
  //       });
  //       console.log(_cardarray);
  //     }
  //   });

  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail);
    this.setData({
      date: e.detail.value
    })
  },

  // 选择银行卡（弃用）
  // bindCardsChange: function (e) {
  //   console.log(e);
  //   this.setData({
  //     cardindex: e.detail.value,
  //     cardid: this.data.cardarray[e.detail.value].value
  //   })
  // },

  // 点击菜单
  jizhangmenu: function (e) {
    var obj = this;
    var item = e.target.dataset.item;
    if (item == 1) {
      obj.setData({
        nav_color1: '',
        nav_color2: 'nav-active',
        nav_item:1
      })
    } else {
      obj.setData({
        nav_color1: 'nav-active',
        nav_color2: '',
        nav_item:2
      })
    }

    // 切换支出/收入（原来的写法，从服务器去获取icon列表）
    // var _iconlist = item == 2 ? wx.getStorageSync('iconlist_out') : wx.getStorageSync('iconlist_in');

    // obj.setData({
    //   iconlist: _iconlist,
    //   nav_item: item,
    //   nav_icon: _iconlist[0].icon,
    //   nav_name: _iconlist[0].name,
    //   tagid: _iconlist[0].id,
    //   tag_action_id: _iconlist[0].id,
    //   tag_action_color: _iconlist[0].iconcolor,
    // });

    //新的写法（直接从data里面去获取icon列表）
    var iconlist1 = [{id:0,name:"餐饮",icon:"icon-food"},{id:1,name:"旅行",icon:"icon-travel"},{id:2,name:"衣服",icon:"icon-clothes"},{id:3,name:"电费",icon:"icon-electric"},{id:4,name:"购物",icon:"icon-shopping"},{id:5,name:"理财",icon:"icon-financing"},{id:6,name:"交通",icon:"icon-traffic"},{id:7,name:"住房",icon:"icon-housing"},{id:8,name:"水费",icon:"icon-water"},{id:9,name:"宠物",icon:"icon-pets"}]

    var iconlist2 = [{id:100,name:"旅行",icon:"icon-travel"},{id:101,name:"餐饮",icon:"icon-food"},{id:102,name:"衣服",icon:"icon-clothes"},{id:103,name:"电费",icon:"icon-electric"},{id:104,name:"购物",icon:"icon-shopping"}]

    //设置初始化数据（收入和支持的默认选中项）
    item==2 ? obj.setData({
      iconlist:iconlist1,
      nav_item:2,
      nav_icon:iconlist1[0].icon,
      nav_name:iconlist1[0].name,
      tagid:iconlist1[0].id,
      tag_action_id:iconlist1[0].id
    }):obj.setData({
      iconlist:iconlist2,
      nav_item:1,
      nav_icon:iconlist2[0].icon,
      nav_name:iconlist2[0].name,
      tagid:iconlist2[0].id,
      tag_action_id:iconlist2[0].id
    })

    console.log('选择菜单', item)
  },

  // tag点击
  clickimgs: function (e) {
    var obj = this;
    console.log(e);

    obj.setData({
      nav_icon: e.currentTarget.dataset.tagicon,
      nav_name: e.currentTarget.dataset.tagname,
      tagid: e.currentTarget.dataset.tagid,
      tag_action_id: e.currentTarget.dataset.tagid,
      tag_action_color: e.currentTarget.dataset.tagcolor,
    });
  },

  // 保存
  formSubmit: function (e) {
    var obj = this;
    // 参数
    var info = e.detail.value;
    console.log(info);
    var bool = true;
    // 按钮属性
    var _btnsive = e.detail.target.dataset.btn;
    
    //规范更新fromid不让用了(弃用)
    var formid = e.detail.formId;

    console.log(formid);

    if (info.money == "") {
      bool = false;
      wx.showToast({
        title: '请记录金额',
        duration: 2000
      });
    }

    if (bool) {
      console.log(e.detail.value);

      //【测试用】不连接后台
      //弹出toast
      wx.showToast({
        title: '保存成功',
        icon: 'success',
      });
      //设置缓存
      wx.setStorage({
        key: "inputtestdata",
        data: e.detail.value,
        success:res => {
          console.log('缓存测试数据成功');
          obj.setData({inputtestdata:e.detail.value})
          console.log('测试数据写入data')
        }
      });
      
      //申请订阅权限
      wx.requestSubscribeMessage({
        tmplIds: ['FPqb423kHHNk2wsuJBjSLwR2BGdhCLz7yC1o8d2d-zI'],
        success:res=> {
          if (res['FPqb423kHHNk2wsuJBjSLwR2BGdhCLz7yC1o8d2d-zI'] == 'accept'){
            console.log('设置订阅消息授权成功') 
            //请求服务端下发订阅消息
            wx.request({
              method:"POST",
              data:{
                "touser": app.globalData.openid,
                "template_id": "FPqb423kHHNk2wsuJBjSLwR2BGdhCLz7yC1o8d2d-zI",
                "page": "pages/mbook/mbook",
                "miniprogram_state":"developer",
                "lang":"zh_CN",
                "data": {
                    "thing1": {
                        "value": this.data.inputtestdata.type==2?"支出":"收入"
                    },
                    "amount6": {
                        "value": this.data.inputtestdata.money
                    },
                    "amount2": {
                        "value": "999999"
                    } ,
                    "thing3": {
                        "value": this.data.inputtestdata.remark?this.data.inputtestdata.remark:"无"
                    }
                }
              },
              url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token='+app.globalData.access_token,
              success:res=>{
                console.log(res)
              }
            })
            //切换tab
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/mbook/mbook',
                success: function (e) {
                  console.log(e.errMsg);
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad();
                }
              });
            }, 1000);
          }else{
            //切换tab
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/mbook/mbook',
                success: function (e) {
                  console.log(e.errMsg);
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onLoad();
                }
              });
            }, 1000);
          }   
        }
      })

      

      //【正式】跟后台联调整用这个
      wx.request({
        url: app.siteInfo.apiurl + '/mbook/savemoneywater?formid=' + formid,
        data: e.detail.value,
        header: { 'content-type': 'application/json' },
        success: function (res) {

          console.log(res.data);
          wx.showToast({
            title: '保存成功',
            icon: 'success',
          });

          setTimeout(function () {
            wx.switchTab({
              url: '/pages/mbook/mbook',
              success: function (e) {
                console.log(e);
                var page = getCurrentPages().pop();
                console.log(page)
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            });
          }, 1000);

          //原来的保存再记逻辑（弃用）
          // if (_btnsive == 1) {
          //   setTimeout(function () {
          //     obj.setData({
          //       money: ''
          //     });
          //     obj.onLoad();
          //   }, 1000);
          // } else {
          //   setTimeout(function () {
          //     wx.switchTab({
          //       url: '/pages/mbook/mbook',
          //       success: function (e) {
          //         console.log(e);
          //         var page = getCurrentPages().pop();
          //         console.log(page)
          //         if (page == undefined || page == null) return;
          //         page.onLoad();
          //       }
          //     });
          //   }, 1000);
          // }
        }
      })
    } else {

    }

    obj.generatewaterid()

  },

  // 保存再记
  btnsives: function (e) {
    console.log(e);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }

  //生成唯一不重复ID
  generatewaterid: function (length=5){
    var id=Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
    this.setData({
      id:id
    })
    // console.log(this.data.id)
  },
})