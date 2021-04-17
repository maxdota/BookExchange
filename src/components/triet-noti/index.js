const app = getApp();

Component({
  data: { userId: app.data.testUserId },
  methods: {
    onGoToProductPage() {
      const productId = this.props.triet.id;
      my.navigateTo({ url: `pages/triet/index?id=${trietId}` });
    },
    onCheckBook() {
      this.props.onCheckBook(this.props.triet);
    },
    onReject() {
      this.props.onReject(this.props.triet);
    },
    onDetails() {
      this.props.onDetails(this.props.triet);
    }
  }
})
