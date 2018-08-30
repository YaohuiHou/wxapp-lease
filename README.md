# wxapp-lease

租聘(找活)微信端小程序

![image](./erweima.jpg)

# 首页

### 1、获取城市列表接口

```
接口地址：getCityList
请求方式：get/post
```

| 参数名    | 参数类型 | 是否必填 | 参数描述 |
| --------- | -------- | -------- | -------- |
| longitude | int      | 否       | 经度     |
| latitude  | int      | 否       | 纬度     |

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data': [
        {
            id: 12,  // 区域id
            name: '安徽',    // 区域名
            enName: 'anhui',  // 英文名
            parentId: -1, //（-1表示自己就为省，不为1表示自己对应的省的id）
            children: [
                {
                    id: 193,
                    level: 3,
                    name: '安庆市',
                    enName: '"anqing"'
                    parentId: 12
                },
                {
                    id: 193,
                    level: 3,
                    name: '安庆市',
                    enName: '"anqing"'
                    parentId: 12
                }
            ]
        },
        ...
    ]
}
```

### 2、获取工程类型接口

```
接口地址：getProjectTypeList
请求方式：get/post
```

参数无

```
// 返回格式：json
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data': [
        {
            id: '12', // 类型id
            name: '路面工程' // 工程名称
        },
        {
            id: '122', // 类型id
            name: '园林工程' // 工程名称
        },
        ...
    ]
}
```

### 3、获取设备类型接口

```
接口地址：getDeviceTypeList
请求方式：get/post
```

参数无

```
// 返回格式: json
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data': [
        {
            id: '12', // 类型id
            name: '挖掘机械' // 类型名称
            children: [     // 子类设备
                {
                    id: '109', // 设备id
                    name: '挖掘机' // 设备名称
                },
                {
                    id: '78', // 设备id
                    name: '两头忙' // 设备名称
                }
            ]
        },
        ...
    ]
}
```

### 4、工程状态接口

```
[
    {
        id:'0', // 状态id
        name: '已结束', // 状态名称
    },
    {
        id:'1', // 状态id
        name: '未结束', // 状态名称
    },
    {
        id:'2', // 状态id
        name: '未选择', // 状态名称
    }
]
```

### 5、获取工程发布列表

```
接口地址：getEngineeringList
请求方式：get/post
```

| 参数名        | 参数类型 | 是否必填 | 参数描述       |
| ------------- | -------- | -------- | -------------- |
| cityId        | int      | 否       | 城市 id        |
| startTime     | string   | 否       | 开始时间       |
| endTime       | string   | 否       | 结束时间       |
| projectType   | int      | 否       | 工程类型       |
| deviceType    | int      | 否       | 设备类型       |
| projectStatus | int      | 否       | 工程状态       |
| page          | int      | 否       | 页数（默认 1） |

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data': {
        'totality': 123,   // 发布的总数量
        list:[
            {
                name: '省道445线路道扩建工程', // 工程名
                id: 12343, // 工程id
                status: 0, // 工程状态  0 已抢单  1 抢单中 2 未抢单  3 已结束
                address: '云南省 大理市',  // 工程地址
                devices: [   // 设备列表
                    {
                        status: 0 // 设备状态  0 已抢单  1 抢单中 2 未抢单  3 已结束
                        amount: 3台  // 设备数量
                        target:{
                          '吨位': 20吨  // 吨位
                        },
                        deviceType: '泵车',  // 设备类型
                        workload: '20天' // 工作量
                        workStartTime: '2018-06-30' // 进厂时间
                    },
                    ...
                ]
            },
            ...
        ]
    }
}
```

# 工程详情页

### 1、获取工程详情接口

```
接口地址：getEngineeringDetail
请求方式：get/post
```

