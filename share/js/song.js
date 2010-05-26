/**
 * @author   tea
 * @date     2010/04/22
 */
 
 
var KEYS = [
 '', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'
]

var NUM_TO_NOTE = {
  0: ['C'],
  1: ['C#', 'Db'],
  2: ['D'],
  3: ['D#', 'Eb'],
  4: ['E'],
  5: ['F'],
  6: ['F#', 'Gb'],
  7: ['G'],
  8: ['G#', 'Ab'],
  9: ['A'],
  10: ['A#', 'Bb'],
  11: ['B']
}

var NOTE_INDEX = {
  'C': 0,
  'C#': 1, 'Db': 1,
  'D': 2,
  'D#': 3, 'Eb': 3,
  'E': 4,
  'F': 5,
  'F#': 6, 'Gb': 6,
  'G': 7,
  'G#': 8, 'Ab': 8,
  'A': 9,
  'A#': 10, 'Bb': 10,
  'B': 11
}


/**
 * class Transposer
 */
var _flat_keys = [1,3,5,6,8,10]
var Transposer = function(key, is_minor) {
  this.root = key
  this.is_flat_key = (function(){
    if (is_minor)
      key = (key+3) % 12
    return !(key in _flat_keys)
  })()
  
  this.get_note_list = function() {
    var list = []
    for (var i = 0; i < 12; ++i) {
      var notes = NUM_TO_NOTE[(this.root + i) % 12]
      if (notes.length == 2 && this.is_flat_key)
        list.push(notes[1])
      else
        list.push(notes[0])
    }
    return list
  }
}

function get_note_list(key)
{
  var t = new Transposer(NOTE_INDEX[key.replace(/m$/,'')], key.indexOf('m') != -1)
  return t.get_note_list()
}

 
/**
 * class Song:
 *
 *
 * Example:
 *
 *     var song = new Song('Dm', 'G7', 'C', 'A7').key('C')
 *
 *     alert(song.keyOf('D'))
 *
 */
var Song = function(){

  // Separator to each bars.
  this.sep = ' | '

  // Copy arguments as chords array.
  this.chords = [].slice.apply(arguments)

  // Need to be sed for transpose by key name.
  this.original_key = null

  // Set an original key of chords.
  this.key = function(key) {
    this.original_key = key;
    return this
  }

  this.transpose = function(keyidx) {
    var root = NOTE_INDEX[this.original_key.replace(/m/,'')]
    var is_minor = this.original_key.indexOf('m') != -1
    var notes = (new Transposer((keyidx - 1), is_minor)).get_note_list()
    var newchords = map(function(c){
      if (c == '\n') return c
      return c.replace(/([ABCDEFG][#b]?)/g, function(m){
        return notes[(12 + NOTE_INDEX[m] - root) % 12]
      })
    }, this.chords)
    
    return this.format(newchords)
  }

  // Transpose by key name
  this.keyOf = function(key) {
    alert('Not implemented, yet')
  }
  
  this.tidy = function (chords, pad) {
    if (! pad)
      pad = (max(map(function(x){ return x.length }, chords))) + 1
    
    return map(function (x){
       if (x == '\n') return x
       return (pad > x.length) ? (x + (new Array(pad - x.length)).join(' ')) : x
    }, chords)
  }
  
  this.format = function(chords, pad) {
    return this.sep + this.tidy(chords.slice(0), pad).join(this.sep)
  }

  this.toString = function() {
    return this.format(this.chords)
  }
  
  this.decode = function() {
    var tmp = "\n         new Song(" + map(_quote, this.chords) + ")"
    tmp += ".key(" + _quote(this.original_key) + ")"
    return tmp
  }
}



function _quote(x) {
  return (x == '\n') ? '"\\n"' : '"'+x.replace('"',"'")+'"'
}

function decode_song(row)
{
  var title = row[0]
  var bpm = row[1]
  var bpi = row[2]
  var song = row[3]
  var chords = (song) ? (song.decode ? song.decode() : _quote(song)) : "null"
  var decoded = "[" + [_quote(title), bpm, bpi, chords] + "],\n"
  
  return decoded
}

function store_song_db(db)
{
  // var tmp_dir = FSO.GetSpecialFolder(2).Path // 2 for temporary folder
  var tmpdir = FSO.GetFolder(tmp_dir)
  var tmpname = FSO.GetTempName()
  var tmppath = (FSO.BuildPath(tmpdir.Path, tmpname))
  
  tmpdir.CreateTextFile(tmpname)
  var tmpfile = FSO.GetFile(tmppath)
  
  with (tmpfile.OpenAsTextStream(2, true)) {
    WriteLine("var SONG = [")
    foreach (db, function(row){
      WriteLine("    " + decode_song(row))
    })
    WriteLine("]")
    Close()
  }
  
  tmpfile.Copy(songlist_js)
  
  location.reload()
}
