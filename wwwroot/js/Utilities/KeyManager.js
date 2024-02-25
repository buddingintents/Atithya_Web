function GetEncKey() {
  if ($.cookie('EncKeyParam') == null)
    alert('Failed to retrieve Secrets. Please logout and try again.')
  else
    return decompressString($.cookie('EncKeyParam'));
}
