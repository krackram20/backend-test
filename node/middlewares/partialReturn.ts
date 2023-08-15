

export async function partialReturn(ctx: Context, next: () => Promise<any>) {
  const {

    //@ts-ignore
    state: { orderInfo: { items }, body }
  } = ctx


  const { itemsID } = body

  if(itemsID.length > 0) {
    const filteredItems = items.filter((item: {productId:string}) =>
  itemsID.includes(item.productId));

  const newValue = filteredItems.reduce(
    (sum: number, item: {price: number}) => sum + item.price, 0);

    ctx.state.orderInfo.value = newValue
    ctx.state.orderInfo.items = filteredItems
  }

  await next()
}