| 参数名    | 参数类型 | 是否必填 | 参数描述 |
| --------- | -------- | -------- | -------- |
| projectId | int      | 是       | 工程 id  |
| openId    | int      | 否       | openid   |

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data':{
        name: '省道445线路道扩建工程', // 工程名
        id: 12343, // 工程id
        status: 0, // 工程状态  0 已抢单  1 抢单中 2 未抢单  3 已结束
        // 工程详情
        projectInfo:{
            address: '云南省 大理市',  // 工程地址
            projectType: '公路工程',  // 工程类型
            projectCode: '124123411234',  // 工程编号
            company: '中铁建十一局'     // 工程单位
            fuel: true  // 燃油供应
        },
        // 求租设备列表
        devices: [
            {
                id: 12312,  // 订单id
                status: 0 // 设备状态  0 已抢单  1 抢单中 2 未抢单  3 已结束
                amount: 3台  // 设备数量
                tonnage: 20吨  // 吨位
                deviceType: '泵车',  // 设备类型
                workload: '20天' // 工作量
                workStartTime: '2018-06-30' // 进厂时间
                tool: false,   // 是否带锤
                driver: false  // 是否带司机
                isVip: true  // VIP
                certification: true  // 认证
            },
            ...
        ]
    }
}
```

## 抢活

### 2、获取所抢项目单的详情

```
接口地址：getEngineeringList
请求方式：get/post
```

| 参数名    | 参数类型 | 是否必填 | 参数描述 |
| --------- | -------- | -------- | -------- |
| projectId | int      | 是       | 工程 id  |
| orderId   | int      | 是       | 订单 id  |
| openId    | int      | 否       | openid   |

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data': [
        {
            name: '省道445线路道扩建工程', // 工程名
            id: 12343, // 工程id
            status: 0, // 工程状态  0 已抢单  1 抢单中 2 未抢单  3 已结束
            // 工程详情
            projectInfo:{
                address: '云南省 大理市',  // 工程地址
                projectType: '公路工程',  // 工程类型
                projectCode: '124123411234',  // 工程编号
                company: '中铁建十一局'     // 工程单位
                fuel: true  // 燃油供应
            },
            // 项目单设备要求
            devices: [
                {
                    status: 0 // 设备状态  0 已抢单  1 抢单中 2 未抢单  3 已结束
                    amount: 3台  // 设备数量
                    tonnage: 20吨  // 吨位
                    deviceType: '泵车',  // 设备类型
                    workload: '20天' // 工作量
                    workStartTime: '2018-06-30' // 进厂时间
                },
                ...
            ]
        },
        ...
    ]
}
```

### 3、获取所有设备

```
接口地址：getUserDeviceList
请求方式：get/post
```

| 参数名    | 参数类型 | 是否必填 | 参数描述       |
| --------- | -------- | -------- | -------------- |
| openid    | int      | 是       | 用户 id        |
| projectId | int      | 否       | 工程 id        |
| orderId   | int      | 否       | 订单 id        |
| page      | int      | 否       | 页数（默认 1） |

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data': [
        {
            name: '小松 23D3O 挖掘机', // 设备名
            status: 0, // 设备状态 0 审核中  1 可抢单  2 抢单中  3 未过审  4 已抢单
            id: 12343, // 设备id
            img:'https://www.cehome.com/wxapp/showHead.jpg',     // 展示链接
            orderStatus: 0, // 设备在订单中的状态  0 正常可抢单  1 时间冲突 2 无司机  3 未认证 4 待审核
            address: '云南省 大理市',  // 地址
            target:{
              '吨位': 20吨  // 吨位
            },
            deviceType: '挖掘机',  // 设备类型
            typeMode:'23D3O',  // 品牌型号
            brand:'小松'，   // 品牌
            workload: '20天' // 工作量
            workStartTime: '2018-06-30' // 工作时间
            price:'900元/台班',
            tool: false,   // 是否带锤
            driver: false  // 是否带司机
            isVip: true  // VIP
            certification: true  // 认证
        },
        ...
    ]
}
```

### 4、提交选中设备

```
接口地址：grabSingle
请求方式：get/post
```

| 参数名    | 参数类型 | 是否必填 | 参数描述 |
| --------- | -------- | -------- | -------- |
| openid    | int      | 是       | 用户 id  |
| projectId | int      | 是       | 工程 id  |
| orderId   | int      | 是       | 订单 id  |
| price     | string   | 是       | 价格     |
| deviceId  | string   | 是       | 设备 id  |

请求格式示例

```
// 请求参数
{
    userId:12312,
    projectId: 2134,
    orderId: 67854,
    prices:'200,400,900'
    deviceIds:'12341,34621,823234'
}
```

返回格式：json

```
// 返回参数

{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data': ''
}
```

# 发布设备

> 需要给出其他固定参数的值；例如：吨位、价格、租聘周期等

### 1、获取品牌列表

```
接口地址：getBrandList
请求方式：get/post
```

| 参数名   | 参数类型 | 是否必填 | 参数描述 |
| -------- | -------- | -------- | -------- |
| deviceId | int      | 否       | 设备 id  |

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data':{
        A: [
            {
                id: 23412,  // 品牌id
                name: '阿斯顿马丁',  // 品牌名称
            }
        ]
    }
}
```

### 2、获取品牌型号列表

```
接口地址：getBrandModeList
请求方式：get/post
```

