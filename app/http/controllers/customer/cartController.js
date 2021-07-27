function cartController() {
  return {
    index(req, res) {
      res.render('customers/cart')
    },
    update(req, res) {
      //* for the first time creating cart and adding basic object structure
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        }
      }
      let cart = req.session.cart
      // Check if item does not exist in CART
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        }
        cart.totalQty += 1
        cart.totalPrice = cart.totalPrice + req.body.price
      } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice = cart.totalPrice + req.body.price
      }
      return res.json({ totalQty: req.session.cart.totalQty })
    },
    async delete(req, res) {
      const _id = req.params.id

      req.session.cart.totalQty -= req.session.cart.items[_id].qty
      req.session.cart.totalPrice -=
        req.session.cart.items[_id].item.price * req.session.cart.items[_id].qty

      await delete req.session.cart.items[_id]

      console.log(req.session.cart.items)
      res.status(302).redirect('/cart')
    },
  }
}

module.exports = cartController
