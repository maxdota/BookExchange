App({
  data: {
    userId: -1,
    testUserId: 1,
    testUserName: "Quang",
    userName: "Quang",
    userImage: "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
    myBooks: [],
    requiredLogin: false,
    fakeAuth: true,
    requestCount: 10,
    notificationFetchInterval: 10000,
    chosenBookId: 1,
    chosenUserId: 1,
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
  onAppAcceptRequest(product) {
    
  },
  setUserName(newName) {
    this.data.userName = newName;
  },
  setUserId(id) {
    this.data.userId = id;
  },
});