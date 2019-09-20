//使用 WebSocket 的網址向 Server 開啟連結
const HOST = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(HOST);

// 抓每個 .key 後，跑 forEach 監聽每個 .key 的動畫結束時跑 callback handleTransition
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', handleTransition));

// 目的是結束動畫時移除 .playing class
function handleTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

ws.onopen = () => {
  console.log('open connection');
};
ws.onclose = () => {
  console.log('close connection');
};

// 做音樂的播放及加上 .playing 做動畫
ws.onmessage = event => {
  const audio = document.querySelector(`audio[data-key="${event.data}"]`);
  const key = document.querySelector(`div[data-key="${event.data}"]`);
  const isSafariBrowser =
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  if (isSafariBrowser) {
    const promise = document.querySelector('audio').play();
    // 判斷 safari 是否無法自動播放
    if (promise !== undefined) {
      promise.catch(error => {
        alert('請前往設定開啟自動播放。');
      });
    }
  }
  if (!audio) return;
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
};
