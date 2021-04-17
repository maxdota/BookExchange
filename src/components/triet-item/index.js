Component({
  methods: {
    onGoToProductPage() {
      const productId = this.props.triet.id;
      my.navigateTo({ url: `pages/triet/index?id=${trietId}` });
    },
    onSendRequest() {
      this.props.onSendRequest(this.props.triet);
    },
  }
})
