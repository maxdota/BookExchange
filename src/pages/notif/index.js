const app = getApp();

Page({
  data: {
    loading: true
  },
  onLoad() {
    console.log('Noti onLoad');
  },
  reload() {
    my.request({
      url: 'https://api.tala.xyz/shopping/v1/mini-app/notifications/' + app.data.userId,
      method: 'GET',
      success: (response) => {
        console.log('Requests Reponse: ', response)
        var items = response.filter(
          r => (
            r.status === 'PENDING' && r.user_id === app.data.userId
            ) || (
              r.status === 'ACCEPTED' && r.requester_id === app.data.userId
            )
        )
        var notiCount = items.length;
        console.log('notification number: ' + notiCount);
        this.setData({ triets: items, loading: false });
      },
      fail: (fail) => {
        console.log('Fail', fail);
      }
    }); 
  },
  onPageCheckBook(product) {
    app.onPageCheckBook(product);
    my.navigateTo({url: `pages/your-lib/index`});
  },
  onPageDetails(product) {
    this.setData({
      show: true,
      popup_text_1: 'Sách ' + product.user_name + ' muốn từ bạn: ' + product.book_name,
      popup_text_2: 'Sách bạn nhận được: ' + product.request_book_name,
      popup_text_3: 'SĐT liên hệ: 0943275843',
      })
  },
  onPageReject(product) {
    console.log('sending reject for request id: ' + product.id);
    my.request({
      url: 'https://api.tala.xyz/shopping/v1/mini-app/request/reject',
      headers: {
          "Content-Type": "application/json"
        },
      method: 'POST',
      data: {
        id: product.id
      },
      success: (response) => {
        console.log('Reject success!');
        this.reload();
      },
      fail: (fail) => {
        console.log('Reject Fail', fail);
      }
    }); 
  },
  onReady() {
    console.log('Noti onReady');
  },
  onShow() {
    console.log('Noti onShow');
    this.reload();
  },
  onHide() {
  },
  onUnload() {
  }
});