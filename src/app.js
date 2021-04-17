App({
  data: {
    userId: -1,
    testUserId: 2,
    testUserName: "Quang",
    userName: "Quang",
    userImage: "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
    myBooks: [],
    requiredLogin: false,
    fakeAuth: true,
    requestCount: 10,
    notificationFetchInterval: 3000,
    chosenBookId: 1,
    chosenUserId: 1,
    checkBookRequestId: 1,
    checkBookRequesterId: 1,
    checkBookRequestBookId: 1,
    checkBookId: 1,
    fakeName: true,
    fakeAuth: true
  },
  onLaunch(options) {
    console.log('App onLaunch');
  },
  onShow(options) {
  },
  onAppSendRequest(product) {
    this.data.chosenBookId = product.id
    this.data.chosenUserId = product.user_id
  },
  onPageCheckBook(product) {
    this.data.checkBookRequestId = product.id
    this.data.checkBookRequesterId = product.requester_id
    this.data.checkBookRequestBookId = product.request_book_id
  },
  onAppAcceptRequest(product) {
    
  },
  onRequestChosen(product) {
    this.data.checkBookId = product.id;
  },
  setUserName(newName) {
    this.data.userName = newName;
  },
  setUserId(id) {
    this.data.userId = id;
  },
});