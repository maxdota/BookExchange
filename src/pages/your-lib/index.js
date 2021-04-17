const app = getApp();

Page({
  onReady() {
  },
  onShow() {
  },
  onHide() {
  },
  onUnload() {
  },
  onLoad(query) {
    var requesterId = app.data.checkBookRequesterId;
    my.request({
      url: `https://api.tala.xyz/shopping/v1/mini-app/user-books/${requesterId}`,
      method: 'GET',
      success: (response) => {
        console.log('Product Reponse: ', response)
        this.setData({
          triets: response, loading: false,
          owner_name: "Người Ấy"
          });
      },
      fail: (fail) => {
        console.log('Fail', fail);
      }
    });
  },
  onPageAcceptRequest(product) {
    app.onRequestChosen(product);
    this.setData({
      show: true,
      popup_text_1: 'Bạn có muốn chọn sách này?',
      popup_text_2: '(Triết sẽ nhận sách của bạn để đổi với quyển này)'
      })
  },
  onRequestConfirm() {
    console.log('requester_id' + app.data.checkBookRequesterId);
    console.log('request_book_id' + app.data.checkBookRequestBookId);
    console.log('user_id' + app.data.userId);
    console.log('book_id' + app.data.checkBookId);
    console.log('id' + app.data.checkBookRequestId);
    my.request({
      url: 'https://api.tala.xyz/shopping/v1/mini-app/request/accept',
      headers: {
          "Content-Type": "application/json"
        },
      method: 'POST',
      data: {
        id: app.data.checkBookRequestId,
        requester_id: app.data.checkBookRequesterId,
        request_book_id: app.data.checkBookRequestBookId,
        user_id: app.data.userId,
        book_id: app.data.checkBookId
      },
      success: (response) => {
        console.log('Reject success!');
        this.setData({
          show: false,
          showFinishPopup: true,
          popup_text_1: 'Trao đổi sách thành công. Mã giao dịch: 12',
          popup_text_2: 'Người ấy sẽ nhận Ông già và biển cả và đưa bạn sách Harry Potter',
          popup_text_3: 'SĐT của người ấy: 0985494839',
          popup_text_4: 'Vui lòng lưu lại thông tin này bằng screenshot'
        })
      },
      fail: (fail) => {
        console.log('Reject Fail', fail);
      }
    }); 
  },
  onCancel() {
    this.setData({ show: false, showFinishPopup: false })    
  },
  onFinish() {
    my.reLaunch({ url: "pages/index/index" });
  },
});