
var shouterer = new Firebase('https://shouterer.firebaseio.com/')
var shouts = new Firebase('https://shouterer.firebaseio.com/shouts')

var $shoutContainer = $('.shout-container')

$('.shoutbox').on('keyup', function (e) {
  if (e.keyCode === 13) {
    addShout()
  }
})

function addShout () {
  if (!window.authData) return alert('Not logged in.')

  var message = $('.shoutbox').val()

  shouts.push({
    author: window.authData.twitter.username,
    image: window.authData.twitter.cachedUserProfile.profile_image_url_https,
    message: message
  })

  $('.shoutbox').val('')
}

shouts.on('value', function (snapshot) {
  var shouts = snapshot.val()

  $shoutContainer.empty()

  for (var k in shouts) {
    var shout = shouts[k]

    $shoutContainer.append(
      $('<article>', {'class': 'shout'}).append(
        $('<img>', {'class': 'user-image', src: shout.image}),
        $('<h2>', {'class': 'user-name', text: shout.author}),
        $('<div>', {'class': 'content', text: shout.message})
      )
    )
  }
}, function (err) {
  console.error('firebase error', err)
  alert('Error, soz')
})



$('.login-button').click(function () {
  shouterer.authWithOAuthPopup('twitter', function (err, authData) {
    if (err) {
      console.log("Login Failed!", err);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  })
})

$('.logout-button').click(function () {
  shouterer.unauth()
})

shouterer.onAuth(function (authData) {
  if (authData) {
    console.log('logged in', authData)

    $('.auth-user-name').text(authData.twitter.username)
    $('.auth-user-image').attr('src', authData.twitter.cachedUserProfile.profile_image_url_https)

    window.authData = authData
  }
  else {
    console.log("User is logged out")

    $('.auth-user-name').text('')
    $('.auth-user-image').attr('src', null)

    window.authData = null
  }
  $('.auth, body').toggleClass('logged-in', !!authData)
})
