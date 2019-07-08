// getting the page using ajax

function getWhatever(strUrl) {
  var strReturn = "";
  $.ajax({
    url: strUrl,
    success: function(html) {
    strReturn = html;
    },
    async:false
  });

  return strReturn;
}
var rakuten = getWhatever("rakuten.txt");
var newline = document.createElement("br");

// create the page to html
function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString;
  return div;
}
var div = createElementFromHTML(rakuten);

// START: Work on index.html
var attrArray = div.getElementsByClassName("store");
var fileID = [];

// get all store IDs from file
for (var i=0; i < attrArray.length; i++) {
  var rawID = attrArray[i].getAttribute("data-store-id");
  fileID.push(rawID);
}

// submit
function submitFunction() {
  var storeIDs = document.getElementById("stores").value;
  var storeArray= storeIDs.replace(/\n/ig,"\r\n|\r|\n|").split("\r\n|\r|\n|");
// counter begins
var counter = 0;
var row = 1;
storeArray.forEach(function(id) {
counter = counter +1;
    if (fileID.includes(id)) {
    for (var i=0; i < attrArray.length; i++) {
      rawID = attrArray[i].getAttribute("data-store-id");
      if (id === rawID) {
        var link = attrArray[i].querySelector("a").getAttribute("href");

        var name = attrArray[i].getElementsByClassName("store-name");
        for (var elem=0; elem < name.length; elem++) {
          var alt = name[elem].innerHTML;
          if (counter%2!=0) {
            var code='<!--row ' + row + ' starts-->' + '<tr><td align="center" style="border: 1px solid #dddddd; border-collapse: collapse;"><a href="https://${swap}'+ link +'?eeid=${eeid}&utm_source=${sourceswap}&utm_medium=email&utm_campaign=${utmCampaign}&utm_content=${utmDate}&ebtoken=${Recipient.jwt_token}"><img src="http://dreammail.edgesuite.net/PMB/Ebates/Promos/20190304_OnTrend_LC/american_eagle.png" alt="' + alt + '" border="0" style="display:block;" width="237"/></a></td>';
            document.getElementById("write").innerText += code;
            row = row +1;
          }
          else {
            var code2='<td align="center" style="border: 1px solid #dddddd; border-collapse: collapse;"><a href="https://${swap}'+ link +'?eeid=${eeid}&utm_source=${sourceswap}&utm_medium=email&utm_campaign=${utmCampaign}&utm_content=${utmDate}&ebtoken=${Recipient.jwt_token}"><img src="http://dreammail.edgesuite.net/PMB/Ebates/Promos/20190304_OnTrend_LC/american_eagle.png" alt="' + alt + '" border="0" style="display:block;" width="237"/></a></td></tr>';
            document.getElementById("write").innerText += code2;
          }

        }

      }

    }
  } else {
    var alert= id + " doesn't exist!";
    if (counter%2!=0) {
      var code3='<tr><td align="center" style="border: 1px solid #dddddd; border-collapse: collapse;"><a href="https://${swap}/americaneagle.com?eeid=${eeid}&utm_source=${sourceswap}&utm_medium=email&utm_campaign=${utmCampaign}&utm_content=${utmDate}&ebtoken=${Recipient.jwt_token}"><span style="font-size:12px">' + alert + '</span></a></td>';
      document.getElementById("write").innerText += code3;
    }
    else {
      var code4='<td align="center" style="border: 1px solid #dddddd; border-collapse: collapse;"><a href="https://${swap}/americaneagle.com?eeid=${eeid}&utm_source=${sourceswap}&utm_medium=email&utm_campaign=${utmCampaign}&utm_content=${utmDate}&ebtoken=${Recipient.jwt_token}"<span style="font-size:12px">' + alert + '</span></a></td></tr>';
      document.getElementById("write").innerText += code4;
    }

  }

  });
// counter ends
}
