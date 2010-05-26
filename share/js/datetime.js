

function _timestamp_format(x)
{
  if (x == 0) return "00"
  return (((typeof(x) == "number") && x < 10) ? "0" : "") + x
}

function getTimestamp()
{
  with (new Date()) {
    return map(_timestamp_format,
               [getFullYear(), getMonth() + 1, getDate(), "_",
                getHours(), getMinutes(), getSeconds()]).join("")
  }
}