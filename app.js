  const cookieJson = await fs.readFileSync('cookie.json');

  function BooleanToString(s) {
    if (s) {
      return "TRUE"
    } else {
      return "FALSE"
    }
  }
  function checkTailMatch(s) {
    if (s[0] == ".") {
      return "TRUE"
    }
    return "FALSE"

  }

  var cookieString = JSON.parse(cookieJson)

  var arr = [];
  var bar = new Promise((resolve, reject) => {
    cookieString.forEach(x => {
      var newCook = x.domain + '\t' + checkTailMatch(x.domain) + '\t' + x.path + '\t' + BooleanToString(x.secure) + '\t' + parseInt(x.expires) + '\t' + x.name + '\t' + x.value + '\n';
      
      arr.push(newCook);
      resolve()
    });
  });

  bar.then(async () => {

 
    var arrString = arr.toString().replaceAll(',.', '.');

    await fs.writeFileSync('cookie.txt', `# Netscape HTTP Cookie File\n# https://curl.haxx.se/docs/http-cookies.html\n# This file was generated by libcurl! Edit at your own risk.\n\n${arrString}`);
  });
