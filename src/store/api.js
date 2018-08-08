import md5 from "blueimp-md5";
import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV == "development"
    ? "http://192.168.6.59:9089/MiService/api/ringMap"
    : "http://192.168.6.59:9089/MiService/api/ringMap";

const actId = "ringMap";

// 0.104 8080  FIFA

const doMd5 = ACTID => {
  let timestamp = new Date().valueOf();
  let str = `actId=${ACTID}&timestamp=${timestamp}`;
  let signstr = md5(str).toUpperCase();
  return {
    sig: signstr,
    timestamp: timestamp
  };
};
/**
 *
 * @param {*} url
 * @param {*} actId
 * @param {*} param
 */
export const doJavaPost = (url, param) => {
  let sig = doMd5(actId);
  let params = { actId: actId, ...sig, ...param };
  return new Promise((resolve, reject) => {
    axios({
      url: BASE_URL + url,
      method: "post",
      data: params,
      transformRequest: [
        function(data) {
          let ret = "";
          for (let it in data) {
            ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          return ret;
        }
      ],
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(data => {
        resolve(data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
