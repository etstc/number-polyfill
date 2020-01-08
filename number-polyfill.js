/**
 * Number加减乘除精度计算($AMMD):
 *  加(add)、减(minus/sub)、乘(mul)、除(div): 
 * 使用:
 *  1、$AMMD.add(0.1,0.2) 
 *  2、Number.add(0.1,0.2)
 *  3、Number(1).add(0.1)
 *  4、0.1.add(0.2)
 * 
 * 解决问题:
 *  1、0.1 + 0.2 != 0.3
 *  2、91.29 * 10 != 912.9 
 * 
 * Author: vipx.o
 */
(function (global, factory) {
  if ('object' === typeof wx && 'object' === typeof module && !!wx.login) {
    module.exports = factory() // 兼容 Wechat Mini-Program
  } else if ('object' === typeof my && 'object' === typeof module && !!my.login) {
    module.exports = factory() // 兼容 Alipay Mini-Program
  } else if ('object' === typeof swan && 'object' === typeof module && !!swan.login) {
    module.exports = factory() // 兼容 Baidu Smart-Program
  } else if ('object' === typeof tt && 'object' === typeof module && !!tt.login) {
    module.exports = factory() // 兼容 Toutiao Mini-App
  } else if ('object' === typeof exports && 'object' === typeof module) {
    module.exports = factory() // 兼容 CommonJS
  } else if ('function' === typeof define && (define.amd || define.cmd)) {
    define(factory) // 兼容 AMD/CMD
  } else if ('object' === typeof exports) {
    exports = factory();
  } else if (global) {
    global['$AMMD'] = factory();
  }
}(this, function () {
  "use strict"
  // add、minus(sub)、mul、div(AMMD)四则运算
  var $AMMD = new Object();
  // 加
  $AMMD.add = function (arg1, arg2) {
    var n1 = Number(arg1 || 0)
    var n2 = Number(arg2 || 0)
    var s1 = n1.toString()
    var s2 = n2.toString()
    var r1, r2
    try {
      r1 = s1.split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = s2.split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    var acc = Math.max(r1, r2) //精度长度
    var m = Math.pow(10, acc)
    return Number(((n1 * m + n2 * m) / m).toFixed(acc))
  }

  //减
  $AMMD.sub = $AMMD.minus = function (arg1, arg2) {
    var n1 = Number(arg1 || 0)
    var n2 = Number(arg2 || 0)
    var s1 = n1.toString()
    var s2 = n2.toString()
    var r1, r2
    try {
      r1 = s1.split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = s2.split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    var acc = Math.max(r1, r2) //精度长度
    var m = Math.pow(10, acc)
    return Number(((n1 * m - n2 * m) / m).toFixed(acc))
  }

  // 乘
  $AMMD.mul = function (arg1, arg2) {
    var n1 = Number(arg1 || 0)
    var n2 = Number(arg2 || 0)
    var s1 = n1.toString()
    var s2 = n2.toString()
    var r1, r2
    try {
      r1 = s1.split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = s2.split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    var acc = r1 + r2 //精度长度
    var m = Math.pow(10, acc)
    return Number((Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / m).toFixed(acc))
  }

  // 除
  $AMMD.div = function (arg1, arg2) {
    var n1 = Number(arg1 || 0)
    var n2 = Number(arg2 || 0)
    var s1 = n1.toString()
    var s2 = n2.toString()
    var r1, r2
    try {
      r1 = s1.split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = s2.split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    var v = (Number(s1.replace(".", "")) / Number(s2.replace(".", "")))
    var acc = r2 - r1
    if (acc < 0) {
      var m = Math.pow(10, -acc)
      return v / m
    } else {
      var m = Math.pow(10, acc)
      return v * m
    }
  }

  // 注入Number，方便使用
  for (var mkey in $AMMD) {
    Object.defineProperty(Number, mkey, {
      value: $AMMD[mkey],
      writable: true,
      configurable: true
    });
    Number.prototype[mkey] = Function('return (' + $AMMD[mkey] + ')(this, arguments[0])')
  }

  return $AMMD;
}))