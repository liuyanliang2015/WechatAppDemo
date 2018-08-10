
import util from 'util.js';
import json from 'json.js';
/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _get(url, success, fail) {
  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}
/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _get_json(url,data,success, fail) {
  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/json'
    },
    data: data,
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

/**
 * url 请求地址
 * data 数据
 * success 成功的回调
 * fail 失败的回调
 */
function _post_from(url, data, success, fail) {
  wx.request({
    url: url ,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: { data: data },
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

/**
* url 请求地址
* data 数据
* success 成功的回调
* fail 失败的回调
*/
function _post_json(url, data, success, fail) {
  wx.request({
    url: url ,
    header: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data,
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}
//模块只有通过module.exports或者exports才能对外暴露接口。
module.exports = {
  _get: _get,
  _get_json: _get_json,
  _post_from: _post_from,
  _post_json: _post_json
}