const app = getApp();

Page({
  data: {
    userName: "",
    userImage: "",
  },
  onReady() {
  },
  onShow() {
  },
  onHide() {
  },
  onUnload() {
  },
  onLoad(query) {
    if(app.data.userId == -1 && app.data.requiredLogin) {
      my.getUserInfo({
      success: (res) => {
        console.log("Request authen SUCCESS: ", res);
        if(res !== undefined) {
          this.requestSharableBooks();
          app.setUserName(res.name);
          app.setUserId("1");
          this.setData({
            userImage: res.avatar,
            userName: res.name,
          });
        } else {
          app.setUserName("Cứ cho là đã LOGIN");
          app.setUserId("1");
          this.setData({
            userName: app.data.userName,
            userImage: app.data.userImage,
          });
          this.requestSharableBooks();
        }
        return
      },
      fail: (res) => {
        console.log("Request authen FAILED: ", res);
        app.setUserName("User - AUTHEN bị lỗi");
        app.setUserId("1");
        this.setData({
            userName: app.data.userName,
            userImage: app.data.userImage,
          });
        this.requestSharableBooks();
      },
    });
    } else {
      app.setUserName("User - Không cần yêu cầu Login");
      app.setUserId("1");
      this.setData({
        userName: app.data.userName,
        userImage: app.data.userImage,
      });
      my.request({
      url: 'https://api.tala.xyz/shopping/v1/mini-app/all-shareable-books/',
      method: 'GET',
      success: (response) => {
        console.log('Product Reponse: ', response)
        this.setData({ triets: response, loading: false });
      },
      fail: (fail) => {
        console.log('Fail', fail);
      }
    });
    }
  },
  requestSharableBooks() {
      my.request({
      url: 'https://api.tala.xyz/shopping/v1/mini-app/all-shareable-books/',
      method: 'GET',
      success: (response) => {
        console.log('Product Reponse: ', response)
        this.setData({ triets: response, loading: false });
      },
      fail: (fail) => {
        console.log('Fail', fail);
      }
    });
  },
  goMyBook() {
    my.navigateTo({url: `pages/mybook/index`});
  },
  onPageSendRequest(product) {
    // app.onAppSendRequest(product);

    this.setData({
      show: true,
      popup_text_1: 'Bạn có muốn gửi yêu cầu trao đổi sách?',
      popup_text_2: '(Triết sẽ chọn đổi với 1 quyển trong thư viện của bạn)'
      })
  },
  onCancel() {
    this.setData({ show: false })    
  },
  onSendConfirm() {
    // Show toast
    my.showToast({
      type: 'success',
      content: 'Đã gửi yêu cầu trao đổi sách',
      buttonText: 'OK',
      duration: 2000,
    });
    this.setData({ show: false })    
  },
  onPageAcceptRequest(product) {
    app.onAppAcceptRequest(product);

    // Show toast
    my.showToast({
      type: 'success',
      content: 'Sản phẩm đã được thêm vào giỏ hàng',
      buttonText: 'OK',
      duration: 3000,
    });
  }
});