/**
 * 微信小程序html渲染
 */
import showdown from './showdown.js';
import htmlToJson from './html2json.js';

class WxParse
{
  /**
   * 解析并渲染数据
   *
   * @param bindName 绑定的变量
   * @param type 将要解析的数据类型
   * @param data 将要解析的数据
   * @param target 微信小程序页面或者组件构造对象
   * @param imagePadding 图片渲染内距
   */
  static parse(bindName = 'wxParseData', type = 'html', data = '<div class="color:red;">数据不能为空</div>', target, imagePadding, baseImageUrl='') {
    const bindData = {};

    if (type === 'html') {
      bindData[bindName] = htmlToJson.html2json(data, bindName, baseImageUrl);
    } else if (type === 'md' || type === 'markdown') {
      let converter = new showdown.Converter();
      bindData[bindName] = htmlToJson.html2json(converter.makeHtml(data), bindName);
    }
    bindData[bindName].view = {};
    bindData[bindName].view.imagePadding = typeof (imagePadding) != 'undefined' ? imagePadding : 0;
    
    target.setData(bindData);
    target.triggerEvent('rendered');
  }

  static wxParseTemArray(temArrayName, bindNameReg, total, that) {
    var array = [];
    var temData = that.data;
    var obj = null;
    for (var i = 0; i < total; i++) {
      var simArr = temData[bindNameReg + i].nodes;
      array.push(simArr);
    }

    temArrayName = temArrayName || 'wxParseTemArray';
    obj = JSON.parse('{"' + temArrayName + '":""}');
    obj[temArrayName] = array;
    that.setData(obj);
  }

  /**
   * 配置emoji
   */
  static emojisInit(reg = '', baseSrc = "/wxParse/emojis/", emojis) {
    htmlToJson.emojisInit(reg, baseSrc, emojis);
  }
}

export default WxParse;
