const HOST = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(HOST);

ws.onopen = () => {
  console.log('open connection');
  // 抓整個 .key 後跑 forEach 去監聽每個按鈕，然後傳送相對應的 data-* 資料
  const keys = document.querySelectorAll('.key');
  keys.forEach(keyDown =>
    keyDown.addEventListener('click', e => {
      const { key } = e.target.dataset;
      ws.send(key);
    })
  );
};

ws.onclose = () => {
  console.log('close connection');
};
