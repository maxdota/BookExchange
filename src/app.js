App({
  data: {
    userId: "-1",
    userName: "ABC",
    userImage: "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
    myBooks: [],
    requiredLogin: false,
  },
  onLaunch(options) {
    console.log('App onLaunch');
  },
  onShow(options) {
  },
  onAppSendRequest(product) {
    
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