/**
 * @author tea
 */

var ClipBoard = function()
{
  this.get = function(){ return window.clipboardData.getData('text') }
  this.set = function(x){ window.clipboardData.setData('text', x) }
}

var clipboard = new ClipBoard()
