/**
 * @author tea
 * @date 2010/05/01
 */


// http://apiwiki.twitter.com/
// http://watcher.moe-nifty.com/memo/docs/twitterAPI.txt
function twitter_search(format, query, callback)
{
  var url = "http://search.twitter.com/search." + format + "?q=" + query

  return feed_check(url, feed_atom_parser, callback)
}

// http://twitter.com/goodies/widget_search
// XXX: NOT WORK IN THIS APP
// <script src="http://widgets.twimg.com/j/2/widget.js"></script>


var twitter_widget_rc = {
  version: 2,
  type: 'search',
  search: 'ninjam',
  interval: 6000,
  title: '',
  subject: 'NINJAM',
  width: 'auto',
  height: 400,
  theme: {
    shell: {
      background: '#8ec1da',
      color: '#ffffff'
    },
    tweets: {
      background: '#ffffff',
      color: '#444444',
      links: '#1985b5'
    }
  },
  features: {
    scrollbar: true,
    loop: true,
    live: true,
    hashtags: true,
    timestamp: true,
    avatars: true,
    behavior: 'default'
  }
}

function createTwitterWidget()
{
  if (TWTR && TWTR.Widget)
    return new TWTR.Widget(twitter_widget_rc).render().start()
}

