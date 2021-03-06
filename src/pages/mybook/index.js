const app = getApp();

Page({
  data: {
    userName: "ABC",
    bannerWidth: 0,
    windowWidth: 0,
    imageWidth: 0,
    loading: true,
    cellSpacing: 12,
    books: [],
    selectedBookIds: [],
  },
  onLoad() {
    this.setData({
      userName: app.data.userName,
      userId: app.data.userId
    });
    // Get size
    my.getSystemInfo({
      success: (info) => {
        console.log('System info: ', info);
        this.setData({ 
          bannerWidth: info.windowWidth - this.data.cellSpacing * 2,
          windowWidth: info.windowWidth,
          imageWidth: info.windowWidth / 2 - this.data.cellSpacing * 2,
        });
        console.log('windowWidth=', this.data.windowWidth);
        console.log('bannerWidth=', this.data.bannerWidth);
        console.log('imageWidth=', this.data.imageWidth);
      }
    });
    this.getMyBook();
  },
  getMyBook() {
    const userId = app.data.userId;
    console.log(`Try to get my book ${userId}`);
    my.request({
      url: `https://api.tala.xyz/shopping/v1/mini-app/user-books/${userId}`,
      method: 'GET',
      success: (response) => {
        console.log(`List of my book ${userId}`, response);
        temp = response;
        temp.forEach(function (value, i) {
          if(value.status == "SHAREABLE") {
            value.selected = true;
          } else {
            value.selected = false;
          }
        });
        this.setData({ books: temp, });
        this.setData({ loading: false, });
      },
      fail: (fail) => {
        console.log('Fail', fail);
        this.setData({ loading: false, });
      }
    });
  },
  onSelected(selectedBook) {
    console.log("Selected id: ", selectedBook.id);
    const index = this.data.selectedBookIds.indexOf(selectedBook.id);
    console.log("index: ", index);
    
    var currentThis = this;
    var newStatus = "";
    if(selectedBook.status == "SHAREABLE") {
      newStatus = 'IN_STOCK';
    } else {
       newStatus = 'SHAREABLE';
    }
    console.log("SELECTED BOOK ID ", selectedBook.id);
    console.log("NEW STATUS: ", newStatus);
    my.request({
      url: 'https://api.tala.xyz/shopping/v1/mini-app/book',
      headers: {
          "Content-Type": "application/json"
        },
      method: 'POST',
      data: {
        id: selectedBook.id,
        status: newStatus
      },
      success: (response) => {
        temp = this.data.books;
        temp.forEach(function (value, i) {
          if(value.id == selectedBook.id) {
            console.log('%d: %s', i, value);
            var selectedIndexBook = i;
            console.log("Selected book: ", value);
            console.log("Selected index: ", selectedIndexBook);
            value.selected = !value.selected;
            console.log("CHANE ", value);
            currentThis.data.books[selectedIndexBook] = value;
            console.log("CHANE 2", value);
            return true
          }
        });

        this.setData({
          books: temp,
        });

        console.log("Out forEach");
        if (index > -1) {
          this.data.selectedBookIds.splice(index)
        } else {
          this.data.selectedBookIds.push(selectedBook.id);
        }
        console.log("Selected id in this screen: ", this.data.selectedBookIds);
        console.log("Current books: ", this.data.books);
      },
      fail: (fail) => {
        console.log('Fail', fail);
        this.setData({ loading: false, });
      }
    });

  },
  isItemSelected(bookId) {
    return this.data.selectedBookIds.indexOf(bookId);
  },
  onReady() {
  },
  onShow() {
    console.log("MyBook");
  },
  onHide() {
  },
  onUnload() {
  },
  navigateBack() {
    my.navigateBack();
  },
});