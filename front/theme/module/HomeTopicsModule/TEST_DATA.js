let testCollection = []
let testImages = [
  'https://gw.alicdn.com/bao/uploaded/TB1sYPQNpXXXXX4aXXXSutbFXXX.jpg_.webp',
  'https://gw.alicdn.com/bao/uploaded/TB1EwQXNpXXXXb0aXXXSutbFXXX.jpg_.webp',
  'https://gw.alicdn.com/bao/uploaded/TB1voBROVXXXXcVXVXXSutbFXXX.jpg_.webp',
  'https://gw.alicdn.com/bao/uploaded/TB1fbKqOFXXXXbHaXXXSutbFXXX.jpg_.webp',
  'https://gw.alicdn.com/bao/uploaded/TB1ZcseMVXXXXarXXXXSutbFXXX.jpg_.webp',
  'https://gw.alicdn.com/bao/uploaded/TB1OxymOXXXXXc3aXXXSutbFXXX.jpg_.webp',
  'https://gw.alicdn.com/bao/uploaded/TB1Q8wONVXXXXcTXFXXSutbFXXX.jpg_.webp',
  'https://gw.alicdn.com/bao/uploaded/TB1xJ7iNVXXXXXTXpXXSutbFXXX.jpg_.webp',
  'https://gw.alicdn.com/bao/uploaded/TB1pf6YOXXXXXa8apXXSutbFXXX.jpg_.webp',
  'https://gw.alicdn.com/bao/uploaded/TB1nSNmOVXXXXbnXXXXSutbFXXX.jpg_.webp',
  'https://gw.alicdn.com/bao/uploaded/TB1M2mmNVXXXXX.XVXXSutbFXXX.jpg_.webp',
  'https://gw.alicdn.com/bao/uploaded/TB1hZQZMVXXXXXXXFXXSutbFXXX.jpg_.webp'
]

for (let i = 0; i < 12; i++) {
  testCollection.push(
    {
      'id': 'qkLRY9' + i,
      'title': 'NEW ARRIVAL Vuitton' + i,
      'currency_symbol': 'US $',
      'start_price': (Math.random() * 20).toFixed(2),
      'cover_images': testImages[i]
    }
    )
}

export { testCollection }
