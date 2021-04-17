Component({
  methods: {
    onGoToProductPage() {
      // const productId = this.props.book.id;
      // my.navigateTo({ url: `pages/detail/index?id=${productId}` });
    },
    onSelected() {
      this.props.onSelected(this.props.book);
    },
  }
})