| 参数名   | 参数类型 | 是否必填 | 参数描述 |
| -------- | -------- | -------- | -------- |
| brandId  | int      | 是       | 品牌 id  |
| deviceId | int      | 是       | 设备 id  |

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data':[
        {
            id: 23412,  // 型号id
            name: '320D1',  // 型号名称
        }
    ]
}
```

### 3、提交基本信息

```
接口地址：deviceInfoSubmit
请求方式：get/post
```

| 参数名     | 参数类型 | 是否必填 | 参数描述   |
| ---------- | -------- | -------- | ---------- |
| deviceId   | int      | 是       | 设备 id    |
| deviceName | string   | 是       | 设备名     |
| brandId    | int      | 是       | 品牌 id    |
| brandName  | string   | 是       | 品牌名     |
| modeId     | int      | 是       | 型号 id    |
| modeName   | string   | 是       | 型号名     |
| tonnage    | int      | 否       | 具体吨位值 |
| out_date   | string   | 是       | 出厂年限   |
| provinceId | int      | 是       | 省 id      |
| cityId     | int      | 是       | 城市 id    |
| hourId     | int      | 是       | 设备小时数 |
| serial     | int      | 是       | 设备序列号 |
| tool       | Boolean  | 是       | 是否带锤   |
| driver     | Boolean  | 是       | 是否带司机 |
| cloudBoxSN | int      | 否       | 云盒 SN    |
| remark     | string   | 否       | 设备说明   |
| imgs       | string   | 是       | 上传图片   |
| cycle      | int      | 是       | 租赁周期   |

提交格式

```
{
    deviceId: 45734,  // 设备id
    brandId: 23416,  // 品牌id
    modeId: 3464,   // 型号id
    tonnage: 20,   //具体吨位值
    out_date: '2018-10-21', // 出厂年限
    provinceId: 12341,  // 省id
    cityId: 1234,    // 城市id
    hourId: 4565  // 小时数
    serial: 3495839045, // 序列号
    tool: false,   // 是否带锤
    driver: false  // 是否带司机
    cloudBoxSN: 38972345,  // 云盒SN
    remark: '车子保养的很好，车载量大大的'   // 设备说明
    imgs: 'https://www.cehome.com/wxapp/showHead.jpg,https://www.cehome.com/wxapp/showHead1.jpg,,https://www.cehome.com/wxapp/showHead2.jpg,,,',    // 图片拼接地址  以 , 拼接
    cycleId: 0,  // 0 短租  1 月租  2 年租
}
```

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data':''
}
```

# 个人中心

### 0、我的详情

```
接口地址：getMyOrderInfo
请求方式：get/post
```

| 参数名 | 参数类型 | 是否必填 | 参数描述 |
| ------ | -------- | -------- | -------- |
| userId | int      | 是       | 用户 id  |

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data':{
        userName:'哇哈哈哈',  // 用户名称
        info: '这里是牛逼有限责任公司',  // 公司名称
        img: '',  // 头像
        devices: 10, // 设备数
        ongoing: 3,  // 抢单中
        winbidding: 2,  // 已抢单
        waitConfirm: 2, // 待确认
        waitStart: 2, // 待进厂
        goodJob: 2, // 已完成
    }
}
```

### 1、获取订单列表

```
接口地址：getDeviceDetail
请求方式：get/post
```

| 参数名    | 参数类型 | 是否必填 | 参数描述             |
| --------- | -------- | -------- | -------------------- |
| orderType | int      | 否       | 订单类型（默认全部） |
| openId    | int      | 是       | 用户 id              |
| page      | int      | 否       | 页数                 |

请求格式

```
{
    orderType: 0,  // 0 待确认  1 待进场  2 已完成  3 已取消  不传值为全部
    userId: 12341,
    page: 1  // 默认为1
}
```

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data':[
        {
            name: '省道445线路道扩建工程', // 工程名
            id: 12343, // 订单id
            status: 0, // 订单状态  0 等待抢单  1 等待确认设备  2 等待进厂  3 等待确认进厂  4 已完成  5 已取消
            tel: '18213229877',  // 联系电话
            // 工程详情
            projectInfo:{
                projectType: '公路工程',  // 工程类型
                projectCode: '124123411234',  // 工程编号
                company: '中铁建十一局'     // 工程单位
                address: '云南省 大理市',  // 工程地址
                fuel: true  // 燃油供应
            },
            amount: 3台  // 设备数量
            tonnage: 20吨  // 吨位
            deviceType: '泵车',  // 设备类型
            workload: '20天' // 工作量
            workStartTime: '2018-06-30' // 进厂时间
            driver: false  // 是否带司机
            isVip: true  // VIP
            certification: true  // 认证
        },
        ...
    ]
}
```

