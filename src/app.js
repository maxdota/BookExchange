App({
  onLaunch(options) {
    console.log('App onLaunch');
  },
  onShow(options) {
  },
  onAppSendRequest(product) {
    const index = this.cart.products.findIndex(p => p.id === product.id);
    if (index > -1) {
      this.cart.products[index].total += 1;
    } else {
      this.cart.products.push({ ...product, total: 1 });
    }
    this.cart.totalPrice += product.price;
    this.cart.count += 1;
  },
});