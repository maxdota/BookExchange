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
      my.getAuthCode({
        success: (resp) => {
            my.getUserInfo({
              success: (res) => {
                console.log("Request authen SUCCESS: ", res);
                if(res !== undefined) {
                  this.requestSharableBooks();
                  this.setAuth(res.name)
                  app.setUserName(res.name);
                  this.setData({
                    userImage: res.avatar,
                    userName: res.name,
                  });
                } else {
                  this.setAuth("Cứ cho là đã LOGIN");
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
                this.setAuth("User - AUTHEN bị lỗi");
                this.setData({
                    userName: app.data.userName,
                    userImage: app.data.userImage,
                  });
                this.requestSharableBooks();
              },
            });
        }
      });
      
    } else {
      this.setAuth("User - Không cần yêu cầu Login");
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
    setInterval(this.repeatFetching, 10000);
  },
  repeatFetching() {
    console.log('Repeating...');
  },
  setAuth(user_name) {
    if (app.data.fakeAuth) {
      if (app.data.fakeName) {
        app.setUserName(app.data.testUserName);
      } else {
        app.setUserName(user_name);
      }
      app.setUserId(app.data.testUserId);
    } else {
      var uId = Math.floor(Math.random() * 10000);
      app.setUserId(uId)
      app.setUserName("User " + uId);
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
    app.onAppSendRequest(product);

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
    console.log("chosen book id: " + app.data.chosenBookId);
    console.log("chosen user id: " + app.data.chosenUserId);
    my.request({
      headers:  {
        'Content-Type': 'application/json'
      },
      url: 'https://api.tala.xyz/shopping/v1/mini-app/request/create',
      method: 'POST',
      data: {
        requester_id: app.data.userId,
        book_id: app.data.chosenBookId,
        user_id: app.data.chosenUserId
      },
      success: (response) => {
        console.log('onSendConfirm Response OK')
        // Show toast
        my.showToast({
          type: 'success',
          content: 'Đã gửi yêu cầu trao đổi sách',
          buttonText: 'OK',
          duration: 2000,
        });
      },
      fail: (fail) => {
        console.log('onSendConfirm Fail', fail);
      }
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
  },
  onHasNotif() {
    // Set TabBar Badge
    my.setTabBarBadge({
      index: 1,
      text: app.requestCount,
    });
  },
});