### 2、获取设备详情

```
接口地址：getDeviceDetail
请求方式：get/post
```

| 参数名   | 参数类型 | 是否必填 | 参数描述 |
| -------- | -------- | -------- | -------- |
| deviceId | int      | 是       | 设备 id  |
| openId   | int      | 否       | 用户 id  |

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data':{
        id: 45734,  // 设备id
        status: 0, // 设备状态 0 审核中  1 可抢单  2 抢单中  3 未过审  4 已抢单
        device: '挖掘机', // 设备类型
        brand: '小松',  // 品牌
        mode: '3200D',   // 型号
        tonnage: 20,   //具体吨位值
        out_date: '2018-10-21', // 出厂年限
        province: '陕西省',  // 省
        city: '西安市',    // 城市
        hour: 4565  // 小时
        serial: 3495839045, // 序列号
        tool: false,   // 是否带锤
        driver: false  // 是否带司机
        cloudBoxSN: false,  // 云盒SN
        remark: '车子保养的很好，车载量大大的'   // 设备说明
        imgs: [
            'https://www.cehome.com/wxapp/showHead1.jpg',
            'https://www.cehome.com/wxapp/showHead2.jpg'
        ],    // 图片
        cycle: 0,  // 0 短租  1 月租  2 年租
    }
}
```

### 3、修改姓名 || 修改公司

```
接口地址：editorUserInfo
请求方式：get/post
```

> 二者选一 上传

| 参数名   | 参数类型 | 是否必填 | 参数描述 |
| -------- | -------- | -------- | -------- |
| userName | string   | 否       | 用户姓名 |
| company  | string   | 否       | 公司名称 |
| openId   | int      | 否       | 用户 id  |

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data': ''
}
```

### 4、订单详情

```
接口地址：getOrderDetail
请求方式：get/post
```

| 参数名  | 参数类型 | 是否必填 | 参数描述 |
| ------- | -------- | -------- | -------- |
| orderId | int      | 是       | 订单 id  |
| openId  | int      | 否       | 用户 id  |

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data':{
        status: 0, // 订单状态  0 等待抢单  1 等待确认设备  2 等待进厂  3 等待确认进厂  4 已完成  5 已取消
        name: '省道445线路道扩建工程', // 工程名
        id: 12343, // 工程id
        tel:'1241234134', // 联系电话
        amount: 3台  // 设备数量
        tonnage: 20吨  // 吨位
        deviceType: '泵车',  // 设备类型
        workload: '20天' // 工作量
        workStartTime: '2018-06-30' // 进厂时间
        projectInfo:{
            projectType: '公路工程',  // 工程类型
            projectCode: '124123411234',  // 工程编号
            company: '中铁建十一局'     // 工程单位
            projectName: '道路234线路扩建工程',  // 工程名称
            address: '云南省 大理市',  // 工程地址
            fuel: true  // 燃油供应
        },
        // 设备列表
        devices: [
            {
                id: 12312,  // 设备id
                status: 0 // 设备状态  0 已抢单  1 抢单中 2 未抢单  3 已结束
                device: '挖掘机', // 设备类型
                brand: '小松',  // 品牌
                mode: '3200D',   // 型号
                tonnage: 20,   //具体吨位值
                out_date: '2018-10-21', // 出厂年限
                province: '陕西省',  // 省
                city: '西安市',    // 城市
                hour: 4565  // 小时
                serial: 3495839045, // 序列号
                price: '900元/台班'
                tool: false,   // 是否带锤
                driver: false  // 是否带司机
                isVip: true  // VIP
                certification: true  // 认证
                img: 'https://www.cehome.com/wxapp/showHead1.jpg',    // 图片
            },
            ...
        ]
    }
}
```

### 5、订单执行状态

```
接口地址：forOrderSubmit
请求方式：get/post
```

| 参数名    | 参数类型 | 是否必填 | 参数描述    |
| --------- | -------- | -------- | ----------- |
| userId    | int      | 是       | 用户 id     |
| orderId   | int      | 是       | 订单 id     |
| orderType | int      | 是       | 订单执行 id |

提交 json

```
{
    userId: 1244,
    orderId: 4563,
    orderType: 0   // 0 确认接单  1 确认进厂
}
```

返回格式：json

```
{
    "ret": 0//成功 失败1
    'msg': '请求成功',  // 提示文案
    'data': ''
}
```
