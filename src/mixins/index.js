import wepy from 'wepy'

// 开发模式
const DEV_BUILD = false

export default class Mixin extends wepy.mixin {
  data = {
    // 线上地址
    // host: 'https://rentapitest.cehome.com/',
    host: DEV_BUILD ? 'https://rentapitest.cehome.com/' : 'https://rentapi.cehome.com/',
    // 当前时间
    currentTime: '',
    // 分享文案
    shareTitle: '铁甲设备租赁，真正为老铁找到最合适的工程需求',
    // 最终时间
    finishTime: '',
    navTitleText: '发布设备',
    // 客服电话
    phoneTieJia: '400-009-9531',
    // 微信openid
    wxOpenId: 'WxoPEnID2568Dwd5D',
    // 价格单位
    priceTypeArr: {
      1: '台班',
      2: '天',
      3: '月',
      4: '土石方',
      5: '车',
      6: '立方米',
      7: '平方米',
      8: '米'
    },
    ISLogin: false
  };
  methods = {
    tap() {}
  };

  onShow() {}

  onLoad() {
    // 获取时间
    this.getCurrentDate()
  }

  // 统计触发
  // 统计打开页面
  autoTrackPageShow(pageTitle) {
    this.$wxapp.sensors.para.autoTrack.pageShow = {
      title: pageTitle
    }
  }

  // 获取时间
  getCurrentDate(n) {
    let date
    if (n) {
      date = new Date(Number(n))
    } else {
      date = new Date()
    }
    var year = date.getFullYear()
    var month = date.getMonth() + 1,
      endMonth = date.getMonth() + 2
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (endMonth >= 1 && endMonth <= 9) {
      endMonth = '0' + endMonth
    } else if (endMonth > 12) {
      endMonth = '01'
      year += 1
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }

    if (n) {
      let me = date.getFullYear() + '-' + month + '-' + strDate

      return me
    }

    this.currentTime = date.getFullYear() + '-' + month + '-' + strDate
    this.finishTime = year + '-' + endMonth + '-' + strDate
  }

  getTimestamp(timestamp) {
    var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '.'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.'
    let D = date.getDate() + ' '
    return Y + M + D
  }

  // 获取倒计时
  getStartTimer(timer) {
    var days = parseInt(timer / 864e2) // 天
    var hours = parseInt((timer - days * 864e2) / 36e2) // 小时
    var minutes = parseInt((timer - days * 864e2 - hours * 36e2) / 60) // 分钟
    var t = ''
    if (days) {
      t += days + '天'
    } else if (hours) {
      t += hours + '小时'
    } else if (minutes) {
      t += minutes + '分钟'
    }
    console.log(t)

    return t
  }
  // 执行事件统计
  setSensorsData(properties) {
    this.$wxapp.sensors.track('myevent', properties)
  }

  // 列表页电话
  sensorOrderTel(status, n) {
    let properties = {
      Category: '点击联系对方按钮',
      Action: '',
      Label: ''
    }
    switch (status) {
      case 3:
        properties.Action = n ? '订单列表页(等待进场)' : '订单详情页(等待进场)'
        break

      case 4:
        properties.Action = n ? '订单列表页(等待确认进场)' : '订单详情页(等待确认进场)'
        break
      case 5:
        properties.Action = n ? '订单列表页(已完成)' : '订单详情页(已完成)'
        break
    }
    this.$wxapp.sensors.track('myevent', properties)
  }
  // 提交个人信息
  submitMyInfo(userInfo) {
    // 提交
    wepy
      .request({
        url: `${this.host}app/device/saveUser`,
        data: userInfo,
        method: 'POST',
        header: {
          'content-Type': 'application/x-www-form-urlencoded',
          client: 'm'
        }
      })
      .then(res => {
        if (res.data.ret === '0') {
          this.$parent.globalData.ISLogin = true
          this.ISLogin = true
          wepy.showToast({
            icon: 'none',
            title: '授权成功',
            duration: 1300
          })
          this.$apply()
        }
      })
  }
}
