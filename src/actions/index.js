const actions = {
  'most-stars': require('./most-stars'),
  'most-forked': require('./most-forked'),
  'show-languages': require('./show-languages'),
  'laugh': require('./laugh'),
}

export default async function handleAction(res, payload) {
  const currentAction = res.action && res.action.slug
  console.log(currentAction)
  let replies = []
  if(actions[currentAction]) {
    replies = await actions[currentAction].default(res, payload)
  } else if (res.reply()) {
    replies.push({
      type: 'text',
      content: res.reply(),
    })
  } else {
    replies.push({
      type: 'text',
      content: 'Sorry I did not understand',
    })
  }
  return replies
}
