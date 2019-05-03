function serializeParams(params) {
  if (!params) {
    return ''
  }
  return Object.keys(params)
    .map(key => (`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)).join('&')
}

function generateRequestUrlWithParams(url, params) {
  params = typeof params === 'string' ? params : serializeParams(params)
  url += (~url.indexOf('?') ? '&' : '?') + params
  url = url.replace('?&', '?')
  return url
}

wx.vrequest = function (options) {

  options = options || {}
  if (typeof options === 'string') {
    options = {
      url: options
    }
  }

  let url = options.url
  let data = options.data || {}
  const params = {}
  const res = {}

  let method = options.method || 'GET'
  method = method.toUpperCase()

  if (method === 'GET') {
    url = generateRequestUrlWithParams(url, data)
  } else {
    if (typeof data === 'object') {
      const contentType = options.header && (options.header['content-type'] || options.header['Content-Type'])
      if (contentType === 'application/json') {
        data = JSON.stringify(data)
      } else if (contentType === 'application/x-www-form-urlencoded') {
        data = serializeParams(data)
      }
    }
  }

  if (method !== 'GET' && method !== 'HEAD') {
    params.body = data
  }

  // 转发options。 options 属性仍可读取，被使用
  params.headers = options.header
  params.mode = options.mode
  params.credentials = options.credentials
  params.cache = options.cache
  params.method = method
  params.url = url

  // 开始请求
  return new Promise((RES, REJ) => {
    wx.cloud.callFunction({
      name: 'v-request',
      data: {
        options: params
      },
      success: res => {

        const { result } = res;
        console.log((result))
        // 如果datatype='json'，则解析后


        options.success && options.success(result);
        RES(result);
      },
      fail: err => {
        // 错误回调
        options.fail && options.fail({
          errMsg: 'request:fail',
          err
        });
        REJ(err);
      },
      complete: options.complete
    })
  })
}