
window.NETTY = {
  socket: null,
  init: function() {
    if (window.WebSocket) {
      NETTY.socket = new WebSocket("ws://localhost:8087/ws");
      NETTY.socket.onopen = function() {
        console.log("连接建立成功...");
      },
        NETTY.socket.onclose = function() {
          console.log("连接关闭...");
        },
        NETTY.socket.onerror = function() {
          console.log("发生错误...");
        },
        NETTY.socket.onmessage = function(e) {
          console.log("接受到消息：" + e.data);
          var receiveMsg = document.getElementById("receiveMsg");
          var html = receiveMsg.innerHTML;
          receiveMsg.innerHTML = html + "<br/>" + e.data;
        }
    } else {
      alert("浏览器不支持websocket协议...");
    }
  },
  chat: function() {
    var id = "10086";
    var msg = document.getElementById("msgContent");
    var object = {};
    object['id'] = id;
    object['message'] = msg.value;
    var json = JSON.stringify(object);
    NETTY.socket.send(json);
  }
};

NETTY.init();
