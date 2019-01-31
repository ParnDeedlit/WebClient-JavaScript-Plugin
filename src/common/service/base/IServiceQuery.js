import {Zondy} from '../../Base';
import {FetchRequest} from "../../network/FetchRequest";

Zondy.Service = Zondy.Service || {};
/*
 * @author 潘卓然 ParnDeedlit
 */
export class IServiceQuery {

  constructor(method, url, params, map, style, onSuccess, onFailure) {
    this.method = method;
    this.url = url;
    this.params = params;
    this.fetchServiceData(map, style, onSuccess, onFailure);
  }

  fetchServiceData(map, style, success, failure) {
    FetchRequest.commit(this.method, this.url, this.params, {
      // headers: options.headers,
      // withCredentials: options.withCredentials,
      // timeout: options.async ? 0 : null,
      // proxy: options.proxy
    }).then(function(response) {
      if (response.text) {
        return response.text();
      }
      return response.json();
    }).then(function(text) {
      var result = null;
      if (typeof text === "string" && (text.toLowerCase() == 'true' || text.toLowerCase() == 'false')) {
        result = {};
        if (text.toLowerCase() == 'true') {
          result.succeed = true;
        } else {
          result.error = true;
        }
      } else if (typeof text === "string") {
        result = text;
      }

      if (!result || result.error) {
        if (result && result.error) {
          result = {
            error: result.error
          };
        } else {
          result = {
            error: true
          };
        }
      }
      if (result.error) {
        failure(result);
      } else {
        if (!isNaN(result)) //为数字
        {
          result = {
            value: result
          };
        }
        if (typeof result === "string") {
          result = {
            value: result
          };
        }
        if (Object.prototype.toString.call(result) != '[object Array]') {
          result.succeed = result.succeed == undefined ? true : result.succeed;
        } else {
          result = {
            value: result,
            succeed: true
          };
        }
        success(result, map, style);
      }
    });
  }

};

Zondy.Service.IServiceQuery = IServiceQuery;
